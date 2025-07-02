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
    <div className="school-container">
      <h2>{schoolName} - Students</h2>
      <div className="student-grid">
        {participants.map((participant, index) => (
          <div key={index} className="student-card">
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
