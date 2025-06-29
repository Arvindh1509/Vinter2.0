import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import axios from '../axios';
import './Triquizzard.css'
import Three_Member_Team from '../components/Three_Member_Team';
import { useStateValue } from '../StateProvider';
import RegisteredTeam from '../components/RegisteredTeam';
import One_Member_Event from '../components/One_Member_Event';

function Art() {
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
            <div key={team.teamId}>
              <RegisteredTeam
                eventId={eventId}
                team={team}
                schoolId={schoolId}
                teamIndex={index + 1}
              />
            </div>
          ))}
        </Box>
      ) : (
        <div>
          <One_Member_Event
            eventId={activeEventId}
            eventName={activeEvent}
            registeredTeams={registeredTeams}
            schoolId={schoolId}
            teamIndex={1}
          />
          <One_Member_Event
            eventId={activeEventId}
            eventName={activeEvent}
            registeredTeams={registeredTeams}
            schoolId={schoolId}
            teamIndex={2}
          />
        </div>
      )}
    </div>
  );
}

export default Art;
