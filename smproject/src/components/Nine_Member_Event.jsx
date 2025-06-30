import React, { useState } from 'react'
import axios from '../axios';
import './Three_Member_Team.css'
import AnimatedPage from '../templates/AnimatedPage';
import { useEffect } from 'react';

function Nine_Member_Team({ eventId, eventName, registeredTeams, schoolId, teamIndex }) {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [p4, setP4] = useState('');
  const [p5, setP5] = useState('');
  const [p6, setP6] = useState('');
  const [p7, setP7] = useState('');
  const [p8, setP8] = useState('');
  const [p9, setP9] = useState('');

  function handleEvent(e) {
    e.preventDefault();
    if (p1 && p2 && p3 && p4 && p5 && p6 && p7 && p8 && p9) {
      const teamId = `${schoolId}${eventId}t${teamIndex}`;
      const participantId1 = `${teamId}p1`;
      const participantId2 = `${teamId}p2`;
      const participantId3 = `${teamId}p3`;
      const participantId4 = `${teamId}p4`;
      const participantId5 = `${teamId}p5`;
      const participantId6 = `${teamId}p6`;
      const participantId7 = `${teamId}p7`;
      const participantId8 = `${teamId}p8`;
      const participantId9 = `${teamId}p9`;
      const participantObj= {
        p1: { participantId: participantId1, participantName: p1 },
        p2: { participantId: participantId2, participantName: p2 },
        p3: { participantId: participantId3, participantName: p3 },
        p4: { participantId: participantId4, participantName: p4 },
        p5: { participantId: participantId5, participantName: p5 },
        p6: { participantId: participantId6, participantName: p6 },
        p7: { participantId: participantId7, participantName: p7 },
        p8: { participantId: participantId8, participantName: p8 },
        p9: { participantId: participantId9, participantName: p9 },
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
          setP4('');
          setP5('');
          setP6('');
          setP7('');
          setP8('');
          setP9('');
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

          <h5>Participant 4</h5>
          <input type='text' value={p4} onChange={(e) => {
              const value = e.target.value; const isValid = /^[a-zA-Z\s]*$/.test(value); // allows alphabets and spaces
              if (!isValid) { alert("Only alphabets are allowed");
                return; }
              setP4(value);}} placeholder="Type Candidate's Name" className='register_form' />

          <h5>Participant 5</h5>
          <input type='text' value={p5} onChange={(e) => {
              const value = e.target.value; const isValid = /^[a-zA-Z\s]*$/.test(value); // allows alphabets and spaces
              if (!isValid) { alert("Only alphabets are allowed");
                return; }
              setP5(value);}} placeholder="Type Candidate's Name" className='register_form' />

          <h5>Participant 6</h5>
          <input type='text' value={p6} onChange={(e) => {
              const value = e.target.value; const isValid = /^[a-zA-Z\s]*$/.test(value); // allows alphabets and spaces
              if (!isValid) { alert("Only alphabets are allowed");
                return; }
              setP6(value);}} placeholder="Type Candidate's Name" className='register_form' />

          <h5>Participant 7</h5>
          <input type='text' value={p7} onChange={(e) => {
              const value = e.target.value; const isValid = /^[a-zA-Z\s]*$/.test(value); // allows alphabets and spaces
              if (!isValid) { alert("Only alphabets are allowed");
                return; }
              setP7(value);}} placeholder="Type Candidate's Name" className='register_form' />

          <h5>Participant 8</h5>
          <input type='text' value={p8} onChange={(e) => {
              const value = e.target.value; const isValid = /^[a-zA-Z\s]*$/.test(value); // allows alphabets and spaces
              if (!isValid) { alert("Only alphabets are allowed");
                return; }
              setP8(value);}} placeholder="Type Candidate's Name" className='register_form' />

          <h5>Participant 9</h5>
          <input type='text' value={p9} onChange={(e) => {
              const value = e.target.value; const isValid = /^[a-zA-Z\s]*$/.test(value); // allows alphabets and spaces
              if (!isValid) { alert("Only alphabets are allowed");
                return; }
              setP9(value);}} placeholder="Type Candidate's Name" className='register_form' />

          <button className='login_signin' type='submit' onClick={handleEvent}>
            Click to add the team
          </button>
        </form>
      </div>
    </div>
    </AnimatedPage>
  );
}

export default Nine_Member_Team;
