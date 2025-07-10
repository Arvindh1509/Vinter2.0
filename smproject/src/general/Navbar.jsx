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
import { useNavigate, Outlet } from "react-router-dom";
import FlexBetween from "../templates/FlexBetween";
import logo from "../assets/vinter_logo_2.png";

function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm")); // <600 px

  /* mobile-menu state */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  /* nav links */
  const links = [
    { label: "Events", to: "/events" },
    {
      label: "2025 Rule Book",
      href: "https://drive.google.com/file/d/19yIQmbFQa8O7OOrL5MQYW7ba-uEuQO1l/view?usp=sharing",
    },
    { label: "Point of Contact", to: "/POC" },
    { label: "Register for Events", to: "/signIn" },
  ];

  return (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: "linear-gradient(200deg, #FEC000, #F37D00)",
          px: 2,
          flexWrap: downSm ? "wrap" : "nowrap",
        }}
      >
        {/* ==== Logo ==== */}
        <Box
          component="img"
          src={logo}
          alt="logo"
          onClick={() => navigate("/homepage")}
          sx={{
            width: downSm ? 45 : 60,
            transform: "rotate(100deg)",
            cursor: "pointer",
            my: downSm ? 1 : 0,
          }}
        />

        {/* ==== Desktop Buttons ==== */}
        {!downSm && (
          <FlexBetween gap="1.5rem" ml="10rem">
            {links.map(({ label, to, href }) => (
              <Button
                key={label}
                onClick={to ? () => navigate(to) : undefined}
                href={href}
                sx={{
                  textTransform: "none",
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <Typography fontWeight="bold" fontSize="0.9rem" color="white">
                  {label}
                </Typography>
              </Button>
            ))}
          </FlexBetween>
        )}

        {/* ==== Mobile Hamburger ==== */}
        {downSm && (
          <>
            <IconButton onClick={handleOpen} sx={{ color: "white" }}>
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              /* gradient dropdown + white text */
              PaperProps={{
                sx: {
                  background: "linear-gradient(200deg, #FEC000, #F37D00)",
                  color: "white",
                },
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
                  sx={{
                    color: "inherit",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
                  }}
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Toolbar>

      {/* render nested routes */}
      <Outlet />
    </div>
  );
}

export default Navbar;