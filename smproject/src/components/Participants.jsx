import React from 'react';
import './Participants.css';
import { useStateValue } from '../StateProvider';
import axios from '../axios';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AnimatedPage from '../templates/AnimatedPage';
import { useEffect } from 'react';

function Participants() {

const[{schoolName},dispatch]=useStateValue();
const[participants,setParticipants]=useState([]);

useEffect(()=>{
axios.post('/vinterbash/eventParticipantMap',{schoolName})
.then((response)=>{
   const data = response?.data?.participants;
        if (Array.isArray(data)) {
          setParticipants(data);
        } else {
          setParticipants([]); // fallback for null or invalid data
        }
      })
      .catch((error) => {
        console.error('Error fetching participants:', error);
        setParticipants([]); // fallback on request failure
      }); 
},[schoolName])

// console.log("InsideParticipantsPage-->",participants);

  return (
    schoolName?
    <AnimatedPage>
    <div 
      className="school-container"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: 'none',
        color: '#000000',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.05)'
      }}
    >
      <h2 style={{ color: '#000000', textAlign: 'center' }}>{schoolName} - Students</h2>
      <div className="student-grid">
        {participants.map((participant, index) => (
          <div 
            key={index} 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              border: 'none',
              color: '#000000',
              borderRadius: '8px',
              padding: '14px',
              margin: '12px 0',
              textAlign: 'center',
              fontWeight: '600',
              boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.03)'
            }}
          >
            {participant.participantName} : {participant.eventName}
          </div>
        ))}
      </div>
    </div>
    </AnimatedPage>
    :<Navigate to={'/signIn'} replace={true}/>
  );
}

export default Participants;