import { IconButton, Toolbar, Typography, Button, Box } from '@mui/material'
import React, {  useState } from 'react'
import FlexBetween from '../templates/FlexBetween'
import { useStateValue } from '../StateProvider';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/vinter_logo_2.png'

function Navbar() {
  const navigate=useNavigate();
    
  return (
    <div>
        <Toolbar
            sx={{display:'flex', justifyContent: "space-between" , background: 'linear-gradient(200deg, #FEC000, #F37D00)'}}>
            <FlexBetween>
            <Box display="flex" alignItems="center" flexDirection="column" gap="0.5rem">
            <img src={logo} alt="logo" width="60px" style={{marginLeft:'10px', transform: 'rotate(100deg)' }} onClick={() => {
                                  navigate(`/homepage`); }} />
                  </Box>
            </FlexBetween>

            {/* Right Side */}
            <FlexBetween gap="1.5rem" marginLeft="10rem">
          <FlexBetween>
          <Button onClick={() => {navigate(`/events`); }}  sx={
            {
              display:"flex",
              justifyContent:"space-between",
              alignItems:'center',
              textTransform:"none",
              gap:"1rem"
            }
          }>
            <Typography fontWeight={"bold"} fontSize={"0.9rem"} sx={{color: "white"}} >Events</Typography>
          </Button>
          <Button href="https://drive.google.com/file/d/19yIQmbFQa8O7OOrL5MQYW7ba-uEuQO1l/view?usp=sharing"  sx={
            {
              display:"flex", 
              justifyContent:"space-between",
              alignItems:'center',
              textTransform:"none",
              gap:"1rem"
            }
          }>
            <Typography fontWeight={"bold"} fontSize={"0.9rem"} sx={{color: "white"}}>2025 Rule Book</Typography>
          </Button>
          <Button onClick={() => {navigate(`/POC`); }} 
          sx={
            {
              display:"flex",
              justifyContent:"space-between",
              alignItems:'center',
              textTransform:"none",
              gap:"1rem"
            }
          }>
            <Typography fontWeight={"bold"} fontSize={"0.9rem"} sx={{color: "white"}}>Point of Contact</Typography>
          </Button>
          <Button onClick={() => {navigate(`/signIn`); }}  sx={
            {
              display:"flex",
              justifyContent:"space-between",
              alignItems:'center',
              textTransform:"none",
              gap:"1rem"
            }
          }>
            <Typography fontWeight={"bold"} fontSize={"0.9rem"} sx={{color: "white"}}>Register for Events</Typography>
          </Button>
        </FlexBetween>
      </FlexBetween>
        </Toolbar>
        <Outlet/>
    </div>
  )
}

export default Navbar