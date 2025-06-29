import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import axios from '../axios';
import './Triquizzard.css'
import { useStateValue } from '../StateProvider';
import Two_Member_Event from '../components/Two_Member_Event'
import RegisteredTeam from '../components/RegisteredTeam';

function FIFA() {
  const [{ schoolName, activeEvent, schoolId,activeEventId }, dispatch] = useStateValue();
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [eventId, setEventId] = useState();

  useEffect(() => {
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

  return (
    <div className='ThreePEvent'>
      {registeredTeams.length === 1 ? (
        <Box>
          {registeredTeams.map((team, index) => (
            <RegisteredTeam
              key={team.teamId}
              team={team}
              eventId={eventId}
              schoolId={schoolId}
              teamIndex={index + 1}
            />
          ))}
        </Box>
      ) : (
        <div>
          <Two_Member_Event
            eventId={activeEventId}
            eventName={activeEvent}
            registeredTeams={registeredTeams}
            schoolId={schoolId}
            teamIndex={1}
          />
        </div>
      )}
    </div>
  );
}

export default FIFA;
