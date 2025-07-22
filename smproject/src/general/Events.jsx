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
  "Chordially Yours!": music,
  "Acoustic Nirvana": inst,
  "Nalla Otrainga da Reel-uh!": drama,
  "Imitation Game": improv,
  "Unnai Kaanathu..!!": classicalDance,
  "Drop the Beat": dance,
  "Ar(T)elic!": art,
  "DOOMSDAY: The Final Frame": poster,
  "Koodu Vittu Koodu": tamillits,
  "Time Traveller's Theatre": elits,
  "The Triquizzard Tournament 5.O": quiz,
  "Ctrl + Alt + Decrypt": tech,
  "No Time To Solve": cubing,
  "Vinter Bowl-Out: Turf Cricket": cricket,
  "Vinter Kick-Off: 5-A Side Football": football,
  "Coronation: Mr. & Ms. Vinterbash": title,
  "Vinter Goal-Rush: FIFA '25": gaming,
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

  /* size helpers */
  const cardSize   = downSm ? 180 : downMd ? 220 : 250;
  const imgSize    = downSm ?  90 : downMd ? 100 : 120;
  const sideMargin = downSm ? "4%" : downMd ? "10%" : "20%";

  useEffect(() => {
    axios
      .get("/vinterbash/getAllEvents")
      .then((res) => setEvents(res.data.eventNames))
      .catch(() => alert("No events"));
  }, []);

  return (
    <AnimatedPage>
      <Box sx={{ px: sideMargin, py: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: "nevis, sans-serif",
            fontSize: downSm ? "1.8rem" : downMd ? "2.2rem" : "2.5rem",
          }}
        >
          Events & Venues
        </Typography>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          columns={downSm ? 1 : downMd ? 8 : 12}
        >
          {events.map((event, i) => (
            <Grid
              item
              xs={downSm ? 1 : 4}
              sm={4}
              md={4}
              key={i}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  width: cardSize,
                  height: cardSize,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  boxShadow: 3,
                  borderRadius: 3,
                }}
              >
                <CardMedia
                  component="img"
                  src={imgMap[event]}
                  alt={event}
                  sx={{
                    paddingTop : "20px",
                    width: imgSize,
                    height: imgSize,
                    borderRadius: 2,
                    objectFit: "cover",
                    mb: 1,
                  }}
                />
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    textAlign="center"
                    sx={{ fontSize: downSm ? "0.95rem" : "1.05rem" }}
                  >
                    {event}
                  </Typography>
                </CardContent>
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    textAlign="center"
                    sx={{ fontSize: downSm ? "0.95rem" : "1.05rem" }}
                  >
                    {timeMap[event]}
                  </Typography>
                </CardContent>
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    textAlign="center"
                    sx={{ fontSize: downSm ? "0.95rem" : "1.05rem" }}
                  >
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
