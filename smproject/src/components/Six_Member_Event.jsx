import React, { useState } from 'react';
import axios from '../axios';
import './Three_Member_Team.css';
import AnimatedPage from '../templates/AnimatedPage';
import { useEffect } from 'react';

function Six_Member_Team({ eventId, eventName, registeredTeams, schoolId, teamIndex, minMember }) {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [p4, setP4] = useState('');
  const [p5, setP5] = useState('');
  const [p6, setP6] = useState('');

  function handleEvent(e) {
    e.preventDefault();

    const participantNames = [p1, p2, p3, p4, p5, p6];

    const filledParticipants = participantNames
      .map((name, index) => ({ name: name.trim(), index }))
      .filter(participant => participant.name !== '');

    if (filledParticipants.length < minMember) {
      alert(`Please enter at least ${minMember} participant(s).`);
      return;
    }

    const teamId = `${schoolId}${eventId}t${teamIndex}`;

    const participantArray = filledParticipants.map(({ name, index }) => ({
      participantId: `${teamId}p${index + 1}`,
      participantName: name
    }));

      axios.post('/vinterbash/register', {
      participants: participantArray,
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
        alert('Added Successfully');
      })
      .catch((error) => alert(error.response?.data || 'Error adding team'));
  
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

          <button className='login_signin' type='submit' onClick={handleEvent}>
            Click to add the team
          </button>
        </form>
      </div>
    </div>
    </AnimatedPage>
  );
}

export default Six_Member_Team;
