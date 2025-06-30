import React, { useState } from 'react'
import axios from '../axios';
import './One_Member_Event.css'
import { useStateValue } from '../StateProvider';
import AnimatedPage from '../templates/AnimatedPage';
import { useEffect } from 'react';

function One_Member_Event({ eventId, eventName, registeredTeams, schoolId, teamIndex }) {
  const [p1, setP1] = useState('');
  const[{schoolName},dispatch]=useStateValue();

  function handleEvent(e) {
    e.preventDefault();
    if (p1 ) {
      const teamId = `${schoolId}${eventId}t${teamIndex}`;
      const participantId1 = `${teamId}p1`;
       const participantObj= {
        p1: { participantId: participantId1, participantName: p1 },
        };
      const participants=Object.values(participantObj);

      axios.post('/vinterbash/register', {
        participants,
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
    <AnimatedPage>
    <div className='loginONE'>
      <div className='register_container'>
      <h3><u>Team: {teamIndex}</u></h3>
        <form>
          <h5>Participant 1</h5>
          <input type='text' value={p1} onChange={(e) => {
              const value = e.target.value; const isValid = /^[a-zA-Z\s]*$/.test(value); // allows alphabets and spaces
              if (!isValid) { alert("Only alphabets are allowed");
                return; }
              setP1(value);}} placeholder="Type Candidate's Name" className='register_form' />

          <button className='login_signin' type='submit' onClick={handleEvent}>
            Click to add the team
          </button>
        </form>
      </div>
    </div>
    </AnimatedPage>
  );
}

export default One_Member_Event;
