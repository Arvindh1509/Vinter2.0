import { IconButton, Toolbar, Typography, Button, Box, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import FlexBetween from './FlexBetween'
import MenuIcon from '@mui/icons-material/Menu';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/srivv_osa_logo.png'

function Navbar({isSidebarOpen, setSidebarOpen }) {
  const [anchorEl,setAnchorEl]=useState(null);
  const isOpen=Boolean(anchorEl);
  const [{staffName1,staffName2,schoolName,organiserId},dispatch]=useStateValue();
  const navigate=useNavigate();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  
  function handleClose(e) {
     
      if(!staffName1&&!staffName2 && !organiserId){
        alert("Please fill the staff contact information from the Sidebar")
      }else{
    dispatch({
      type:'logout'
    })
    console.log(e);
    navigate("/signIn");
  }  // navigate("/signIn");
  
}


  function handleClick(e){
    return setAnchorEl(e.currentTarget);
  }

  return (
    <div style={{ padding: 'clamp(10px, 3vw, 20px)', display: 'flex', justifyContent: 'center' }}>
      <Toolbar sx={{
  position: 'relative',
        display:'flex',
  flexWrap: 'wrap',
        justifyContent: "space-between",
  alignItems: 'center',
  rowGap: '10px',
  border: '1px solid rgba(255, 255, 255, 0.32)',
  borderRadius: { xs: '24px', sm: '999px' },
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.22)',
  width: '100%',
  maxWidth: '100%',
  padding: 'clamp(6px, 1.5vw, 8px) clamp(14px, 4vw, 24px)',
  overflow: 'hidden',
  zIndex: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    zIndex: -1,
    borderRadius: 'inherit',
  },
}}>
        <FlexBetween sx={{ minWidth: 0 }}>
          <IconButton onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <MenuIcon sx={{ color: 'black' }} />
          </IconButton>
          <Typography fontWeight={"bold"}
            sx={{
              color: "black",
              fontSize: 'clamp(1.1rem, 4vw, 30px)',
              marginLeft: 'clamp(10px, 2vw, 25px)',
              fontFamily: `'nevis', sans-serif`,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: 0,
            }}>
            VINTERBASH 2026
          </Typography>
        </FlexBetween>

        <FlexBetween gap="clamp(0.5rem, 1.5vw, 1rem)" sx={{ minWidth: 0 }}>
          <Box
            component="img"
            alt='profile'
            src={logo}
            sx={{
              height: 'clamp(36px, 6vw, 60px)',
              width: 'clamp(36px, 6vw, 60px)',
              objectFit: "cover",
              filter: 'brightness(0)',
              flexShrink: 0,
            }}
          />

          {!isXs && (
            <Button onClick={() => {}} sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: 'center',
              textTransform: "none",
              gap: "1rem",
              minWidth: 0,
            }}>
              <Typography fontWeight={"bold"}
                sx={{
                  color: "black",
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 'clamp(90px, 18vw, 200px)',
                }}>
                {schoolName}
              </Typography>
            </Button>
          )}

          <Button
            onClick={handleClose}
            startIcon={!isXs && <LogoutRoundedIcon sx={{ fontSize: '16px !important' }} />}
            sx={{
              minWidth: isXs ? '40px' : 'auto',
              width: isXs ? '40px' : 'auto',
              height: isXs ? '40px' : 'auto',
              padding: isXs ? '8px' : 'clamp(6px, 1vw, 7px) clamp(14px, 2.5vw, 18px)',
              color: 'black',
              backgroundColor: 'transparent',
              border: '2px solid black',
              borderRadius: '999px',
              fontFamily: `'nevis', sans-serif`,
              fontWeight: '600',
              fontSize: 'clamp(11px, 2vw, 12px)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              '&:hover': { backgroundColor: '#f0f0f0', color: 'black' }
            }}
          >
            {isXs ? <LogoutRoundedIcon sx={{ fontSize: '18px' }} /> : 'Log Out'}
          </Button>
        </FlexBetween>
      </Toolbar>
    </div>
  )
}

export default Navbar