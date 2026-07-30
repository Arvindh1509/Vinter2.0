import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import logo from "../assets/vbash_logo.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useStateValue } from "../StateProvider";
import AnimatedPage from "./AnimatedPage";

const navItems = [
  { text: "Dashboard" },
  { text: "Participants" },
  {text:"Organiser Dashboard"},
  { text: "Enter Results" },
  { text: "Teacher's Info" }
];

const Sidebar = ({ drawerWidth, isSidebarOpen, setSidebarOpen }) => {
  const { pathname } = useLocation();
  const [{ schoolName, schoolId }] = useStateValue();
  const [active, setactive] = useState("");
  const [eventsOpen, setEventsOpen] = useState(false);
  const navigate = useNavigate();
  const [{ events, organiserId }, dispatch] =
    useStateValue();
  const eventItems = events;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  useEffect(() => {
    setactive(pathname.substring(1));
  }, [pathname]);

  const handleEventsToggle = () => {
    setEventsOpen((prev) => !prev);
  };

  const renderNavItem = (text, Id) => {
    let lcText = "";

    if (text === "Dashboard") {
      lcText = "dashboard";
    }
    else if (text === "Organiser Dashboard") {
      lcText = "organiserDashboard";
    }
    else
    if (text === "Chordially yours") {
      lcText = "groupmusic";
    } else if (text === "Teacher's Info") {
      lcText = "teacherInfo";
    } else if (text === "Acoustic Nirvana") {
      lcText = "groupinst";
    } else if (text === "Sakkarapongalukku vadacurry") {
      lcText = "groupdrama";
    } else if (text === "Imitation game") {
      lcText = "improv";
    } else if (text === "Aththinthom!") {
      lcText = "classicaldance";
    } else if (text === "Naa ready dhan varava?") {
      lcText = "westerndance";
    } else if (text === "Arangam Adhiratumae") {
      lcText = "groupdance";
    } else if (text === "Ar(T)elic!") {
      lcText = "art1";
    } else if (text === "Kaapé D Art") {
      lcText = "art2";
    } else if (text === "Brand New Day: The First Frame") {
      lcText = "poster1";
    } else if (text === "Vector VOID") {
      lcText = "poster2";
    } else if (text === "வாயுள்ள பிள்ளை பிழைத்துக் கொள்ளும்") {
      lcText = "tamillits1";
    } else if (text === "முடிவு இங்கே! கதை எங்கே?") {
      lcText = "tamillits2";
    } else if (text === "Screenplay") {
      lcText = "screenplay";
    } else if (text === "Signal & Noise") {
      lcText = "elits1";
    } else if (text === "CIPHER") {
      lcText = "elits2";
    } else if (text === "The Triquizzard Tournament 6.0") {
      lcText = "triquizzard";
    } else if (text === "Vinter CTF – 2026") {
      lcText = "code";
    } else if (text === "Cubing") {
      lcText = "cubing";
    } else if (text === "Vinter Bowl-Out: Turf Cricket") {
      lcText = "cricket";
    } else if (text === "Vinter Kick-Off: 5-A Side Football") {
      lcText = "football";
    } else if (text === "The One - Mr and Ms Vinterbash") {
      lcText = "titleevent";
    } else if (text === "Vinter Chess Tournament - 2026") {
      lcText = "chess";
    } else if (text === "Vinter Premiere League - Auction") {
      lcText = "auction";
    } else if (text === "Thirai @180°") {
      lcText = "shortfilm";
    } else if (text === "Heritage Quest - 2026") {
      lcText = "heritage";
    } else if (text === "Enter Results") {
      lcText = "enterResults";
    } else {
      lcText = text.toLowerCase(); // default fallback
    }
    const isActive = active === lcText;

    return (
      <AnimatedPage key={text}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate(`/${lcText}`);
              setactive(lcText);
              dispatch({
                type: "SidebarEvent",
                activeEvent: text,
                activeEventId: Id,
              });
              if (isMobile) {
                setSidebarOpen(false);
              }
            }}
            sx={{
              backgroundColor: isActive ? "rgba(0, 0, 0, 0.08)" : "transparent",
              color: isActive ? "black" : "black",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
              fontFamily: `'nevis', sans-serif`,
              fontWeight: "600",
              fontSize: "24px",
            }}
          >
            <ListItemText primary={text} sx={{ ml: "1rem" }} />
            {isActive && (
              <ChevronRightIcon sx={{ ml: "auto", color: "black" }} />
            )}
          </ListItemButton>
        </ListItem>
      </AnimatedPage>
    );
  };

  return (
    <AnimatedPage>
      <Box component="nav">
        {isSidebarOpen && (
          <Drawer
            open={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            sx={{
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                boxSizing: "border-box",
                width: drawerWidth,
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "none",
              },
            }}
            transitionDuration={{ enter: 400, exit: 300 }}
          >
            <Box width="100%">
              <Box m="1.5rem 2rem 2rem 2rem">
                <FlexBetween>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    gap="0.5rem"
                  >
                    <img
                      src={logo}
                      alt="logo"
                      width="140px"
                      style={{
                        marginLeft: "10px",
                        filter: "brightness(0) saturate(100%)",
                        width: "120px",
                        height: "auto",
                      }}
                      onClick={() => {
                        // navigate(`/dashboard`);
                        if (isMobile) {
                          setSidebarOpen(false);
                        }
                      }}
                    />
                  </Box>
                  <IconButton onClick={() => setSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeftIcon sx={{ color: "black" }} />
                  </IconButton>
                </FlexBetween>
              </Box>

              <List>
                {navItems
                  .filter(({ text }) => {
                    if (schoolId === "999") {
                      // Hide Participants and Teacher's Info for admin
                      return (
                        text !== "Participants" && text !== "Teacher's Info"
                      );
                    } else if (organiserId) {
                      return text === "Organiser Dashboard" || text === "Enter Results";
                    } else {
                      return text !== "Enter Results" &&
                        text !== "Organiser Dashboard"
                    }
                  })
                  .map(({ text }) => renderNavItem(text))}

                {/* Events main item */}
                {!organiserId && (
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleEventsToggle}>
                      <ListItemText
                        primary="Events"
                        sx={{ ml: "1rem", color: "black" }}
                      />
                      {eventsOpen ? (
                        <ExpandLess sx={{ color: "black" }} />
                      ) : (
                        <ExpandMore sx={{ color: "black" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                )}
                {/* Events sub-items */}
                <Collapse in={eventsOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {eventItems.map((text) => (
                      <Box key={text.eventName} pl={4}>
                        {renderNavItem(text.eventName, text.eventId)}
                      </Box>
                    ))}
                  </List>
                </Collapse>
              </List>
            </Box>
          </Drawer>
        )}
      </Box>
    </AnimatedPage>
  );
};

export default Sidebar;
