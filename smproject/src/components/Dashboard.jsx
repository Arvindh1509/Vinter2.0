import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useStateValue } from '../StateProvider';
import { Box, Typography } from '@mui/material';
import Statbox from '../templates/Statbox';
import FlexBetween from '../templates/FlexBetween';
import { Navigate } from 'react-router-dom';
import axios from '../axios';
import AnimatedPage from '../templates/AnimatedPage';
import logo from '../assets/RuleBook-2026.png';
import bg from '../assets/vbash_bg.jpeg';
import StaffContact from './StaffContact';
import AdminDashboard from './AdminDashboard';

function Dashboard() {
  const [{ schoolName, schoolId,staffName1,staffName2,staffNumber1,staffNumber2 }, dispatch] = useStateValue();
  const [totalEvents, setTotalEvents] = useState(26);
  const [ToRegEvents, setToRegEvents] = useState();
  const [partiallyReg, setPartiallyRegistered] = useState();
  const [fullReg, setFullyReg] = useState();
  const [staff1Name, setStaff1Name] = useState('');
  const [staff1Number, setStaff1Number] = useState('');
  const [staff2Name, setStaff2Name] = useState('');
  const [staff2Number, setStaff2Number] = useState('');


  useEffect(() => {
    axios.post('/vinterbash/registeredEvents', { schoolId })
      .then((response) => {
        console.log('InsideDashboard--->', response.data);
        setToRegEvents(response.data.notRegistered);
        setPartiallyRegistered(response.data.partiallyRegistered);
        setFullyReg(response.data.fullyRegistered);
        setStaff1Name(response.data.teacher1name);
            setStaff1Number(response.data.teacher1number);
            setStaff2Name(response.data.teacher2name);
            setStaff2Number(response.data.teacher2number);
        dispatch({
              type: 'staff',
              payload: {
                staff1Name: response.data.teacher1name,
                staff2Name: response.data.teacher2name,
                staff1Number: response.data.teacher1number,
                staff2Number: response.data.teacher2number
              }
            });
      });
  }, [schoolId]);

  return (
    schoolName ? (
  <AnimatedPage>
    {schoolName === 'admin' ? (
      <Box
        sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',padding: { xs: '10px', sm: '20px', md: '40px' },
    textAlign: 'center',boxSizing: 'border-box',minHeight: '100vh',}}>
        <FlexBetween sx={{ width: '100%', justifyContent: 'center',flexDirection: 'column' }}>
          <Header />
          <AdminDashboard />
        </FlexBetween>
      </Box>
    ) : (
      <Box
        sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',padding: { xs: '10px', sm: '20px', md: '40px' },
    textAlign: 'center',boxSizing: 'border-box',minHeight: '100vh',}}>
        <FlexBetween sx={{ width: '100%', justifyContent: 'center' }}>
          <Header /> 
        </FlexBetween>

        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" alignItems="center" gap={2} width="100%" maxWidth="800px">
          <Statbox title="Total Events" value={totalEvents || 0} />
          <Statbox title="Fully Registered Events" value={fullReg || 0} />
          <Statbox title="Partially Reg Events" value={partiallyReg || 0} />
        </Box>

        <Typography variant="h6" mt={5} mb={2} fontFamily="'nevis', sans-serif" sx={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
          View the Rulebook here ⬇
        </Typography>

        <a href="https://drive.google.com/file/d/1yuaTzUJUm1Qgg4zLfkjlvkF2bDGfsXA7/view?usp=sharing" target="_blank" rel="noopener noreferrer"
          style={{color: '#1a73e8',textDecoration: 'underline',display: 'inline-block',}}>
          <img src={logo} alt="logo" style={{
              width: '80%',
              maxWidth: '200px',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </a>
      </Box>
    )}
  </AnimatedPage>
) : (
  <Navigate to="/signIn" replace />
)

  );
}

export default Dashboard;
