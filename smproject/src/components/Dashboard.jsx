import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useStateValue } from '../StateProvider';
import { Box, Typography } from '@mui/material';
import Statbox from '../templates/Statbox';
import FlexBetween from '../templates/FlexBetween';
import { Navigate } from 'react-router-dom';
import axios from '../axios';
import AnimatedPage from '../templates/AnimatedPage';
import logo from '../assets/Vinterbash_2025_first_page.png';

function Dashboard() {
  const [{ schoolId, schoolName }, dispatch] = useStateValue();
  const [totalEvents, setTotalEvents] = useState();
  const [ToRegEvents, setToRegEvents] = useState();
  const [partiallyReg, setPartiallyRegistered] = useState();
  const [fullReg, setFullyReg] = useState();

  useEffect(() => {
    axios.post('/vinterbash/registeredEvents', { schoolId })
      .then((response) => {
        console.log('InsideDashboard--->', response.data);
        setToRegEvents(response.data.notRegistered);
        setPartiallyRegistered(response.data.partiallyRegistered);
        setFullyReg(response.data.fullyRegistered);
        setTotalEvents(Number(response.data.fullyRegistered) + Number(response.data.notRegistered));
      });
  }, [schoolId]);

  return (
    schoolName ? (
      <AnimatedPage>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: { xs: '10px', sm: '20px', md: '40px' },
            textAlign: 'center',
            minHeight: '100vh',
            boxSizing: 'border-box',
          }}
        >
          <FlexBetween sx={{ width: '100%', justifyContent: 'center'}}>
            <Header />
          </FlexBetween>

          <Box
            
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            gap={2}
            width="100%"
            maxWidth="800px"
          >
            <Statbox title="Total Events" value={totalEvents || 0} />
            <Statbox title="Registered Events" value={fullReg || 0} />
            <Statbox title="Yet To Register" value={(totalEvents || 0) - (fullReg || 0)} />
          </Box>

          <Typography variant="h6" mt={5} mb={2} fontFamily= {`'nevis', sans-serif`}>
            View the Rulebook here ⬇
          </Typography>

          <a
            href="https://drive.google.com/file/d/19yIQmbFQa8O7OOrL5MQYW7ba-uEuQO1l/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#1a73e8',
              textDecoration: 'underline',
              display: 'inline-block',
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: '100%',
                maxWidth: '200px',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </a>
        </Box>
      </AnimatedPage>
    ) : (
      <Navigate to="/signIn" replace />
    )
  );
}

export default Dashboard;
