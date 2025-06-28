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
import logo from '../assets/vinterbash_2025_logo.png';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useStateValue } from '../StateProvider';

const navItems = [
  { text: "Dashboard" },
  { text: "Participants" },
];

const Sidebar = ({ drawerWidth, isSidebarOpen, setSidebarOpen }) => {
  const { pathname } = useLocation();
  const [active, setactive] = useState("");
  const [eventsOpen, setEventsOpen] = useState(false);
  const navigate = useNavigate();
  const[{schoolName,events,activeEvent},dispatch]=useStateValue();
  const eventItems = events;

  useEffect(() => {
    setactive(pathname.substring(1));
  }, [pathname]);

  const handleEventsToggle = () => {
    setEventsOpen((prev) => !prev);
  };

  const renderNavItem = (text) => {    
    const lcText = text==='FIFA Goal Rush'?'fifa':text.toLowerCase();
    const isActive = active === lcText;
       

    return (
      <ListItem key={text} disablePadding>
        <ListItemButton
          onClick={() => {
            navigate(`/${lcText}`);
            setactive(lcText);
            dispatch({
              type:'SidebarEvent',
              activeEvent:text
                    })
              console.log('ActiveEvent-->',activeEvent);
          }}
          sx={{
            backgroundColor: isActive ? 'white' : 'transparent',
            color: isActive ? 'black' : 'black',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <ListItemText primary={text} sx={{ ml: "1rem" }} />
          {isActive && <ChevronRightIcon sx={{ ml: "auto" }} />}
        </ListItemButton>
      </ListItem>
    );
  };

  return (
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
              backgroundColor: '#D4AB68',
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "2px solid #ccc",
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 2rem">
              <FlexBetween>
                <Box display="flex" alignItems="center" flexDirection="column" gap="0.5rem">
                  <img src={logo} alt="logo" width="120px" />
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
                   
                    <Box key={text} pl={4}>
                      {renderNavItem(text)}
                    </Box>
                  ))}
                </List>
              </Collapse>
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
