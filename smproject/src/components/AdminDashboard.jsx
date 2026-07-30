import React, { useEffect, useState } from "react";
import axios from "../axios";
import * as XLSX from "xlsx";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AnimatedPage from "../templates/AnimatedPage";
import bgImage from "../assets/vbash_bg.jpeg";

export default function AdminDashboard() {

  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {

      setLoading(true);

      const response = await axios.post("/vinterbash/adminDashboard");

      setSchools(response.data);
      setFilteredSchools(response.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {

    const filtered = schools.filter((school) =>
      school.schoolName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredSchools(filtered);

  }, [search, schools]);

  const downloadRegistrations = async () => {

    try {

      const response = await axios.get(
        "/vinterbash/downloadRegistrations"
      );

      const worksheet =
        XLSX.utils.json_to_sheet(response.data);

      const workbook =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Registrations"
      );

      XLSX.writeFile(
        workbook,
        "VinterbashRegistrations.xlsx"
      );

    } catch (err) {

      console.error(err);

    }

  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (

    <AnimatedPage>

      <Box
        sx={{
          minHeight: "100vh",
          padding: "2.5rem 6% 4rem",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >

        <Typography
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: ".04em",
            fontSize: {
              xs: "2rem",
              md: "3rem"
            },
            fontFamily: "'Anton','Arial Black',Impact,sans-serif",
            color: "#000",
            mb: 5
          }}
        >
          Admin Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
            mb: 5
          }}
        >

          <TextField
            label="Search School"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            sx={{
              width: 350,

              "& .MuiOutlinedInput-root": {

                background:
                  "linear-gradient(135deg, rgba(255,255,255,.7), rgba(255,255,255,.25))",

                backdropFilter: "blur(24px)",

                borderRadius: "16px",

                "& fieldset": {

                  border:
                    "1px solid rgba(255,255,255,.7)"

                }

              }
            }}
          />

          <Button

            variant="contained"

            onClick={downloadRegistrations}

            sx={{

              background:
                "linear-gradient(135deg, rgba(255,255,255,.7), rgba(255,255,255,.25))",

              color: "#111827",

              fontWeight: 700,

              borderRadius: "16px",

              boxShadow:
                "0 18px 48px rgba(15,23,42,.22)",

              border:
                "1px solid rgba(255,255,255,.7)",

              backdropFilter: "blur(24px)",

              "&:hover": {

                background:
                  "linear-gradient(135deg, rgba(255,255,255,.8), rgba(255,255,255,.4))"

              }

            }}

          >

            Download Excel

          </Button>

        </Box>

        <Grid  container
    spacing={4}
    justifyContent="center"
    alignItems="stretch">

          {filteredSchools.map((school) => (

            <Grid

               item
    xs={12}
    sm={6}
    md={6}
    lg={4}
    xl={3}
    display="flex"

            >

              <Card

                sx={{

                 width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 360,
        borderRadius: "24px",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,.70), rgba(255,255,255,.24))",

                  border:
                    "1px solid rgba(255,255,255,.7)",

                  backdropFilter: "blur(24px)",

                  WebkitBackdropFilter: "blur(24px)",

                  overflow: "hidden",

                  boxShadow:
                    "0 18px 48px rgba(15,23,42,.22), inset 0 1px 0 rgba(255,255,255,.8)",

                  transition: ".4s",

                  "&:hover": {

                    transform:
                      "translateY(-8px) scale(1.02)",

                    boxShadow:
                      "0 28px 64px rgba(15,23,42,.28)"

                  },

                  "&::before": {

                    content: '""',

                    position: "absolute",

                    inset: 0,

                    background:
                      "linear-gradient(120deg, rgba(255,255,255,.42), transparent 42%, rgba(255,255,255,.12))"

                  }

                }}

              >

                <CardContent>

                  <Typography

                    sx={{

                      fontWeight: 700,

                      fontSize: "1.5rem",

                      color: "#111827",

                      mb: 2

                    }}

                  >

                    {school.schoolName}

                  </Typography>
                  <Box
    sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 1
    }}
>
    <Typography
        sx={{
            color: "#374151",
            fontWeight: 600
        }}
    >
        Registered Events
    </Typography>

    <Typography
        sx={{
            color: "#111827",
            fontWeight: 700
        }}
    >
        {school.registeredEvents}
    </Typography>
</Box>

<Box
    sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 1
    }}
>
    <Typography
        sx={{
            color: "#374151",
            fontWeight: 600
        }}
    >
        Teams
    </Typography>

    <Typography
        sx={{
            color: "#111827",
            fontWeight: 700
        }}
    >
        {school.totalTeams}
    </Typography>
</Box>

<Box
    sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 2
    }}
>
    <Typography
        sx={{
            color: "#374151",
            fontWeight: 600
        }}
    >
        Participants
    </Typography>

    <Typography
        sx={{
            color: "#111827",
            fontWeight: 700
        }}
    >
        {school.totalParticipants}
    </Typography>
</Box>

<Accordion
    sx={{
        background:
            "rgba(255,255,255,.30)",

        backdropFilter: "blur(10px)",

        borderRadius: "14px",

        boxShadow: "none",

        overflow: "hidden",

        "&:before": {
            display: "none"
        }
    }}
>

    <AccordionSummary
        expandIcon={
            <ExpandMoreIcon
                sx={{
                    color: "#111827"
                }}
            />
        }
    >

        <Typography
            sx={{
                fontWeight: 700,
                color: "#111827"
            }}
        >
            Registered Events
        </Typography>

    </AccordionSummary>

    <AccordionDetails>

        {school.events.map((event) => (

            <Box

                key={event.eventId}

                sx={{

                    background:
                        "linear-gradient(135deg, rgba(255,255,255,.55), rgba(255,255,255,.18))",

                    border:
                        "1px solid rgba(255,255,255,.55)",

                    borderRadius: "14px",

                    p: 2,

                    mb: 2,

                    transition: ".3s",

                    "&:hover": {

                        background:
                            "linear-gradient(135deg, rgba(255,255,255,.72), rgba(255,255,255,.30))",

                        transform: "translateY(-2px)"

                    }

                }}

            >

                <Typography

                    sx={{

                        fontWeight: 700,

                        fontSize: "1rem",

                        color: "#111827",

                        mb: 2

                    }}

                >

                    {event.eventName}

                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1
                    }}
                >

                    <Typography
                        sx={{
                            color: "#374151"
                        }}
                    >
                        Teams
                    </Typography>

                    <Typography
                        sx={{
                            color: "#111827",
                            fontWeight: 700
                        }}
                    >
                        {event.teamCount}
                    </Typography>

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >

                    <Typography
                        sx={{
                            color: "#374151"
                        }}
                    >
                        Participants
                    </Typography>

                    <Typography
                        sx={{
                            color: "#111827",
                            fontWeight: 700
                        }}
                    >
                        {event.participantCount}
                    </Typography>

                </Box>

            </Box>

        ))}

    </AccordionDetails>

</Accordion>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Box>

    </AnimatedPage>

  );

}