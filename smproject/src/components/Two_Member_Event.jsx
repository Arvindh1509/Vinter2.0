import React, { useState } from 'react'
import { Box } from '@mui/material'
import axios from '../axios';
import './Three_Member_Team.css'
// import { useStateValue } from '../../StateProvider';

function Two_Member_Team() {
  const [teamName,setTeamName]=useState('');
  const [p1,setP1]=useState('');
  const [p2,setP2]=useState('');
  const [p3,setP3]=useState('');

  function handleEvent(e){
    e.preventDefault();
    {if(teamName,p1,p2,p3)
        {
    axios.post('/book_insert',{teamName,p1,p2,p3,
        // sellerEmail,
        })
    .then((data)=>{
      setTeamName('')
      setP1('')
      setP2('')
      setP3('')
      alert('Added Successfully') 
    })
    .catch((error)=>alert(error.response.data) 
    )}
    else{
     alert("not successful")
    }
  }
  }
  return (
    <div className='login'>
        <div className='register_container'>

        <form >
        {/* TEAM NAME */}
        <h5>Team Name</h5>
        <input type='text' value={teamName} placeholder="Type Team Name" onChange={(e)=>setTeamName(e.target.value)} className='register_form' />

        {/* PARTICIPANT 1 */}
        <h5>Participant 1 </h5>
        <input type='text'value={p1} placeholder="Type Candidate's Name" onChange={(e)=>{setP1(e.target.value);}} className={" register_form"} />

        {/* PARTICIPANT 2 */}
        <h5>Participant 2 </h5>
        <input type='text' value={p2} placeholder="Type Candidate's Name" onChange={(e)=>{setP2(e.target.value)}} className={" register_form"} />

        {/* SUBMIT TEAM */}
        <button className='login_signin' type='submit' onClick={(!teamName||!p1||!p2||!p3)?()=>{alert("Fill The Required Details")}: handleEvent}>Click to add the team</button>
        </form>
        </div>
    </div>
  )
}

export default Two_Member_Team
