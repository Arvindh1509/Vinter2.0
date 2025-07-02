import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from '../axios';
import './Triquizzard.css';
import Three_Member_Team from '../components/Three_Member_Team';
import { useStateValue } from '../StateProvider';
import RegisteredTeam from '../components/RegisteredTeam';
import One_Member_Event from '../components/One_Member_Event';
import { Navigate } from 'react-router-dom';
import AnimatedPage from '../templates/AnimatedPage';

function TamilLits() {
  const [{ schoolName, activeEvent, schoolId, activeEventId }] = useStateValue();
  const [registeredTeams, setRegisteredTeams] = useState([]);

  useEffect(() => {
    axios
      .post(`/vinterbash/events`, { schoolName, activeEvent })
      .then((response) => {
        console.log('InsideTamilLits-->', response.data);

        // Always set to an array to avoid null errors
        if (Array.isArray(response.data.teams)) {
          setRegisteredTeams(response.data.teams);
        } else {
          setRegisteredTeams([]);
        }
      })
      .catch((error) => {
        console.log('Error fetching teams:', error);
        setRegisteredTeams([]); // fallback on error
      });
  }, [registeredTeams]);

  if (!schoolName) return <Navigate to="/signIn" replace />;

  return (
    <AnimatedPage>
      <div className="ThreePEvent">
        {/* Render unregistered team forms */}
        {Array.from({ length: Math.max(0, 2 - registeredTeams.length) }).map((_, i) => (
          <One_Member_Event
            key={`new-team-${i + 1}`}
            eventId={activeEventId}
            eventName={activeEvent}
            registeredTeams={registeredTeams}
            schoolId={schoolId}
            teamIndex={registeredTeams.length + i + 1}
          />
        ))}

        {/* Render registered teams */}
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
  );
}

export default TamilLits;
