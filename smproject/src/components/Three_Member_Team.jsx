import React, { useState } from 'react'
import axios from '../axios';
import './Three_Member_Team.css'
import { useStateValue } from '../StateProvider';
import AnimatedPage from '../templates/AnimatedPage';
import { useEffect } from 'react';
import RegisteredTeam from './RegisteredTeam';

function Three_Member_Team({ eventId, eventName, registeredTeams, schoolId, teamIndex, minMember,onTeamUpdate }) {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const[{schoolName},dispatch]=useStateValue();

  const handleEvent = async (e) => {
    e.preventDefault();

    const participantNames = [p1, p2, p3];

    const filledParticipants = participantNames
      .map((name, index) => ({ name: name.trim(), index }))
      .filter(participant => participant.name !== '');

    if (filledParticipants.length < minMember) {
      alert(`Please enter at least ${minMember} participant(s).`);
      return;
    }

    const teamId = `${schoolId}${eventId}t${teamIndex}`;

    // Create participants array
    const participantArray = filledParticipants.map(({ name, index }) => ({
      participantId: `${teamId}p${index + 1}`,
      participantName: name
    }));
      try {
        await axios.post('/vinterbash/register', {participants: participantArray,eventId,schoolId,schoolName,teamId})
        // Reset fields
        setP1('');
        setP2('');
        setP3('');
        alert('Added Successfully');
        if (onTeamUpdate) {
            onTeamUpdate();
          }       
      } catch (error) {
        alert(error.response?.data || 'Error updating participants');
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
