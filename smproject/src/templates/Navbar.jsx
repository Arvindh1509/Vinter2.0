import { IconButton, Toolbar, Typography, Button, Box } from '@mui/material'
import React, {  useState } from 'react'
import FlexBetween from './FlexBetween'
import MenuIcon from '@mui/icons-material/Menu';
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/srivv_osa_logo.png'

function Navbar({isSidebarOpen, setSidebarOpen }) {
  const [anchorEl,setAnchorEl]=useState(null);
  const isOpen=Boolean(anchorEl);
  const [{schoolName},dispatch]=useStateValue();
  const navigate=useNavigate();

     function handleClose(e){
    dispatch({
      type:'logout'
    })
    console.log(e);
    navigate("/signIn");
  }

    function handleClick(e){
        console.log("Side Bar Opened");
        return setAnchorEl(e.currentTarget);
        
    }
  return (
    <div>
        <Toolbar
            sx={{display:'flex', justifyContent: "space-between" , background: 'linear-gradient(135deg, #FEC000, #F37D00)'}}>
            <FlexBetween>
                <IconButton onClick={()=>setSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon   sx={{color:'white'}}/>
                </IconButton>
                <Typography fontWeight={"bold"} fontSize={"0.9rem"}
                  sx={{color: "White", fontSize:"50px", marginLeft:'25px', fontFamily: `'nevis', sans-serif`}}>
                    VINTERBASH 2025
                  </Typography>
            </FlexBetween>

            {/* Right Side */}
            <FlexBetween gap="1.5rem">
          <FlexBetween>
          <Box component="img"
                alt='profile'
                src={logo}
                height={"100px"}
                width="100px"
               
                sx={{objectFit:"cover"}} />
          <Button onClick={handleClick} sx={
            {
              display:"flex",
              justifyContent:"space-between",
              alignItems:'center',
              textTransform:"none",
              gap:"1rem"
            }
          }>
          

                <Typography fontWeight={"bold"} fontSize={"0.9rem"}
                  sx={{color: "white"}}>
                    {schoolName}
                  </Typography>

                  {/* <ArrowDropDownOutlined sx={{color:'white', fontSize:'25px'}}/> */}
          </Button>
          <Button onClick={handleClose} sx={{color:'white', backgroundColor:'transparent',border:'3px solid white',borderColor:'white', fontFamily: `'nevis', sans-serif`,fontWeight:'600',fontSize:'15px', '&:hover': {
      backgroundColor: '#f0f0f0',
      color:'black' // light gray on hover
    },}}>Log Out</Button>
        </FlexBetween>

      </FlexBetween>
        </Toolbar>
    </div>
  )
}

export default Navbar