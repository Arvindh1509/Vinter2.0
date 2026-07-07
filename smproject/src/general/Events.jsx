import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  useTheme,         // NEW
  useMediaQuery,    // NEW
} from "@mui/material";
import axios from "../axios";
import AnimatedPage from "../templates/AnimatedPage";
import bgImage from "../assets/vbash_bg.jpeg";
import "./Events.css";

/* images */
import art from "../assets/org_pics/assets/ART.png";
import classicalDance from "../assets/org_pics/assets/CLASSICALDANCE.png";
import dance from "../assets/org_pics/assets/GROUPDANCE.png";
import drama from "../assets/org_pics/assets/GROUPDRAMA.png";
import elits from "../assets/org_pics/assets/ENGLITS.png";
import music from "../assets/org_pics/assets/GROUPMUSIC.png";
import inst from "../assets/org_pics/assets/GROUPINSTRUMENT.png";
import quiz from "../assets/org_pics/assets/QUIZ.png";
import cricket from "../assets/org_pics/assets/TURFCRICKET.png";
import football from "../assets/org_pics/assets/TURFFOOTBALL.png";
import tamillits from "../assets/org_pics/assets/TAMLITS.png";
import tech from "../assets/org_pics/assets/CODING.png";
import title from "../assets/org_pics/assets/TITLEEVENT.png";
import cubing from "../assets/org_pics/assets/RUBIK_SCUBE.png";
import gaming from "../assets/org_pics/assets/GAMING.png";
import poster from "../assets/org_pics/assets/DOOMSDAY.png"
import improv from "../assets/org_pics/assets/IMITATIONGAME.png"

const imgMap = {
  "Chordially yours": music,
  "Acoustic Nirvana": inst,
  "Imitation game": improv,
  "Ar(T)elic!": art,
  "The Triquizzard Tournament 6.0": quiz,
  "Vinter CTF – 2026": tech,
  "Cubing": cubing,
  "Vinter Bowl-Out: Turf Cricket": cricket,
  "Vinter Kick-Off: 5-A Side Football": football,
  "The One - Mr and Ms Vinterbash": title,
  "Vinter Goal-Rush: FIFA '25": gaming,
  "Screenplay":drama,
  "Heritage Quest - 2026":quiz,
  "Kaapé D Art":art,
  "வாயுள்ள பிள்ளை பிழைத்துக் கொள்ளும்":tamillits,
  "முடிவு இங்கே! கதை எங்கே?":tamillits,
  "Naa ready dhan varava?":drama,
  "Vinter Chess Tournament - 2026":gaming,
  "CIPHER":tech,
  "Signal & Noise":music,
  "Vinter Premiere League - Auction":gaming,
  "Brand New Day: The First Frame":poster,
  "Vector VOID":tech,
  "Aththinthom!":dance,
  "Sakkarapongalukku vadacurry":tamillits,
  "Arangam Adhiratumae":classicalDance,
  "Thirai @180°":poster,
};

const timeMap ={
  "Chordially Yours!": "9.15 AM to 11.15 AM",
  "Acoustic Nirvana": "2.00PM - 4.00PM",
  "Nalla Otrainga da Reel-uh!": "11.30AM - 1.30PM",
  "Imitation Game": "Prelims: 2.30PM - 3.30PM | Finals: 4.00PM - 5.00PM",
  "Unnai Kaanathu..!!": "9.15 AM to 11.15 AM",
  "Drop the Beat": "2.00PM - 4.00PM",
  "Ar(T)elic!": "2PM - 4PM",
  "DOOMSDAY: The Final Frame": "",
  "Koodu Vittu Koodu": "Prelims: 11.30AM - 12.30AM | Finals: 2.00PM - 4.00PM",
  "Time Traveller's Theatre": "11.30 AM - 1.30PM",
  "The Triquizzard Tournament 5.O": "Prelims: 9.30AM - 10.30AM | Finals: 11.30AM - 1.30PM ",
  "Ctrl + Alt + Decrypt": "Prelims : 9.30AM - 10.30Am | Finals : 11.30AM - 1.30PM ",
  "No Time To Solve": "Prelims: 2.00PM - 3.00PM | Finals: 4.00PM - 5.00PM ",
  "Vinter Bowl-Out: Turf Cricket": "9AM - 6PM",
  "Vinter Kick-Off: 5-A Side Football": "9AM - 6PM",
  "Coronation: Mr. & Ms. Vinterbash": "Prelims: 10.30AM - 11.00AM | Finals: 5.00PM - 6.00PM ",
  "Vinter Goal-Rush: FIFA '25": "Elimination: 11.30AM - 1.30PM | Knockouts: 2.00PM - 4.00PM",
}

const venueMap={
  "Chordially Yours!": " Venue: Rangapriya",
  "Acoustic Nirvana": " Venue: Hareetham",
  "Nalla Otrainga da Reel-uh!": " Venue: Rangapriya",
  "Imitation Game": "Prelims Venue: :3S,3U,3V | Finals Venue:  Hareetham",
  "Unnai Kaanathu..!!": " Venue: Hareetham",
  "Drop the Beat": " Venue: Rangapriya",
  "Ar(T)elic!": " Venue: Physics Laboratory, Biology Laboratory",
  "DOOMSDAY: The Final Frame": "",
  "Koodu Vittu Koodu": "Prelims Venue:  2U, 2N, 2S | Finals Venue:  2N, 2U, 2S",
  "Time Traveller's Theatre": " Venue: Hareetham",
  "The Triquizzard Tournament 5.O": "Prelims Venue:  2V,1U,1S | Finals Venue:  Confrenece Hall",
  "Ctrl + Alt + Decrypt": "Prelims Venue:  Creya Lab | Finals Venue:   Creya Lab",
  "No Time To Solve": "Prelims Venue:  5S, 5N | Finals Venue:  5S, 5N ",
  "Vinter Bowl-Out: Turf Cricket": " Venue: Green Grass Turf, Srirangam",
  "Vinter Kick-Off: 5-A Side Football": " Venue: Green Grass Turf, Srirangam",
  "Coronation: Mr. & Ms. Vinterbash": "Prelims Venue:  4U ,4S, 4N | Finals Venue:  Rangapriya",
  "Vinter Goal-Rush: FIFA '25": "Elimination Venue:  AV Hall | Knockouts Venue:  AV Hall",
}

function Events() {
  const [events, setEvents] = useState([]);
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));  // < 960 px
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));  // < 600 px

  const pageClassName = downSm ? "events-page events-page--sm" : downMd ? "events-page events-page--md" : "events-page";
  const titleClassName = downSm ? "events-title events-title--sm" : downMd ? "events-title events-title--md" : "events-title";
  const cardClassName = downSm ? "event-card event-card--sm" : downMd ? "event-card event-card--md" : "event-card";
  const mediaClassName = downSm ? "event-card-media event-card-media--sm" : downMd ? "event-card-media event-card-media--md" : "event-card-media";
  const textClassName = downSm ? "event-card-text event-card-text--sm" : downMd ? "event-card-text event-card-text--md" : "event-card-text";

  useEffect(() => {
    axios
        .get("/vinterbash/getAllEvents")
        .then((res) => {
            console.log("Backend Response:", res.data.eventNames);
            setEvents(res.data.eventNames);
        })
        .catch((err) => console.log(err));
}, []);

  return (
    <AnimatedPage>
      <Box className={pageClassName} style={{ "--vb-bg-image": `url(${bgImage})` }}>
        <Typography variant="h4" align="center" gutterBottom className={titleClassName}>
          Events & Venues
        </Typography>

        <Grid container spacing={3} justifyContent="center" columns={downSm ? 1 : downMd ? 8 : 12} className="events-grid">
          {events.map((event, i) => (
            <Grid item xs={downSm ? 1 : 4} sm={4} md={4} key={i} className="events-grid-item">
              <Card className={cardClassName}>
                <CardMedia component="img" src={imgMap[event]} alt={event} className={mediaClassName} />
                <CardContent className="event-card-content">
                  <Typography variant="h6" className={textClassName}>
                    {event}
                  </Typography>
                </CardContent>
                <CardContent className="event-card-content">
                  <Typography variant="h6" className={textClassName}>
                    {timeMap[event]}
                  </Typography>
                </CardContent>
                <CardContent className="event-card-content">
                  <Typography variant="h6" className={textClassName}>
                    {venueMap[event]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </AnimatedPage>
  );
}

export default Events;
