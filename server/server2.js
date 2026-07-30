const express = require('express');
const cors = require('cors');
// const { Pool } = require('pg');
const pool = require('./db_setup');
const crypto = require('crypto');
const axios = require("axios");

// ============================================================================
// 1. App Configuration & Database Setup
// ============================================================================
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: [
    //     "http://ec2-184-73-128-194.compute-1.amazonaws.com",
    //     "http://ec2-184-73-128-194.compute-1.amazonaws.com:3000",
    //     "http://vinterbash.in:3000", "vinterbash.in:3000",
    "https://vinter2-0-xtdb.vercel.app",
    //     "https://vinterbash.in", "http://vinterbash.in", "http://localhost:3000/"
        "https://www.vinterbash.co.in",
        "https://vinterbash.co.in",
        "http://localhost:3001",
        "http://vinterbash-alb-1429442373.us-east-1.elb.amazonaws.com/"
    ]
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

/**
 * @typedef {Object} ValidateResponse
 * @property {string} schoolName
 * @property {string} school_id
 * @property {Array} events
 * @property {Array} eventsReg
 */

/**
 * @typedef {Object} OrganiserValidateRequest
 * @property {string} organiserName
 * @property {string} password
 */
/**
 * @typedef {Object} organiserValidateResponse
 *  @property {string} organiserName
 *  @property {string} organiserId
 *  @property {string} role
 *  @property {Array} assignedEvents
 *  @property {string} eventId
 *  @property {string} eventName
 *  @property {Array} participants
 *  @property {string} schoolName
 *  @property {string} teamName
 *  @property {Arrary} members*/

/**
 * @typedef {Object} enterResultsRequest
 *  @property {string} event_id
 *  @property {string} team_id
 *  @property {number} position
 *  */

/**
 * @typedef {Object} enterResultsResponse
 *  @property {string} message*/

/**
 * @typedef {Object} cummulativeScoresResponse
 *  @property {Array} scores
 *  @property {String} schoolName
 *  @property {number} cummulativeScore
 * */

// ============================================================================
// Filtering Functions
// ============================================================================
const filterRegisteredEventBySchool = (setOfRegistrations) => {
  console.log(setOfRegistrations);
  let eventsToReturn = [];

  for (let index = 0; index < setOfRegistrations.length; index++) {
    const element = setOfRegistrations[index].event_name;
    eventsToReturn.push(element);
  }

  return eventsToReturn;
};

// ============================================================================
// 3. Database Queries
// ============================================================================
const Queries = {
    VALIDATE_SCHOOL: `SELECT school_id, school_name FROM schools WHERE school_id = $1 AND password = $2`,
  VALIDATE_ORGANISER: `SELECT organizer_id FROM organizers WHERE organizer_name = $1 AND password = $2`,
    GET_ALL_EVENTS: `SELECT event_name AS "eventName", event_id AS "eventId", venue AS "venue", timings AS "timings" FROM events`,
  GET_ORGANISER_NAME: `SELECT organizer_name FROM organizers WHERE organizer_id = $1`,
  GET_SCHOOL_EVENT_REGISTRATION_STATUS: `
        SELECT s.school_id, s.school_name, e.event_id, e.max_teams_per_school, COUNT(t.team_id) AS registered_teams,teacher1name,teacher2name,teacher1number,teacher2number
        FROM schools s CROSS JOIN events e LEFT JOIN teams t ON t.school_id = s.school_id AND t.event_id = e.event_id
        WHERE s.school_id = $1 GROUP BY s.school_id, s.school_name, e.event_id, e.max_teams_per_school
    `,
  GET_SCHOOL_REGISTERED_EVENTS: `
        SELECT s.school_id, s.school_name, e.event_id, e.event_name, e.max_teams_per_school, COUNT(t.team_id) AS registered_teams FROM schools s CROSS JOIN events e LEFT JOIN teams t ON t.school_id = s.school_id AND t.event_id = e.event_id WHERE s.school_id = $1 GROUP BY s.school_id, s.school_name, e.event_id, e.event_name, e.max_teams_per_school HAVING COUNT(t.team_id) >= 1 ORDER BY e.event_name ASC;`,
  INSERT_SCHOOL: `INSERT INTO schools (school_id, school_name) VALUES ($1, $2) ON CONFLICT (school_id) DO NOTHING`,
  INSERT_TEAM: `INSERT INTO teams (team_id, event_id, school_id, team_name) VALUES ($1, $2, $3, $4)`,
  INSERT_PARTICIPANT: `INSERT INTO participants (participant_id, team_id, participant_name) VALUES ($1, $2, $3)`,
  INSERT_RESULT: `INSERT INTO team_results (result_id, event_id, team_id, position, points) VALUES ($1, $2, $3, $4, $5)
  ON CONFLICT (result_id) DO UPDATE SET position = EXCLUDED.position, points = EXCLUDED.points`,
  DELETE_RESULT: `DELETE FROM team_results WHERE result_id = $1`,
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
        SELECT e.event_id, e.event_name,e.max_teams_per_school, t.team_id, t.team_name, p.participant_id, p.participant_name, s.school_name
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
  GET_TEACHER_INFO: `SELECT teacher1name, teacher1number, teacher2name, teacher2number FROM schools WHERE school_id = $1`,
  GET_ASSIGNED_EVENTS_BY_ORG: `SELECT 
    e.event_id AS "eventId",
    e.event_name AS "eventName",
    s.school_name AS "schoolName",
    t.team_name AS "teamName",
    t.team_id AS "teamId",
    p.participant_name AS "memberName"
FROM organizers o
JOIN events e ON o.event_id = e.event_id
LEFT JOIN teams t ON e.event_id = t.event_id
LEFT JOIN schools s ON t.school_id = s.school_id
LEFT JOIN participants p ON t.team_id = p.team_id
WHERE o.organizer_id = $1;`,
  GET_FINAL_RESULTS: `SELECT
    s.school_name AS schoolName,
    SUM(r.points) AS cumulativeScore
FROM team_results r
LEFT JOIN teams t
    ON r.team_id = t.team_id
LEFT JOIN schools s
    ON t.school_id = s.school_id
GROUP BY s.school_name
ORDER BY cumulativeScore DESC;
`,
// pushed by Arvindh Lakshman starts
GET_SAVED_RESULTS:`SELECT p.participant_name, r.team_id, r.result_id, r.position,r.points, e.event_name, s.school_name
  FROM team_results r
  JOIN participants p ON p.team_id = r.team_id
  JOIN teams t ON t.team_id = r.team_id
  JOIN events e ON e.event_id = t.event_id
  JOIN schools s ON s.school_id = t.school_id
  WHERE e.event_id = $1
  ORDER BY r.position;`,
GET_LEADERBOARD:

`SELECT
    s.school_name,
    COALESCE(SUM(tr.points), 0) AS total_points,
    e.event_name,
    tr.position
FROM schools s
LEFT JOIN teams t
    ON s.school_id = t.school_id
LEFT JOIN team_results tr
    ON t.team_id = tr.team_id
LEFT JOIN events e
    ON tr.event_id = e.event_id
GROUP BY
    s.school_name,
    e.event_name,
    tr.position
ORDER BY
    total_points DESC,
    s.school_name;
`,
GET_RESULTS_FOR_WHATSAPP:`
SELECT    e.event_name,    o.organizer_name,r.position,s.school_name,p.participant_name FROM team_results r
JOIN teams t    ON r.team_id = t.team_id
JOIN schools s    ON t.school_id = s.school_id
JOIN events e    ON r.event_id = e.event_id
JOIN participants p    ON p.team_id = t.team_id
JOIN organizers o    ON o.organizer_id = $2
WHERE r.event_id = $1
ORDER BY r.position, s.school_name;`,

GET_ADMIN_DASHBOARD: `
SELECT s.school_id,s.school_name,e.event_id,e.event_name,COUNT(DISTINCT t.team_id) FILTER (WHERE t.event_id = e.event_id) AS team_count,COUNT(DISTINCT p.participant_id) FILTER (WHERE t.event_id = e.event_id) AS participant_count
FROM schools s
JOIN teams t ON s.school_id = t.school_id
JOIN events e ON t.event_id = e.event_id
LEFT JOIN participants p ON t.team_id = p.team_id
GROUP BY s.school_id,s.school_name,e.event_id,e.event_name
ORDER BY s.school_name,e.event_name;`,

GET_ADMIN_DASHBOARD_SUMMARY: `SELECT s.school_id,s.school_name,COUNT(DISTINCT e.event_id) AS registered_events,COUNT(DISTINCT t.team_id) AS total_teams,COUNT(DISTINCT p.participant_id) AS total_participants
FROM schools s
JOIN teams t ON s.school_id = t.school_id
JOIN events e ON t.event_id = e.event_id
LEFT JOIN participants p ON t.team_id = p.team_id
GROUP BY s.school_id,s.school_name
ORDER BY s.school_name  `,

GET_DOWNLOAD_REGISTRATIONS:`SELECT s.school_name,e.event_name,p.participant_name FROM teams t
JOIN schools s ON s.school_id = t.school_id
JOIN events e ON e.event_id = t.event_id
LEFT JOIN participants p ON p.team_id = t.team_id
ORDER BY s.school_name,e.event_name`
};
// pushed by Arvindh Lakshman ends
// ============================================================================
// 4. Helper Methods (Replaces Spring Data Logic)
// ============================================================================
function buildEventWithTeams(rows, eventName) {
  const event = { eventId: null, eventName: eventName, teams: [],maxTeams:null };
  if (rows.length === 0) return event;
  const teamMap = new Map();

  rows.forEach((row) => {
    if (!event.eventId) {
      event.eventId = row.event_id;
      event.eventName = row.event_name;
      event.maxTeams=row.max_teams_per_school;
    }
    const {
      team_id,
      team_name,
      participant_id,
      participant_name,
      school_name,
    } = row;

    if (team_id && !teamMap.has(team_id)) {
      const team = {
        teamId: team_id,
        teamName: team_name,
        schoolName: school_name,
        participants: [],
      };
      teamMap.set(team_id, team);
      event.teams.push(team);
    }
    if (participant_id) {
      teamMap.get(team_id).participants.push({
        participantId: participant_id,
        participantName: participant_name,
      });
    }
  });
  return event;
}

// ============================================================================
// 5. API Routes (Controllers + Services Integrated)
// ============================================================================
const router = express.Router();

router.get("/leaderboard", async (req, res) => {
    try {
      
        const { rows } = await pool.query(
            Queries.GET_LEADERBOARD
          
        );

        const leaderboardMap = new Map();

        rows.forEach(row => {

            if (!leaderboardMap.has(row.school_name)) {
                leaderboardMap.set(row.school_name,{
                    school_name: row.school_name,
                    total_points: Number(row.total_points),
                    event_results:[]
                });
            }

            if(row.event_name){
                leaderboardMap.get(row.school_name).event_results.push({
                    event_name: row.event_name,
                    position: row.position
                });
            }

        });
      
        res.json([...leaderboardMap.values()].sort(
            (a,b)=>b.total_points-a.total_points
        ));

    } catch(err){
        console.error(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});

router.get("/cummulativeScores", async (req, res) => {
  try {
    /** @type {cummulativeScoresResponse} */
    const scoresRes = await pool.query(Queries.GET_FINAL_RESULTS);
    console.log(scoresRes.rows);
    res.status(200).json({ scores: scoresRes.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/enterResults", async (req, res) => {
  try {
    /** @type {enterResultsRequest} */
    const { event_id, team_id, position, points } = req.body;
    console.log(event_id, team_id, position);
    /** @type {enterResultsResponse} */
    // const points = position == 1 ? 10 : position == 2 ? 5 : 3;
    console.log(points);
    const result_id = `${event_id}${team_id}`;
    await pool.query(Queries.INSERT_RESULT, [
      result_id,
      event_id,
      team_id,
      position,
      points,
    ]);

    console.log("Results entered successfully.");
    res.status(200).json({ message: "Results entered successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//Barath's code for deleting results
router.delete("/deleteResult/:resultId", async (req, res) => {
  try {
    const { resultId } = req.params;
    await pool.query(Queries.DELETE_RESULT, [resultId]);
    res.status(200).json({ message: "Result deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/organiserValidate", async (req, res) => {
  try {
    /** @type {OrganiserValidateRequest} */
    const { organiserName, password } = req.body;
    console.log("requests:", req.body);

    const organiserRes = await pool.query(Queries.VALIDATE_ORGANISER, [
      organiserName,
      password,
    ]);
    console.log("organiserRes:", organiserRes.rows);
    const organiserNameRes = organiserName

    const assignedEventsRes = await pool.query(
      Queries.GET_ASSIGNED_EVENTS_BY_ORG,
      [organiserRes.rows[0].organizer_id],
    );
    const rows = assignedEventsRes.rows;

    const eventData = {
      eventId: rows[0].eventId,
      eventName: rows[0].eventName,
      participants: [],
    };

    const teamMap = {};

    rows.forEach((row) => {
      const key = `${row.schoolName}_${row.teamName}`;

      if (!teamMap[key]) {
        teamMap[key] = {
          schoolName: row.schoolName,
          teamId: row.teamId,
          teamName: row.teamName,
          members: [],
        };
      }

      teamMap[key].members.push(row.memberName);
    });

    eventData.participants = Object.values(teamMap);

    console.log(eventData);
    if (organiserRes.rows.length === 0)
      return res.status(401).json({ error: "Invalid" });

    // const eventsRes = await pool.query(Queries.GET_ALL_EVENTS);
    // const RegisteredEventsRes = await pool.query(
    //   Queries.GET_SCHOOL_REGISTERED_EVENTS,
    //   [schoolRes.rows[0].school_id],
    // );

    //Code starts here
    // pushed by Arvindh Lakshman
    const {rows: savedRes} = await pool.query(Queries.GET_SAVED_RESULTS, [eventData.eventId]);

    const groupedMap = {};

    savedRes.forEach(savedResult => {
    const key = savedResult.team_id;

      if (!groupedMap[key]) {
        groupedMap[key] = {
          resultId: savedResult.result_id,
          teamId: savedResult.team_id,
          position: savedResult.position,
          points:savedResult.points,
          schoolName: savedResult.school_name,
          eventName: savedResult.event_name,
          members: []
        };
      }

      groupedMap[key].members.push(savedResult.participant_name);
    });
    //Code Ends Here

    /** @type {organiserValidateResponse} */
    const responseData = {
      organiserId: organiserRes.rows[0].organizer_id,
      organiserName: organiserName,
      assignedEvents: {
        eventId: eventData.eventId,
        eventName: eventData.eventName,
        particpants: eventData.participants,
        // pushed by Arvindh Lakshman
        savedResults: Object.values(groupedMap),
      },
    };
    console.log('SavedResult:',JSON.stringify(responseData));
    
    return res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/validate", async (req, res) => {
 try {
        /** @type {ValidateRequest} */
        const { schoolId, password } = req.body;
        console.log(schoolId, password);
        const schoolRes = await pool.query(Queries.VALIDATE_SCHOOL,[schoolId, password]);
        
        if (schoolRes.rows.length === 0)
        return res.status(401).json({ error: "Invalid" });

        const eventsRes = await pool.query(Queries.GET_ALL_EVENTS);

        const responseData = {
        schoolId: schoolRes.rows[0].school_id,
        schoolName: schoolRes.rows[0].school_name,
        events: eventsRes.rows
        }; return res.status(200).json(responseData);
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
            teacher1name=row.teacher1name;
            teacher2name=row.teacher2name;
            teacher1number=row.teacher1number;
            teacher2number=row.teacher2number;
        });

        res.status(200).json({ schoolId, schoolName,teacher1name,teacher2name,teacher1number,teacher2number, fullyRegistered: fully, partiallyRegistered: partially, notRegistered: none });
    } catch (error) { res.status(500).json({ error: "Internal Server Error" }); }
});

router.post("/register", async (req, res) => {
  const client = await pool.connect();
  try {
    /** @type {TeamRegistrationRequest} */
    console.log(req.body);
    const { schoolId, schoolName, eventId, teamId, participants } = req.body;
    const teamName = `${teamId}`;

    await client.query("BEGIN");
    await client.query(Queries.INSERT_SCHOOL, [schoolId,schoolName]);
    console.log("insert schools");
    await client.query(Queries.INSERT_TEAM, [
      teamId,
      eventId,
      schoolId,
      teamName,
    ]);
    console.log("insert teams");
    for (const p of participants) {
      await client.query(Queries.INSERT_PARTICIPANT, [
        p.participantId,
        teamId,
        p.participantName,
      ]);
    }
    console.log("insert participants");
    await client.query("COMMIT");
    res
      .status(200)
      .send(
        `Congratulations. You have successfully registered for event : ${eventId}`,
      );
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
});

router.post("/events", async (req, res) => {
  try {
    /** @type {EventsRequest} */
    const { schoolName, activeEvent } = req.body;
    let queryStr =
      schoolName === "admin"
        ? Queries.GET_ADMIN_EVENT_DETAILS
        : Queries.GET_EVENT_DETAILS;
    let queryParams =
      schoolName === "admin" ? [activeEvent] : [schoolName, activeEvent];

    const { rows } = await pool.query(queryStr, queryParams);

    /** @type {EventWithTeamsDTO} */
    const eventResponse = buildEventWithTeams(rows, activeEvent);
    res.status(200).json(eventResponse);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/eventParticipantMap", async (req, res) => {
  try {
    const { schoolName } = req.body;
    const { rows } = await pool.query(
      Queries.GET_PARTICIPANTS_AND_EVENTS_BY_SCHOOL,
      [schoolName],
    );

    // rows maps directly to ParticipantEventDTO structure via query aliases
    if (rows.length === 0)
      return res.status(404).send(`Not Found with this Id : ${schoolName}`);
    res.status(200).json({ participants: rows });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/updateTeamParticipants", async (req, res) => {
  const client = await pool.connect();
  try {
    /** @type {UpdateRequest} */
    const { teamId, participants } = req.body;

    await client.query("BEGIN");
    for (const p of participants) {
      await client.query(Queries.UPSERT_PARTICIPANT, [
        p.participantId,
        p.participantName,
        teamId,
      ]);
    }
    await client.query("COMMIT");
    res.status(200).send("updated successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
});

router.post("/teacherRegister", async (req, res) => {
  try {
    /** @type {TeacherRegistrationRequest} */
    const {
      schoolId,
      teacher1Name,
      teacher1Phone,
      teacher2Name,
      teacher2Phone,
    } = req.body;
    await pool.query(Queries.REGISTER_TEACHERS, [
      teacher1Name,
      teacher2Name,
      teacher1Phone,
      teacher2Phone,
      schoolId,
    ]);
    res
      .status(200)
      .send(`Teachers registered successfully for school ${schoolId}`);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getAllEvents", async (req, res) => {
  try {
    const { rows } = await pool.query(Queries.GET_ALL_EVENTS);
    res.status(200).json({ events: rows }); // Note: aliased in SQL query
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        res.status(500).json({ status: 'error' });
    }
});


router.post("/teacherInfo", async (req, res) => {
  try {
    const { schoolId } = req.body;
    const { rows } = await pool.query(Queries.GET_TEACHER_INFO, [schoolId]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Teacher info not found" });

    // Maps to TeacherInfoResponse
    console.log("Teacher Info:", rows[0]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/sendToEmcee", async (req, res) => {
    try {

        const { eventId, organiserId } = req.body;

        const { rows } = await pool.query(
            Queries.GET_RESULTS_FOR_WHATSAPP,
            [eventId, organiserId]
        );

        if (!rows.length) {
            return res.status(404).json({
                message: "No results found"
            });
        }

        const eventName = rows[0].event_name;
        const organiserName = rows[0].organizer_name;

        const grouped = {};

        rows.forEach(r => {

            if (!grouped[r.position]) {
                grouped[r.position] = {
                    schoolName: r.school_name,
                    members: []
                };
            }

            grouped[r.position].members.push(r.participant_name);

        });

        const labels = {
            1: "1st Place",
            2: "2nd Place",
            3: "3rd Place"
        };

        let message = `EVENT RESULTS\n\n`;

        message += `Event : ${eventName}\n`;
        message += `Uploaded By : ${organiserName}\n\n`;

        Object.keys(grouped).sort().forEach(position => {

            const result = grouped[position];

            message += `${labels[position]}\n`;
            message += `School : ${result.schoolName}\n`;
            message += `Participants : ${result.members.join(", ")}\n\n`;

        });

        const recipients = [
    process.env.EMCEE1,
    process.env.EMCEE2
];

        const sendPromises = recipients.map(phone =>
        
    axios.post(
        `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
        {
            messaging_product: "whatsapp",
            to: phone,
            type: "text",
            text: {
                body: message
            }
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                "Content-Type": "application/json"
            }
        }
    )
);

        res.json({
            success: true
        });

    } catch (err) {

        console.error(err.response?.data || err);

        res.status(500).json({
            success: false,
            error: err.response?.data || err.message
        });

    }
});

router.post("/adminDashboard", async (req, res) => {
    try {

        const { rows } = await pool.query(
            Queries.GET_ADMIN_DASHBOARD
        );

        const { rows: summaryRes } = await pool.query(
    Queries.GET_ADMIN_DASHBOARD_SUMMARY
);

        const schoolMap = new Map();

        rows.forEach(row => {

            if (!schoolMap.has(row.school_id)) {

                schoolMap.set(row.school_id, {
                    schoolId: row.school_id,
                    schoolName: row.school_name,
                    events: []
                });

            }

            schoolMap.get(row.school_id).events.push({

                eventId: row.event_id,
                eventName: row.event_name,
                teamCount: Number(row.team_count),
                participantCount: Number(row.participant_count)

            });

        });

        summaryRes.forEach(row => {
          if (schoolMap.has(row.school_id)) {
            schoolMap.get(row.school_id).registeredEvents = Number(row.registered_events);
            schoolMap.get(row.school_id).totalTeams = Number(row.total_teams);
            schoolMap.get(row.school_id).totalParticipants = Number(row.total_participants);
          }
        });

        const response = [...schoolMap.values()];

        res.status(200).json(response);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
});

router.get("/downloadRegistrations", async (req, res) => {

    try {

        const { rows } = await pool.query(
            Queries.GET_DOWNLOAD_REGISTRATIONS
        );

        const excelData = rows.map(row => ({

            School: row.school_name,

            Event: row.event_name,

            Team: row.team_id,

            Participant: row.participant_name

        }));

        res.status(200).json(excelData);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Internal Server Error"
        });

    }

});

app.use("/vinterbash", router);

// ============================================================================
// 6. Server Initialization
// ============================================================================
app.listen(PORT, () => {
  console.log(
    `🚀 Node.js Vinterbash Backend initialized successfully on http://localhost:${PORT}`,
  );
});
