import React, { useEffect, useReducer, useState } from 'react';
import Header from './Header';
import Layout from '../templates/Layout';
import { useStateValue } from '../StateProvider';
import { Box } from '@mui/material';
import Statbox from '../templates/Statbox';
import FlexBetween from '../templates/FlexBetween';
import { Navigate } from 'react-router-dom';
import axios from '../axios';

function Dashboard() {
  const [{schoolName}, dispatch] = useStateValue();
  const[totalEvents,setTotalEvents]=useState();
  const[ToRegEvents,setToRegEvents]=useState();
  const[partiallyReg,setPartiallyRegistered]=useState();
  const[fullReg,setFullyReg]=useState();

    
        axios.post('/vinterbash/registeredEvents', { schoolName })
        .then((response)=>{
            console.log('InsideDashboard--->',response.data);            
            setTotalEvents(17);
            setToRegEvents(response.data.notRegistered);
            setPartiallyRegistered(response.data.partiallyRegistered);
            setFullyReg(response.data.fullyRegistered);
        })
    

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
