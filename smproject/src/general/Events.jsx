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

const imgMap = {
  "Chordially Yours!": music,
  "Acoustic Nirvana": music,
  "Nalla Otrainga da Reel-uh!": drama,
  "Imitation Game": cinema,
  "Unnai Kaanathu..!!": dance,
  "Drop the Beat": dance,
  "Ar(T)elic!": art,
  "DOOMSDAY: The Final Frame": art,
  "Koodu Vittu Koodu": tamillits,
  "Time Traveller's Theatre": elits,
  "The Triquizzard Tournament 5.O": quiz,
  "Ctrl + Alt + Decrypt": tech,
  "No Time To Solve": sport,
  "Vinter Bowl-Out: Turf Cricket": sport,
  "Vinter Kick-Off: 5-A Side Football": sport,
  "Coronation: Mr. & Ms. Vinterbash": osaLogo,
  "Vinter Goal-Rush: FIFA '25": sport,
};

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
          Events
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
                  src={imgMap[event] || osaLogo}
                  alt={event}
                  sx={{
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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </AnimatedPage>
  );
}

export default Events;
