import { IconButton, Toolbar, Typography, Button, Box } from '@mui/material'
import React, {  useState } from 'react'
import FlexBetween from './FlexBetween'
import MenuIcon from '@mui/icons-material/Menu';
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';

function Navbar({isSidebarOpen, setSidebarOpen }) {
  const [anchorEl,setAnchorEl]=useState(null);
  const isOpen=Boolean(anchorEl);
  const [{schoolName},dispatch]=useStateValue();
  const navigate=useNavigate();

     function handleClose(e){
    dispatch({
      type:'logout'
    })
    navigate("/signIn")
    console.log(e);
  }

    function handleClick(e){
        console.log("Side Bar Opened");
        return setAnchorEl(e.currentTarget);
        
    }
  return (
    <div>
        <Toolbar
            sx={{display:'flex', justifyContent: "space-between" , backgroundColor:'#D4AB68'}}>
            <FlexBetween>
                <IconButton onClick={()=>setSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon   sx={{color:'white'}}/>
                </IconButton>
                <Typography fontWeight={"bold"} fontSize={"0.9rem"}
                  sx={{color: "White", fontSize:"50px", marginLeft:'25px'}}>
                    VINTERBASH
                  </Typography>
            </FlexBetween>

            {/* Right Side */}
            <FlexBetween gap="1.5rem">
          <FlexBetween>
          <Button onClick={handleClick} sx={
            {
              display:"flex",
              justifyContent:"space-between",
              alignItems:'center',
              textTransform:"none",
              gap:"1rem"
            }
          }>
          <Box component="img"
                alt='profile'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzwXgn0FyiHXZIQZmx-s7A-1ENxosvfoQiydMyBKsRBA&s"
                height={"32px"}
                width="32px"
                borderRadius={"50%"}
                sx={{objectFit:"cover"}} />

                <Typography fontWeight={"bold"} fontSize={"0.9rem"}
                  sx={{color: "black"}}>
                    {schoolName}
                  </Typography>

                  {/* <ArrowDropDownOutlined sx={{color:'white', fontSize:'25px'}}/> */}
          </Button>
          <Button onClick={handleClose} sx={{color:'black', backgroundColor:'white', borderRadius:'10px'}}>Log Out</Button>
        </FlexBetween>

      </FlexBetween>
        </Toolbar>
    </div>
  )
}

export default Navbar