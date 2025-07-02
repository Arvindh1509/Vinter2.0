import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useStateValue } from '../StateProvider';
import { Box } from '@mui/material';
import Statbox from '../templates/Statbox';
import FlexBetween from '../templates/FlexBetween';
import { Navigate } from 'react-router-dom';
import axios from '../axios';
import AnimatedPage from '../templates/AnimatedPage';
import logo from '../assets/Vinterbash_2025_first_page.png';

function Dashboard() {
  const [{schoolId,schoolName}, dispatch] = useStateValue();
  const[totalEvents,setTotalEvents]=useState();
  const[ToRegEvents,setToRegEvents]=useState();
  const[partiallyReg,setPartiallyRegistered]=useState();
  const[fullReg,setFullyReg]=useState();
        useEffect(() => {
       axios.post('/vinterbash/registeredEvents', {schoolId})
        //change to schoolId
        .then((response)=>{
            console.log('InsideDashboard--->',response.data);            
            
            setToRegEvents(response.data.notRegistered);
            setPartiallyRegistered(response.data.partiallyRegistered);
            setFullyReg(response.data.fullyRegistered);
            setTotalEvents(Number(fullReg)+Number(ToRegEvents));
        })
       
       },[])
       
    

  return (
    schoolName?
    <AnimatedPage>
    
    <div>
    <FlexBetween sx={{marginLeft:"20%"}} >
      <Header />
    </FlexBetween>
    <Box mt="20px" display={"flex"} gap="20px" marginLeft={"29%"}   >
      <Statbox title={"Total Events"} value={17}/>
      <Statbox title={"Registered Events"} value={fullReg}/>
      <Statbox title={"Yet To Register"} value={17-fullReg}/> 
    </Box> 
    <h3>
  View the Rulebook here ⬇
  </h3>
  <a
    href="https://drive.google.com/file/d/19yIQmbFQa8O7OOrL5MQYW7ba-uEuQO1l/view?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: '#1a73e8', textDecoration: 'underline' }}
  >
  <img src={logo} alt="logo" width="120px" />
  </a>

    </div>
    </AnimatedPage>
    :<Navigate to={'/signIn'} replace={true}/>
    
  );
}

export default Dashboard;
