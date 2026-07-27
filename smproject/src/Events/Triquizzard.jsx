import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from '../axios';
import './Triquizzard.css';
import Three_Member_Team from '../components/Three_Member_Team';
import { useStateValue } from '../StateProvider';
import RegisteredTeam from '../components/RegisteredTeam';
import { Navigate } from 'react-router-dom';
import AnimatedPage from '../templates/AnimatedPage';

function Triquizzard() {
  const [{ schoolName, activeEvent, schoolId, activeEventId }] = useStateValue();
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [eventId, setEventId] = useState();
  const maxTeams=2;

  const fetchTeams = useCallback(() => {
    if (!schoolName || !activeEvent) return;

    axios
      .post(`/vinterbash/events`, { schoolName, activeEvent })
      .then((response) => {
        console.log('InsideTriquizzard-->', response.data);
        setRegisteredTeams(response.data.teams);
        setEventId(response.data.eventId);
      })
      .catch((error) => {
        console.log('Error fetching teams:', error);
      });
  }, [schoolName, activeEvent]);

  const occupiedTeamNumbers = registeredTeams.map(team =>
  parseInt(team.teamId.match(/t(\d+)$/)?.[1] || "0", 10)
  );

  const availableTeamNumbers = [];

  for (let i = 1; i <= maxTeams; i++) {
    if (!occupiedTeamNumbers.includes(i)) {
      availableTeamNumbers.push(i);
    }
  }

  useEffect(() => {
    fetchTeams(); // only runs on mount or when schoolName/activeEvent changes
  }, [fetchTeams]);

  return schoolName ? (
    <AnimatedPage>
     {schoolName != 'admin' ?
      <div className="ThreePEvent">
        {/* Add Three_Member_Team components if less than 3 teams */}
        {availableTeamNumbers.map((teamNo) => (
            <Box key={`team-${teamNo}`} sx={{ width: '100%', maxWidth: '600px' }}>
              <Three_Member_Team
                eventId={activeEventId}
                eventName={activeEvent}
                registeredTeams={registeredTeams}
                schoolId={schoolId}
                teamIndex={teamNo}
                minMember={3}
                onTeamUpdate={fetchTeams} 
              />
            </Box>
          ))}

        {/* Show already registered teams */}
        {registeredTeams.map((team) => (
          <RegisteredTeam
            key={team.teamId}
            team={team}
            eventId={activeEventId}
            schoolId={schoolId}
            eventName={activeEvent}
            teamIndex={parseInt(team.teamId.match(/t(\d+)$/)?.[1] || "0", 10)}
            maxMember={3}
            onTeamUpdate={fetchTeams} 
          />
        ))}
      </div>
      : <div className='ThreePEvent'>
        {registeredTeams.map((team) => (
          <RegisteredTeam
            key={team.teamId}
            team={team}
            eventId={activeEventId}
            schoolId={schoolId}
            eventName={team.schoolName}
            teamIndex={parseInt(team.teamId.match(/t(\d+)$/)?.[1] || "0", 10)}
            onTeamUpdate={fetchTeams} // optional: same here
          />
        ))}
      </div>
    }
    </AnimatedPage>
  ) : (
    <Navigate to="/signIn" replace={true} />
  );
}

export default Triquizzard;
