import React from 'react';
import './Participants.css';
import { useStateValue } from '../StateProvider';
import axios from '../axios';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AnimatedPage from '../templates/AnimatedPage';
import { useEffect } from 'react';

function Participants() {

  const students = ["Aarav", "Bhavya", "Charan", "Deepika", "Eshwar", "Farzana", "Gokul", "Harini"];
const[{schoolName},dispatch]=useStateValue();
const[participants,setParticipants]=useState([]);

useEffect(()=>{
axios.post('/vinterbash/eventParticipantMap',{schoolName})
.then((response)=>{
  setParticipants(response.data.participants);
})  
},[])

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
