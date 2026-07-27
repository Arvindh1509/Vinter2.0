import React, { useCallback, useEffect, useState } from 'react'
import axios from '../axios';
import './Triquizzard.css'
import { useStateValue } from '../StateProvider';
import RegisteredTeam from '../components/RegisteredTeam';
import One_Member_Event from '../components/One_Member_Event';
import { Navigate } from 'react-router-dom';
import AnimatedPage from '../templates/AnimatedPage';

function Heritage() {
  const [{ schoolName, activeEvent, schoolId,activeEventId }] = useStateValue();
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [eventId, setEventId] = useState();
  const maxTeams=6;

   const fetchTeams = useCallback(() => {
    if (!schoolName || !activeEvent) return;

    axios
      .post(`/vinterbash/events`, { schoolName, activeEvent })
      .then((response) => {
        console.log('InsideCubing-->', response.data);
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

  return schoolName?(
    <AnimatedPage>
     {schoolName != 'admin' ?
    <div className='ThreePEvent'>
     {availableTeamNumbers.map((teamNo) => (
    <One_Member_Event
      key={`team-${teamNo}`}
      eventId={activeEventId}
      eventName={activeEvent}
      registeredTeams={registeredTeams}
      schoolId={schoolId}
      teamIndex={teamNo}
      onTeamUpdate={fetchTeams}
    />
  ))}
  
  {registeredTeams.map((team) => (
    <RegisteredTeam
      key={team.teamId}
      team={team}
      eventId={activeEventId}
      eventName={activeEvent}
      schoolId={schoolId}
      teamIndex={parseInt(team.teamId.match(/t(\d+)$/)?.[1] || "0", 10)}
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
    ):(<Navigate to={'/signIn'} replace={true}/>
  );
}

export default Heritage;
