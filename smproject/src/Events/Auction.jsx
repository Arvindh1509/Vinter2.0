import React, { useCallback, useEffect, useState } from 'react'
import axios from '../axios';
import './Triquizzard.css'
import { useStateValue } from '../StateProvider';
import RegisteredTeam from '../components/RegisteredTeam';
import { Navigate } from 'react-router-dom';
import AnimatedPage from '../templates/AnimatedPage';
import Three_Member_Team from '../components/Three_Member_Team';

function Auction() {
  const [{ schoolName, activeEvent, schoolId,activeEventId }, dispatch] = useStateValue();
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
      {schoolName !== 'admin' ?
    <div 
      className='ThreePEvent'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
        padding: '20px 0',
        boxSizing: 'border-box'
      }}
    >

  {Array.from({ length: 1 - registeredTeams.length }).map((_, i) => (
    <Three_Member_Team
      key={`new-team-${i + 1}`}
      eventId={activeEventId}
      eventName={activeEvent}
      registeredTeams={registeredTeams}
      schoolId={schoolId}
      minMember={3}
      teamIndex={registeredTeams.length + i + 1}
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
      maxMember={3}
      onTeamUpdate={fetchTeams} 
    />
  ))}
  
</div>
: <div 
    className='ThreePEvent'
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      width: '100%',
      padding: '20px 0',
      boxSizing: 'border-box'
    }}
  >

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

export default Auction;