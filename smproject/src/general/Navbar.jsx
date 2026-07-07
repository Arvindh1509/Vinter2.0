import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import FlexBetween from "../templates/FlexBetween";
import logo from "../assets/vbash_logo.png";
import bgImage from "../assets/vbash_bg.jpeg";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm")); // <600 px
  const isHomepage = location.pathname === "/homepage";

  /* mobile-menu state */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  /* nav links */
  const links = [
    { label: "Events & Venues", to: "/events" },
    {
      label: "2025 Rule Book",
      href: "https://drive.google.com/file/d/19yIQmbFQa8O7OOrL5MQYW7ba-uEuQO1l/view?usp=sharing",
    },
    { label: "Point of Contact", to: "/POC" },
    { label: "Register for Events", to: "/signIn" },
  ];

  return (
    <Box
      className={`vb-app-shell ${isHomepage ? "vb-homepage-shell" : ""}`}
      style={isHomepage ? { "--vb-home-bg-image": `url(${bgImage})` } : undefined}
    >
      <Box className={`vb-nav-wrapper ${isHomepage ? "vb-nav-wrapper-homepage" : ""}`}>
        <Toolbar className="vb-nav-toolbar">
          {/* ==== Logo ==== */}
          <Box
            component="img"
            src={logo}
            alt="logo"
            onClick={() => navigate("/homepage")}
            className="vb-nav-logo"
          />

          {/* ==== Desktop Buttons ==== */}
          {!downSm && (
            <FlexBetween className="vb-nav-links">
              {links.map(({ label, to, href }) => (
                <Button
                  key={label}
                  onClick={to ? () => navigate(to) : undefined}
                  href={href}
                  className="vb-nav-button"
                >
                  <Typography className="vb-nav-button-label">
                    {label}
                  </Typography>
                </Button>
              ))}
            </FlexBetween>
          )}

          {/* ==== Mobile Hamburger ==== */}
          {downSm && (
            <>
              <IconButton onClick={handleOpen} className="vb-nav-hamburger">
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  className: "vb-nav-menu-paper",
                }}
              >
                {links.map(({ label, to, href }) => (
                  <MenuItem
                    key={label}
                    onClick={() => {
                      handleClose();
                      if (to) navigate(to);
                    }}
                    component={href ? "a" : "div"}
                    href={href}
                    target={href ? "_blank" : undefined}
                    rel={href ? "noopener noreferrer" : undefined}
                    className="vb-nav-menu-item"
                  >
                    {label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </Box>

      {/* render nested routes */}
      <Box className={`vb-page-shell ${isHomepage ? "vb-page-shell-homepage" : ""}`}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Navbar;