const express = require('express');
const cors = require('cors');
// const { Pool } = require('pg');
const pool = require('./db_setup');
const crypto = require('crypto');

// ============================================================================
// 1. App Configuration & Database Setup
// ============================================================================
const app = express();
const PORT = 8000;

app.use(cors({
    // origin: [
    //     "http://ec2-184-73-128-194.compute-1.amazonaws.com",
    //     "http://ec2-184-73-128-194.compute-1.amazonaws.com:3000",
    //     "http://vinterbash.in:3000", "vinterbash.in:3000",
    //     "https://vinterbash.in", "http://vinterbash.in", "http://localhost:3000/"
    // ]
}));
app.use(express.json());

// Initialize PostgreSQL Connection Pool (Replace with actual credentials)
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'vinterbash',
//     password: 'password',
//     port: 5432,
// });

// ============================================================================
// 2. Models / DTOs (Mapped from Java Classes via JSDoc for Readability)
// ============================================================================

/**
 * @typedef {Object} ParticipantDTO
 * @property {string} participantId
 * @property {string} participantName
 */

/**
 * @typedef {Object} EventDTO
 * @property {string} eventId
 * @property {string} eventName
 */

/**
 * @typedef {Object} EventTeamDTO
 * @property {string} teamId
 * @property {string} teamName
 * @property {string} schoolName
 * @property {ParticipantDTO[]} participants
 */

/**
 * @typedef {Object} EventWithTeamsDTO
 * @property {string} eventId
 * @property {string} eventName
 * @property {EventTeamDTO[]} teams
 */

/**
 * @typedef {Object} ValidateRequest
 * @property {string} schoolName
 * @property {string} password
 */

/**
 * @typedef {Object} TeamRegistrationRequest
 * @property {string} schoolId
 * @property {string} eventId
 * @property {string} teamId
 * @property {ParticipantDTO[]} participants
 */

/**
 * @typedef {Object} EventsRequest
 * @property {string} schoolName
 * @property {string} activeEvent
 */

/**
 * @typedef {Object} UpdateRequest
 * @property {string} schoolName
 * @property {string} schoolId
 * @property {string} eventId
 * @property {string} teamId
 * @property {ParticipantDTO[]} participants
 */

/**
 * @typedef {Object} TeacherRegistrationRequest
 * @property {string} schoolId
 * @property {string} teacher1Name
 * @property {string} teacher1Phone
 * @property {string} teacher2Name
 * @property {string} teacher2Phone
 */

// ============================================================================
// 3. Database Queries
// ============================================================================
const Queries = {
    VALIDATE_SCHOOL: `SELECT school_id FROM schools WHERE school_name = $1 AND password = $2`,
    GET_ALL_EVENTS: `SELECT event_name AS "eventName", event_id AS "eventId" FROM events`,
    GET_SCHOOL_EVENT_REGISTRATION_STATUS: `
        SELECT s.school_id, s.school_name, e.event_id, e.max_teams_per_school, COUNT(t.team_id) AS registered_teams
        FROM schools s CROSS JOIN events e LEFT JOIN teams t ON t.school_id = s.school_id AND t.event_id = e.event_id
        WHERE s.school_id = $1 GROUP BY s.school_id, s.school_name, e.event_id, e.max_teams_per_school
    `,
    INSERT_SCHOOL: `INSERT INTO schools (school_id, school_name) VALUES ($1, (SELECT school_name FROM schools WHERE school_id = $1)) ON CONFLICT (school_id) DO NOTHING`,
    INSERT_TEAM: `INSERT INTO teams (team_id, event_id, school_id, team_name) VALUES ($1, $2, $3, $4)`,
    INSERT_PARTICIPANT: `INSERT INTO participants (participant_id, team_id, participant_name) VALUES ($1, $2, $3)`,
    GET_PARTICIPANTS_AND_EVENTS_BY_SCHOOL: `
        SELECT p.participant_name AS "participantName", e.event_name AS "eventName"
        FROM participants p JOIN teams t ON p.team_id = t.team_id JOIN events e ON t.event_id = e.event_id
        JOIN schools s ON t.school_id = s.school_id WHERE s.school_name = $1
    `,
    UPSERT_PARTICIPANT: `
        INSERT INTO participants (participant_id, participant_name, team_id) VALUES ($1, $2, $3) 
        ON CONFLICT (participant_id) DO UPDATE SET participant_name = EXCLUDED.participant_name, team_id = EXCLUDED.team_id
    `,
    GET_EVENT_DETAILS: `
        SELECT e.event_id, e.event_name, t.team_id, t.team_name, p.participant_id, p.participant_name, s.school_name
        FROM schools s JOIN teams t ON s.school_id = t.school_id JOIN events e ON t.event_id = e.event_id
        JOIN participants p ON t.team_id = p.team_id WHERE s.school_name = $1 AND e.event_name = $2
        ORDER BY t.team_id, p.participant_id
    `,
    GET_ADMIN_EVENT_DETAILS: `
        SELECT e.event_id, e.event_name, t.team_id, t.team_name, p.participant_id, p.participant_name, s.school_name
        FROM schools s LEFT JOIN teams t ON s.school_id = t.school_id LEFT JOIN events e ON t.event_id = e.event_id AND e.event_name = $1
        LEFT JOIN participants p ON t.team_id = p.team_id WHERE e.event_id IS NOT NULL ORDER BY s.school_name, t.team_id, p.participant_id
    `,
    REGISTER_TEACHERS: `UPDATE schools SET teacher1name = $1, teacher2name = $2, teacher1number = $3, teacher2number = $4 WHERE school_id = $5`,
    GET_TEACHER_INFO: `SELECT teacher1name, teacher1number, teacher2name, teacher2number FROM schools WHERE school_id = $1`
};

// ============================================================================
// 4. Helper Methods (Replaces Spring Data Logic)
// ============================================================================
function buildEventWithTeams(rows, eventName) {
    const event = { eventId: null, eventName: eventName, teams: [] };
    if (rows.length === 0) return event;
    const teamMap = new Map();

    rows.forEach(row => {
        if (!event.eventId) { event.eventId = row.event_id; event.eventName = row.event_name; }
        const { team_id, team_name, participant_id, participant_name, school_name } = row;

        if (team_id && !teamMap.has(team_id)) {
            const team = { teamId: team_id, teamName: team_name, schoolName: school_name, participants: [] };
            teamMap.set(team_id, team);
            event.teams.push(team);
        }
        if (participant_id) {
            teamMap.get(team_id).participants.push({ participantId: participant_id, participantName: participant_name });
        }
    });
    return event;
}

// ============================================================================
// 5. API Routes (Controllers + Services Integrated)
// ============================================================================
const router = express.Router();

router.post('/validate', async (req, res) => {
    try {
        /** @type {ValidateRequest} */
        const { schoolName, password } = req.body;
        console.log('requests:',req.body);
        
        const schoolRes = await pool.query(Queries.VALIDATE_SCHOOL, [schoolName, password]);
        if (schoolRes.rows.length === 0) return res.status(401).json({ error: "Invalid" });

        const eventsRes = await pool.query(Queries.GET_ALL_EVENTS);

        /** @type {ValidateResponse} */
        const responseData = { schoolId: schoolRes.rows[0].school_id, schoolName, events: eventsRes.rows };
        return res.status(200).json(responseData);
    } catch (error) { res.status(500).json({ error: "Internal Server Error" }); }
});

router.post('/registeredEvents', async (req, res) => {
    try {
        const { schoolId } = req.body;
        const { rows } = await pool.query(Queries.GET_SCHOOL_EVENT_REGISTRATION_STATUS, [schoolId]);
        if (rows.length === 0) return res.status(404).send("School ID not found or no events available.");

        let fully = 0, partially = 0, none = 0, schoolName = null;
        rows.forEach(row => {
            const registered = parseInt(row.registered_teams, 10);
            const max = parseInt(row.max_teams_per_school, 10);
            if (registered === 0) none++; else if (registered < max) partially++; else fully++;
            schoolName = row.school_name;
        });

        res.status(200).json({ schoolId, schoolName, fullyRegistered: fully, partiallyRegistered: partially, notRegistered: none });
    } catch (error) { res.status(500).json({ error: "Internal Server Error" }); }
});

router.post('/register', async (req, res) => {
    const client = await pool.connect();
    try {
        /** @type {TeamRegistrationRequest} */
        const { schoolId, eventId, teamId, participants } = req.body;
        const teamName = `${schoolId}${teamId}`;

        await client.query('BEGIN');
        await client.query(Queries.INSERT_SCHOOL, [schoolId]);
        await client.query(Queries.INSERT_TEAM, [teamId, eventId, schoolId, teamName]);
        for (const p of participants) {
            await client.query(Queries.INSERT_PARTICIPANT, [p.participantId, teamId, p.participantName]);
        }
        await client.query('COMMIT');
        res.status(200).send(`Congratulations. You have successfully registered for event : ${eventId}`);
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: "Internal Server Error" });
    } finally { client.release(); }
});

router.post('/events', async (req, res) => {
    try {
        /** @type {EventsRequest} */
        const { schoolName, activeEvent } = req.body;
        let queryStr = schoolName === "admin" ? Queries.GET_ADMIN_EVENT_DETAILS : Queries.GET_EVENT_DETAILS;
        let queryParams = schoolName === "admin" ? [activeEvent] : [schoolName, activeEvent];

        const { rows } = await pool.query(queryStr, queryParams);
        
        /** @type {EventWithTeamsDTO} */
        const eventResponse = buildEventWithTeams(rows, activeEvent);
        res.status(200).json(eventResponse);
    } catch (error) { res.status(500).json({ error: "Internal Server Error" }); }
});

router.post('/eventParticipantMap', async (req, res) => {
    try {
        const { schoolName } = req.body;
        const { rows } = await pool.query(Queries.GET_PARTICIPANTS_AND_EVENTS_BY_SCHOOL, [schoolName]);
        
        // rows maps directly to ParticipantEventDTO structure via query aliases
        if (rows.length === 0) return res.status(404).send(`Not Found with this Id : ${schoolName}`);
        res.status(200).json({ participants: rows });
    } catch (error) { res.status(500).json({ error: "Internal Server Error" }); }
});

router.post('/updateTeamParticipants', async (req, res) => {
    const client = await pool.connect();
    try {
        /** @type {UpdateRequest} */
        const { teamId, participants } = req.body;

        await client.query('BEGIN');
        for (const p of participants) {
            await client.query(Queries.UPSERT_PARTICIPANT, [p.participantId, p.participantName, teamId]);
        }
        await client.query('COMMIT');
        res.status(200).send("updated successfully");
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: "Internal Server Error" });
    } finally { client.release(); }
});

router.post('/teacherRegister', async (req, res) => {
    try {
        /** @type {TeacherRegistrationRequest} */
        const { schoolId, teacher1Name, teacher1Phone, teacher2Name, teacher2Phone } = req.body;
        await pool.query(Queries.REGISTER_TEACHERS, [teacher1Name, teacher2Name, teacher1Phone, teacher2Phone, schoolId]);
        res.status(200).send(`Teachers registered successfully for school ${schoolId}`);
    } catch (error) { res.status(500).json({ error: "Internal Server Error" }); }
});

router.get('/getAllEvents', async (req, res) => {
    try {
        const { rows } = await pool.query(Queries.GET_ALL_EVENTS);
        res.status(200).json({ eventNames: rows.map(r => r.eventName) }); // Note: aliased in SQL query
    } catch (error) { res.status(500).json({ error: "Internal Server Error" }); }
});

router.post('/teacherInfo', async (req, res) => {
    try {
        const { schoolId } = req.body;
        const { rows } = await pool.query(Queries.GET_TEACHER_INFO, [schoolId]);
        if (rows.length === 0) return res.status(404).json({ error: "Teacher info not found" });

        // Maps to TeacherInfoResponse
        res.status(200).json(rows[0]);
    } catch (error) { res.status(500).json({ error: "Internal Server Error" }); }
});

app.use('/vinterbash', router);

// ============================================================================
// 6. Server Initialization
// ============================================================================
app.listen(PORT, () => {
    console.log(`🚀 Node.js Vinterbash Backend initialized successfully on http://localhost:${PORT}`);
});