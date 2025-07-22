import React, { useCallback, useEffect, useState } from 'react'
import axios from '../axios';
import './Triquizzard.css'
import { useStateValue } from '../StateProvider';
import RegisteredTeam from '../components/RegisteredTeam';
import Eight_Member_Team from '../components/Eight_Member_Event';
import Six_Member_Team from '../components/Six_Member_Event';
import { Navigate } from 'react-router-dom';
import AnimatedPage from '../templates/AnimatedPage';

function GroupDrama() {
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

  return schoolName? (
    <AnimatedPage>
     {schoolName != 'admin' ?
    <div className='ThreePEvent'>
  {/* Render all registered teams */}

  {Array.from({ length: 1 - registeredTeams.length }).map((_, i) => (
    <Six_Member_Team
      key={`new-team-${i + 1}`}
      eventId={activeEventId}
      eventName={activeEvent}
      registeredTeams={registeredTeams}
      schoolId={schoolId}
      teamIndex={registeredTeams.length + i + 1}
      minMember={4}
      onTeamUpdate={fetchTeams} 
    />
  ))}
  
  {registeredTeams.map((team, index) => (
    <RegisteredTeam
      key={team.teamId}
      team={team}
      eventId={activeEventId}
      schoolId={schoolId}
      teamIndex={index + 1}
      eventName={activeEvent}
      maxMember={6}
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

export default GroupDrama;
