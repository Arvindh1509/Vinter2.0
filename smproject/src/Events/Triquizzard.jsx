import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import axios from '../axios';
import './Triquizzard.css'
import Three_Member_Team from '../components/Three_Member_Team';
import { useStateValue } from '../StateProvider';
import RegisteredTeam from '../components/RegisteredTeam';

function Triquizzard(){

    const[{schoolName,activeEvent},dispatch]=useStateValue();
    const [registeredTeams, setRegisteredTeams] = useState([]);
    const[evntId,setEventId]=useState();
useEffect(()=>{
    axios.post(`/vinterbash/eventTeams`,{schoolName,activeEvent})
    .then((response)=>{
        console.log('InsideTriquizzard-->',response.data);
        setRegisteredTeams(response.data.teams);
        setEventId(response.data.eventId);
               
    })
    .catch((error)=>{
        console.log("Error fetching teams:",error);
        
    })
},[schoolName,activeEvent]);
console.log("length-->",registeredTeams.length);
console.log("Event Id-->",evntId);

    return(
        <div className='ThreePEvent'>
        {registeredTeams.length === 2 ? (
  <Box>
    {registeredTeams.map((team) => (
      <RegisteredTeam key={team.teamId} team={team} />
    ))}
  </Box>
) : registeredTeams.length === 1 ? (
  <Box>
    {registeredTeams.map((team) => (
      <div key={team.teamId}>
        <RegisteredTeam eventId={evntId} team={team} />
        <Three_Member_Team />
      </div>
    ))}
  </Box>
) : (
  <div>
    <Three_Member_Team />
    <Three_Member_Team />
  </div>
)}
        
        </div>
    )
}

export default Triquizzard
