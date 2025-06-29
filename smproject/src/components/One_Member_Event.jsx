import React, { useState } from 'react'
import { Box } from '@mui/material'
import axios from '../axios';
import './Three_Member_Team.css'
import { useStateValue } from '../StateProvider';

function One_Member_Event({ eventId, eventName, registeredTeams, schoolId, teamIndex }) {
  const [p1, setP1] = useState('');
  const[{schoolName},dispatch]=useStateValue();

  function handleEvent(e) {
    e.preventDefault();
    if (p1 ) {
      const teamId = `${schoolId}${eventId}t${teamIndex}`;
      const participantId1 = `${teamId}p1`;

      axios.post('/vinterbash/register', {
        participants:{
        p1: { participantId: participantId1, participantName: p1 },
        },
        eventId,
        schoolId,
        schoolName,
        teamId
      })
        .then(() => {
          setP1('');
          alert('Added Successfully');
        })
        .catch((error) => alert(error.response?.data || 'Error adding team'));
    } else {
      alert('Fill all required participant details');
    }
  }

  return (
    <div className='login'>
      <div className='register_container'>
        <form>
          <h5>Participant 1</h5>
          <input type='text' value={p1} onChange={(e) => setP1(e.target.value)} placeholder="Type Candidate's Name" className='register_form' />

          <button className='login_signin' type='submit' onClick={handleEvent}>
            Click to add the team
          </button>
        </form>
      </div>
    </div>
  );
}

export default One_Member_Event;
