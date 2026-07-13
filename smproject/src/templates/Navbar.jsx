import { IconButton, Toolbar, Typography, Button, Box } from '@mui/material'
import React, { useState } from 'react'
import FlexBetween from './FlexBetween'
import MenuIcon from '@mui/icons-material/Menu';
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/srivv_osa_logo.png'

function Navbar({isSidebarOpen, setSidebarOpen }) {
  const [anchorEl,setAnchorEl]=useState(null);
  const isOpen=Boolean(anchorEl);
  const [{staffName1,staffName2,schoolName},dispatch]=useStateValue();
  const navigate=useNavigate();

  function handleClose(e){
    if(!staffName1&&!staffName2){
      alert("Please fill the staff contact information from the Sidebar")
    }else{
      dispatch({ type:'logout' })
      navigate("/signIn");
    }
  }

  function handleClick(e){
    return setAnchorEl(e.currentTarget);
  }

  return (
    <div style={{padding: '16px', display:'flex', justifyContent:'center'}}>
      <Toolbar sx={{
        display:'flex',
        justifyContent: "space-between",
        background: 'rgba(255, 255, 255, 0.16)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(255, 255, 255, 0.32)',
        borderRadius: '999px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.22)',
        width: '100%',
        padding: '8px 24px',
      }}>
        <FlexBetween>
          <IconButton onClick={()=>setSidebarOpen(!isSidebarOpen)}>
            <MenuIcon sx={{color:'black'}}/>
          </IconButton>
          <Typography fontWeight={"bold"}
            sx={{color: "black", fontSize:"30px", marginLeft:'25px', fontFamily: `'nevis', sans-serif`}}>
            VINTERBASH 2026
          </Typography>
        </FlexBetween>

        <FlexBetween gap="1.5rem">
          <FlexBetween>
            <Box component="img"
              alt='profile'
              src={logo}
              height={"60px"}
              width="60px"
              sx={{objectFit:"cover", filter:'brightness(0)'}} />
            <Button onClick={handleClick} sx={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:'center',
              textTransform:"none",
              gap:"1rem"
            }}>
              <Typography fontWeight={"bold"} fontSize={"0.9rem"} sx={{color: "black"}}>
                {schoolName}
              </Typography>
            </Button>
            <Button onClick={handleClose} sx={{
              color:'black',
              backgroundColor:'transparent',
              border:'2px solid black',
              borderRadius:'999px',
              fontFamily: `'nevis', sans-serif`,
              fontWeight:'600',
              fontSize:'12px',
              '&:hover': { backgroundColor: '#f0f0f0', color:'black' }
            }}>Log Out</Button>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </div>
  )
}

export default Navbar