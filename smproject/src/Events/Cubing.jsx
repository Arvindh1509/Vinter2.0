import React, { useCallback, useEffect, useState } from 'react'
import axios from '../axios';
import './Triquizzard.css'
import { useStateValue } from '../StateProvider';
import RegisteredTeam from '../components/RegisteredTeam';
import One_Member_Event from '../components/One_Member_Event';
import { Navigate } from 'react-router-dom';
import AnimatedPage from '../templates/AnimatedPage';

function Cubing() {
  const [{ schoolName, activeEvent, schoolId,activeEventId }] = useStateValue();
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [eventId, setEventId] = useState();

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

  useEffect(() => {
    fetchTeams(); // only runs on mount or when schoolName/activeEvent changes
  }, [fetchTeams]);

  return schoolName?(
    <AnimatedPage>
     {schoolName != 'admin' ?
    <div className='ThreePEvent'>
      {Array.from({ length: 2 - registeredTeams.length }).map((_, i) => (
    <One_Member_Event
      key={`new-team-${i + 1}`}
      eventId={activeEventId}
      eventName={activeEvent}
      registeredTeams={registeredTeams}
      schoolId={schoolId}
      teamIndex={registeredTeams.length + i + 1}
      onTeamUpdate={fetchTeams}
    />
  ))}
  
  {registeredTeams.map((team, index) => (
    <RegisteredTeam
      key={team.teamId}
      team={team}
      eventId={activeEventId}
      eventName={activeEvent}
      schoolId={schoolId}
      teamIndex={index + 1}
      onTeamUpdate={fetchTeams}
    />
  ))}
    </div>
    : <div className='ThreePEvent'>

        {registeredTeams.map((team, index) => (
          <RegisteredTeam
            key={team.teamId}
            team={team}
            eventId={activeEventId}
            schoolId={schoolId}
            eventName={team.schoolName}
            teamIndex={index + 1}
            onTeamUpdate={fetchTeams} // optional: same here
          />
        ))}
      </div>
    }
    </AnimatedPage>
    ):(<Navigate to={'/signIn'} replace={true}/>
  );
}

export default Cubing;
