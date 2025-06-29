import React, { useEffect, useReducer, useState } from 'react';
import Header from './Header';
import Layout from '../templates/Layout';
import { useStateValue } from '../StateProvider';
import { Box } from '@mui/material';
import Statbox from '../templates/Statbox';
import FlexBetween from '../templates/FlexBetween';
import { Navigate, useLocation } from 'react-router-dom';
import axios from '../axios';

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
            setTotalEvents(fullReg+ToRegEvents);
        })
       
       },[])
       
    

  return (
    schoolName?
    <div>
    <FlexBetween sx={{marginLeft:"20%"}} >
      <Header />
    </FlexBetween>
    <Box mt="20px" display={"flex"} gap="20px" marginLeft={"22%"}   >
      <Statbox title={"Total Events"} value={totalEvents}/>
      <Statbox title={"Registered Events"} value={fullReg}/>
      <Statbox title={"Yet To Register"} value={ToRegEvents}/> 
    </Box> 
    </div>
    :<Navigate to={'/signIn'} replace={true}/>
  );
}

export default Dashboard;
