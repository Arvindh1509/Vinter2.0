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
   backgroundColor={"#D4AB68"}
   borderRadius="0.55rem"
   >
   <FlexBetween>
    <Typography variant="h6" sx={{color: "white"}}>
        {title}
    </Typography>
    <Typography variant='h3' fontWeight={"600"} sx={{color:"white", paddingLeft:"50px"}}>
        {value}
    </Typography>
   </FlexBetween>

   </Box>
  )
}

export default Statbox
