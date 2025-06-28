import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Layout from '../templates/Layout';
import { useStateValue } from '../StateProvider';
import { Box } from '@mui/material';
import Statbox from '../templates/Statbox';

function Homepage() {
  const [{schoolName}, dispatch] = useStateValue();

  return (
    <div>
    
      <Header />
    
    <Box mt="20px" display={"flex"}
    gap="20px"    >
      <Statbox title={"Total Events"} value={17}/>
      <Statbox title={"Registered Events"} value={3}/>
      <Statbox title={"Yet To Register"} value={17-3}/> 
    </Box> 
    </div>
  );
}

export default Homepage;
