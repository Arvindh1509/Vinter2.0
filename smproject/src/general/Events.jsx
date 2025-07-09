import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "../axios";
import Navbar from "./Navbar";
import art from "../assets/org_pics/assets/art.jpg";
import cinema from "../assets/org_pics/assets/cinema.jpg";
import dance from "../assets/org_pics/assets/dance.jpg";
import drama from "../assets/org_pics/assets/drama.jpg";
import elits from "../assets/org_pics/assets/elits.jpg";
import music from "../assets/org_pics/assets/music.jpg";
import quiz from "../assets/org_pics/assets/quiz.jpg";
import sport from "../assets/org_pics/assets/sport.jpg";
import tamillits from "../assets/org_pics/assets/tamillits.jpg";
import tech from "../assets/org_pics/assets/tech.jpg";
import osaLogo from "../assets/vinterbash_2025_logo.png";
import AnimatedPage from "../templates/AnimatedPage";


// Events data
// const events = [
//   { title: "Art", imgSrc: art },
//   { title: "Art", imgSrc: art },
//   { title: "Cinema", imgSrc: cinema },
//   { title: "Dance", imgSrc: dance },
//   { title: "Dance", imgSrc: dance },
//   { title: "Dance", imgSrc: dance },
//   { title: "Dramatics", imgSrc: drama },
//   { title: "Dramatics", imgSrc: drama },
//   { title: "English literature", imgSrc: elits },
//   { title: "English literature", imgSrc: elits },
//   { title: "Music", imgSrc: music },
//   { title: "Music", imgSrc: music },
//   { title: "Quiz", imgSrc: quiz },
//   { title: "Quiz", imgSrc: quiz },
//   { title: "Sports", imgSrc: sport },
//   { title: "Sports", imgSrc: sport },
//   { title: "தமிழ் இலக்கியம்", imgSrc: tamillits },
//   { title: "Tech", imgSrc: tech },
//   { title: "Title event", imgSrc: eventvinterlogo },
// ];

function Events() {
  const [events,setEvents]=useState([]);
  useEffect(()=>{
    axios.get('/vinterbash/getAllEvents')
    .then((response)=>{
        setEvents(response.data.eventNames);
        console.log("EventNames---->",response.data.eventNames);
    })
    .catch((error)=>{
        alert('No events');
    })
  },[]);

  return (
    <AnimatedPage>
    <div>
   <Box sx={{ padding: 4 }}>
  <Typography variant="h4" align="center" gutterBottom sx={{fontFamily:`nevis:'sans-serif'`}}>
    Events
  </Typography>

  <Grid container spacing={3} alignItems="center" marginLeft="20%" marginRight="205">
    {events.map((event, index) => (
      <Grid item xs={12} key={index}>
        <Card sx={{  width: 250,
          height: 250,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          margin: "auto", // center horizontally
          boxShadow: 3,
          borderRadius: 3,}}>
          <CardMedia
            component="img"
            image={
                 event === "Chordially Yours!" ? music :
                    event === "Acoustic Nirvana" ? music :
                    event === "Nalla Otrainga da Reel-uh!" ? drama :
                    event === "Imitation Game" ? cinema :
                    event === "Unnai Kaanathu..!!" ? dance :
                    event === "Drop the Beat" ? dance :
                    event === "Ar(T)elic!" ? art :
                    event === "DOOMSDAY: The Final Frame" ? art :
                    event === "Koodu Vittu Koodu" ? tamillits :
                    event === "Time Traveller's Theatre" ? elits :
                    event === "The Triquizzard Tournament 5.O" ? quiz :
                    event === "Ctrl + Alt + Decrypt" ? tech :
                    event === "No Time To Solve" ? sport :
                    event === "Vinter Bowl-Out: Turf Cricket" ? sport :
                    event === "Vinter Kick-Off: 5-A Side Football" ? sport :
                    event === "Coronation: Mr. & Ms. Vinterbash" ? osaLogo :
                    event === "Vinter Goal-Rush: FIFA '25" ? sport :
                    osaLogo
            } 
            alt={event}
            sx={{ width: 120, height: 120, objectFit: "cover", borderRadius: 2 }}
          />
          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              {event}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>

    </div>
    </AnimatedPage>
  );
}

export default Events;
