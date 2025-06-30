import React, { useState } from 'react'
import axios from '../axios';
import './Three_Member_Team.css'
import AnimatedPage from '../templates/AnimatedPage';
import { useEffect } from 'react';

function Three_Member_Team({ eventId, eventName, registeredTeams, schoolId, teamIndex }) {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');

  function handleEvent(e) {
    e.preventDefault();
    if (p1 && p2 && p3) {
      const teamId = `${schoolId}${eventId}t${teamIndex}`;
      const participantId1 = `${teamId}p1`;
      const participantId2 = `${teamId}p2`;
      const participantId3 = `${teamId}p3`;
      const participantObj= {
        p1: { participantId: participantId1, participantName: p1 },
        p2: { participantId: participantId2, participantName: p2 },
        p3: { participantId: participantId3, participantName: p3 },
        };
      const participants=Object.values(participantObj);

      axios.post('/vinterbash/register', {
        participants,
        eventId,
        schoolId,
        teamId
      })
        .then(() => {
          setP1('');
          setP2('');
          setP3('');
          alert('Added Successfully');
        })
        .catch((error) => alert(error.response?.data || 'Error adding team'));
    } else {
      alert('Fill all required participant details');
    }
  }

  return (
    <AnimatedPage>
    <div className='login'>
      <div className='register_container'>
      <h3><u>Team: {teamIndex}</u></h3>
        <form>
          <h5>Participant 1</h5>
          <input type='text' value={p1} onChange={(e) => {
              const value = e.target.value; const isValid = /^[a-zA-Z\s]*$/.test(value); // allows alphabets and spaces
              if (!isValid) { alert("Only alphabets are allowed");
                return; }
              setP1(value);}} placeholder="Type Candidate's Name" className='register_form' />

          <h5>Participant 2</h5>
          <input type='text' value={p2} onChange={(e) => {
              const value = e.target.value; const isValid = /^[a-zA-Z\s]*$/.test(value); // allows alphabets and spaces
              if (!isValid) { alert("Only alphabets are allowed");
                return; }
              setP2(value);}} placeholder="Type Candidate's Name" className='register_form' />

          <h5>Participant 3</h5>
          <input type='text' value={p3} onChange={(e) => {
              const value = e.target.value; const isValid = /^[a-zA-Z\s]*$/.test(value); // allows alphabets and spaces
              if (!isValid) { alert("Only alphabets are allowed");
                return; }
              setP3(value);}} placeholder="Type Candidate's Name" className='register_form' />

          <button className='login_signin' type='submit' onClick={handleEvent}>
            Click to add the team
          </button>
        </form>
      </div>
    </div>
    </AnimatedPage>
  );
}

export default Three_Member_Team;
