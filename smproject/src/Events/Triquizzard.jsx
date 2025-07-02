import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    axios
      .post(`/vinterbash/events`, { schoolName, activeEvent })
      .then((response) => {
        console.log('InsideTriquizzard-->', response.data);
        setRegisteredTeams(response.data.teams || []); // fallback to empty array
      })
      .catch((error) => {
        console.log('Error fetching teams:', error);
        setRegisteredTeams([]); // fallback on error
      });
  }, [registeredTeams]);

  return schoolName ? (
    <AnimatedPage>
      <div className="ThreePEvent">
        {/* Add Three_Member_Team components if less than 3 teams */}
        {Array.isArray(registeredTeams) &&
          Array.from({ length: Math.max(0, 3 - registeredTeams.length) }).map((_, i) => (
            <Box key={`new-team-${i + 1}`} sx={{ width: '100%', maxWidth: '600px' }}>
              <Three_Member_Team
                eventId={activeEventId}
                eventName={activeEvent}
                registeredTeams={registeredTeams}
                schoolId={schoolId}
                teamIndex={registeredTeams.length + i + 1}
              />
            </Box>
          ))}

        {/* Show already registered teams */}
        {registeredTeams.map((team, index) => (
          <RegisteredTeam
            key={team.teamId}
            team={team}
            eventId={activeEventId}
            schoolId={schoolId}
            teamIndex={index + 1}
          />
        ))}
      </div>
    </AnimatedPage>
  ) : (
    <Navigate to="/signIn" replace={true} />
  );
}

export default Triquizzard;
