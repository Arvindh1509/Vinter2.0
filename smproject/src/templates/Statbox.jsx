import React from 'react'
import FlexBetween from './FlexBetween'
import { Box, Typography } from '@mui/material'

function Statbox({title,value,increase,icon,description}) {
  return (
   <Box 
   display="flex"
   flexDirection="column"
   justifyContent="space-between"
   height={"150px"}
   p="1.25rem 1rem"
   backgroundColor={"#F68F04"}
   borderRadius="0.55rem"
   >
   {/* <FlexBetween> */}
   <div sx={{ display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // <-- this centers vertically
    height: '100%', }}>
    <Typography variant="h6" sx={{color: "white",fontFamily: `'nevis', sans-serif`,fontWeight:'600',fontSize:'24px'}}>
        {title}
    </Typography>
    <Typography variant='h3' fontWeight={"600"} sx={{color:"white",paddingTop:"30px",fontSize:'50px'}}>
        {value}
    </Typography>
    </div>
   {/* </FlexBetween> */}

   </Box>
  )
}

export default Statbox
