import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import logo from '../assets/vinter_logo_1.png';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useStateValue } from '../StateProvider';
import AnimatedPage from './AnimatedPage';

const navItems = [
  { text: "Dashboard" },
  { text: "Participants" },
  { text : "Teacher's Info"}
];

const Sidebar = ({ drawerWidth, isSidebarOpen, setSidebarOpen }) => {
  const { pathname } = useLocation();
  const [active, setactive] = useState("");
  const [eventsOpen, setEventsOpen] = useState(false);
  const navigate = useNavigate();
  const[{events,activeEvent,activeEventId},dispatch]=useStateValue();
  const eventItems = events;

  useEffect(() => {
    setactive(pathname.substring(1));
  }, [pathname]);

  const handleEventsToggle = () => {
    setEventsOpen((prev) => !prev);
  };

  const renderNavItem = (text,Id) => {    

    let lcText=''
    
   if (text === 'Chordially Yours!') {
  lcText = 'groupmusic';
} else if (text==="Teacher's Info"){
   lcText = 'teacherInfo';
} else if (text === 'Acoustic Nirvana') {
  lcText = 'groupinst';
} else if (text === 'Nalla Otrainga da Reel-uh!') {
  lcText = 'groupdrama';
} else if (text === 'Imitation Game') {
  lcText = 'improv';
} else if (text === 'Unnai Kaanathu..!!') {
  lcText = 'classicaldance';
} else if (text === 'Drop the Beat') {
  lcText = 'westerndance';
} else if (text === 'Ar(T)elic!') {
  lcText = 'art';
} else if (text === 'DOOMSDAY: The Final Frame') {
  lcText = 'poster';
} else if (text === 'Koodu Vittu Koodu') {
  lcText = 'tamillits';
} else if (text === "Time Traveller's Theatre") {
  lcText = 'elits';
} else if (text === 'The Triquizzard Tournament 5.O') {
  lcText = 'triquizzard';
} else if (text === 'Ctrl + Alt + Decrypt') {
  lcText = 'code';
} else if (text === 'No Time To Solve') {
  lcText = 'cube';
} else if (text === 'Vinter Bowl-Out: Turf Cricket') {
  lcText = 'cricket';
} else if (text === 'Vinter Kick-Off: 5-A Side Football') {
  lcText = 'football';
} else if (text === 'Coronation: Mr. & Ms. Vinterbash') {
  lcText = 'title';
} else if (text === "Vinter Goal-Rush: FIFA '25") {
  lcText = 'fifa';
} else {
  lcText = text.toLowerCase(); // default fallback
}
    const isActive = active === lcText;
       

    return (
      <AnimatedPage>
      <ListItem key={text} disablePadding>
        <ListItemButton
          onClick={() => {
            navigate(`/${lcText}`);
            setactive(lcText);
            dispatch({
              type:'SidebarEvent',
              activeEvent:text,
              activeEventId:Id
                    })
          }}
          sx={{
            backgroundColor: isActive ? 'white' : 'transparent',
            color: isActive ? 'black' : 'black',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
            fontFamily: `'nevis', sans-serif`,fontWeight:'600',fontSize:'24px'
          }}
        >
          <ListItemText primary={text} sx={{ ml: "1rem" }} />
          {isActive && <ChevronRightIcon sx={{ ml: "auto" }} />}
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
              backgroundColor: '#F68F04',
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "2px solid #ccc",
            },
          }}
          transitionDuration={{ enter: 400, exit: 300 }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 2rem">
              <FlexBetween>
                <Box display="flex" alignItems="center" flexDirection="column" gap="0.5rem">
                  <img
                    src={logo}
                    alt="logo"
                    width="140px"
                    style={{ transform: 'rotate(70deg)',marginLeft:'10px' }}
                    onClick={() => {
                      navigate(`/dashboard`);
                    }}
                  />
                </Box>
                <IconButton onClick={() => setSidebarOpen(!isSidebarOpen)}>
                  <ChevronLeftIcon />
                </IconButton>
              </FlexBetween>
            </Box>

            <List>
              {navItems.map(({ text }) => renderNavItem(text))}

              {/* Events main item */}
              <ListItem disablePadding>
                <ListItemButton onClick={handleEventsToggle}>
                  <ListItemText primary="Events" sx={{ ml: "1rem" }} />
                  {eventsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>

              {/* Events sub-items */}
              <Collapse in={eventsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {eventItems.map(( text ) => (
                   
                    <Box key={text.eventName} pl={4}>
                      {renderNavItem(text.eventName,text.eventId)}
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
