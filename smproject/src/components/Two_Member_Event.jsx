import React, { useState } from 'react'
import axios from '../axios';
import './Three_Member_Team.css'
import { useStateValue } from '../StateProvider';
import AnimatedPage from '../templates/AnimatedPage';
import { useEffect } from 'react';
import RegisteredTeam from './RegisteredTeam';

function Two_Member_Event({ eventId, eventName, registeredTeams, schoolId, teamIndex, onTeamUpdate }) {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const[{schoolName}]=useStateValue();

  const handleEvent = async (e) => {
    e.preventDefault();
      
    if (p1 && p2) {
      const teamId = `${schoolId}${eventId}t${teamIndex}`;
      const participantId1 = `${teamId}p1`;
      const participantId2 = `${teamId}p2`;
      const participantObj= {
        p1: { participantId: participantId1, participantName: p1 },
        p2: { participantId: participantId2, participantName: p2 },
        };
      const participants=Object.values(participantObj);
       try {
          await
      axios.post('/vinterbash/register', {participants,eventId,schoolId,schoolName,teamId});
          
          setP1('');
          setP2('');
          alert('Added Successfully');
          if (onTeamUpdate) {
            onTeamUpdate();
          }
      }catch (error){
        alert(error.response?.data || 'Error updating participants');
      }
       
    } else {
      alert('Fill all required participant details');
    }
    
  }

  return (
    <AnimatedPage>
    <div 
      className='login'
      style={{
        background: 'transparent',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '10px 0'
      }}
    >
      <div 
        className='register_container'
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: 'none',
          color: '#000000',
          borderRadius: '12px',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
          padding: '2rem',
          width: '100%',
          maxWidth: '500px',
          boxSizing: 'border-box'
        }}
      >
      <h3 style={{ color: '#000000', textAlign: 'center', marginBottom: '20px' }}><u>Team: {teamIndex}</u></h3>
        <form>
          <h5 style={{ color: '#000000', marginBottom: '8px' }}>Participant 1</h5>
          <input 
            type='text' 
            value={p1} 
            onChange={(e) => {
              const value = e.target.value; const isValid = /^[a-zA-Z\s]*$/.test(value); // allows alphabets and spaces
              if (!isValid) { alert("Only alphabets are allowed");
                return; }
              setP1(value);}} 
            placeholder="Type Candidate's Name" 
            className='register_form' 
          />

          <h5 style={{ color: '#000000', marginBottom: '8px', marginTop: '15px' }}>Participant 2</h5>
          <input 
            type='text' 
            value={p2} 
            onChange={(e) => {
              const value = e.target.value; const isValid = /^[a-zA-Z\s]*$/.test(value); // allows alphabets and spaces
              if (!isValid) { alert("Only alphabets are allowed");
                return; }
              setP2(value);}} 
            placeholder="Type Candidate's Name" 
            className='register_form' 
          />

          <button 
            className='login_signin' 
            type='submit' 
            onClick={handleEvent}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
              background: 'rgba(255, 255, 255, 0.35)',
              backgroundImage: 'none',
              border: 'none',
              color: '#ffffff',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.03)',
              marginTop: '25px',
              width: '100%',
              padding: '12px'
            }}
          >
            Click to add the team
          </button>
        </form>
      </div>
    </div>
    </AnimatedPage>
  );
}

export default Two_Member_Event;