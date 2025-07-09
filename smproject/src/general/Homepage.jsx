import { IconButton, Toolbar, Typography, Button, Box } from '@mui/material'
import React, {  useState } from 'react'
import FlexBetween from '../templates/FlexBetween'
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Slider from 'react-slick';
import logo1 from '../assets/srivv_logo_2.png'
import logo2 from '../assets/srivv_osa_logo.png'
import AnimatedPage from '../templates/AnimatedPage';

function Homepage() {
  const navigate=useNavigate();
   const settings = {
    dots: true,
    infinite: true,
    speed: 800, 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
    
  return (
    <AnimatedPage>
     <Box
    sx={{
      animation: "fadeIn 1.5s ease-in-out",
      "@keyframes fadeIn": {
        from: { opacity: 0 },
        to: { opacity: 1 }
      }
    }}
  >
    <div>
        <Box display="flex" flexDirection="column"  marginTop="2%">
        <Typography fontWeight={"bold"} fontFamily='nevis, `sans-serif`' fontSize={"4rem"} sx={{color: "black", textAlign:"center"}}>
        V   I   N   T   E   R   B   A   S   H    '25
        </Typography>
        <Typography fontWeight={"bold"} fontFamily='nevis, `sans-serif`' fontSize={"2rem"} sx={{color: "black", textAlign:"center"}}>
        CATCH-UP ! RISE ! TAKE-OVER
        </Typography>
        </Box>
        <Box sx={{ width: '100%', maxWidth: '1000px', margin: 'auto', border:'0.3rem solid  #FEC000', borderRadius: '15px' }}>
            <Slider {...settings}>
            {[1, 2, 3, 4, 5, 6, 7].map((index) => ( 
                <Box key={index} sx={{ position: 'relative' }}>
             <img
              src={require(`../assets/org_pics/assets/pic${index}.jpg`)}
              alt={`My pics in navbar ${index}`}
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                />
                </Box>
                    ))}
            </Slider>
        </Box>
        <Box display="flex" borderRadius="2rem" justifyContent="space-between" marginLeft="17%" marginTop="2%" marginRight="17%" sx={{backgroundColor:"black"}} padding="2%">
        <Typography fontWeight={"bold"} fontFamily='nevis, `sans-serif`' fontSize={"2rem"} sx={{color: "white", textAlign:"center"}}>
        Click here to register for Events
        </Typography>
        <Button onClick={() => {navigate(`/signIn`); }} sx={{
            backgroundColor:"#F37D00",
            color:"white",
            '&:hover': {
            backgroundColor: "#FEC000",
        },

        }}>Register</Button>
        </Box>
        <Box>
            <h1>About Us</h1>
            <h3 style={{
                display: "flex",
                justifyContent : "center",
                alignItems: "center",
                flexDirection: "column",
                width:"66%",
                marginLeft: "17%",
                textAlign:"justify"
            }}>
        With the blessings of the Almighty, the Old Students Association of Sri Vageesha Vidhyashram has been successfully conducting “Vinterbash” – our flagship interschool competition which showcases the best and brightest minds from various schools in Trichy for the past four years. Join us  to witness young minds unleash their creativity, skill, and strategy in a series of competitive events ranging from riveting debates, dazzling performances, cheery worthy goals, and intriguing intellect, as the fourth edition of Vinterbash is just around the corner – an event ‘where  champions rise.’ Registrations are now open. Mark your calendars for July 26 as we welcome you all to ignite dreams and define victories with us!
            </h3>
        </Box>
        <div>
        <Toolbar
            sx={{display:'flex', justifyContent: "space-between" , background: "black"}}>
            <FlexBetween>
            <Box display="flex" alignItems="center" flexDirection="column" gap="0.5rem">
            <Typography fontWeight={"bold"} fontSize={"1.5rem"} sx={{color: "white"}} >
           © Developed by Tech Team Of Vinterbash
            </Typography>
                  </Box>
            </FlexBetween>

            {/* Right Side */}
            <FlexBetween gap="1.5rem" marginLeft="10rem">
          <FlexBetween>
            <Box component="img"
                            alt='profile'
                            src={logo1}
                            height={"138px"}
                            width="138px"
                           
                            sx={{objectFit:"cover"}} />
            <Box component="img"
                            alt='profile'
                            src={logo2}
                            height={"200px"}
                            width="200px"
                           
                            sx={{objectFit:"cover"}} />
          </FlexBetween>
      </FlexBetween>
        </Toolbar>
    </div>
    </div>
    </Box>
    </AnimatedPage>
  )
}

export default Homepage