import {
  Box,
  Typography,
  Button,
  Toolbar,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AnimatedPage from "../templates/AnimatedPage";
import FlexBetween from "../templates/FlexBetween";
import logo1 from "../assets/srivv_logo_2.png";
import logo2 from "../assets/srivv_osa_logo.png";
import bgImage from "../assets/vbash_bg.jpeg";
import "./Homepage.css";

function Homepage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));  // < 960 px
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));  // < 600 px

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  /* helper widths */
  const sideMargin = downSm ? "4%" : downMd ? "8%" : "17%";

  return (
    <AnimatedPage>
      <Box
        className="vb-page"
        style={{ "--vb-bg-image": `url(${bgImage})` }}
      >
        {/* ===== hero (title centered over background) ===== */}
        <Box className="vb-hero">
          <Box className="vb-title-box">
            <Typography
              className="vb-main-title"
              sx={{
                fontFamily: '"Anton", "Arial Black", Impact, sans-serif',
                fontSize: 'clamp(2rem, 8.8vw, 7.6rem)',
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: '0.7rem',
              }}
            >
              VINTERBASH <span className="vb-year">’26</span>
            </Typography>

            <Typography
              className="vb-subtitle"
              component="div"
              sx={{
                fontFamily: '"Anton", "Arial Black", Impact, sans-serif',
                fontSize: 'clamp(1rem, 2.8vw, 1.8rem)',
                fontWeight: 100,
                letterSpacing: '0.16em',
                lineHeight: 1.2,
              }}
            >
              <span>From the greatest</span>
              <span className="vb-dot" aria-hidden="true">•</span>
              <span>To the greatest</span>
            </Typography>
          </Box>
        </Box>

        {/* ===== carousel ===== */}
        <Box className="vb-carousel-wrapper">
          <Slider {...settings}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Box key={i}>
                <Box
                  component="img"
                  src={require(`../assets/org_pics/assets/pic${i}.jpg`)}
                  alt={`carousel ${i}`}
                  className="vb-carousel-img"
                />
              </Box>
            ))}
          </Slider>
        </Box>

        {/* ===== register strip ===== */}
        {/* <FlexBetween
          sx={{
            flexWrap: downSm ? "wrap" : "nowrap",
            gap: 2,
            bgcolor: "black",
            borderRadius: 4,
            px: 3,
            py: 2,
            mt: 3,
            ml: sideMargin,
            mr: sideMargin,
          }}
        > */}
          {/* <Typography
            fontWeight="bold"
            fontFamily="nevis, sans-serif"
            fontSize="2rem"                
            sx={{
              color: "white",
              fontSize: downSm ? "1.3rem" : "2rem",
              textAlign: downSm ? "center" : "left",
              flex: "1 1 240px",
            }}
          >
            Click here to register for Events
          </Typography> */}

          {/* <Button
            onClick={() => navigate("/signIn")}
            sx={{
              bgcolor: "#F37D00",
              color: "white",
              "&:hover": { bgcolor: "#FEC000" },
              width: downSm ? "100%" : "auto",
              px: 4,
            }}
          >
            Register
          </Button>
        </FlexBetween> */}

        {/* ===== about ===== */}
        <Box className="vb-about-section">
          <Typography variant="h4" className="vb-about-heading">
            About&nbsp;Us
          </Typography>

          <Box className="vb-about-text">
            <p className="vb-about-paragraph">
              With the blessings of the Almighty, the Old Students Association of Sri Vageesha Vidhyashram proudly presents the fifth edition of Vinterbash – our flagship inter-school fest that has lit up Trichy with talent, creativity, and youthful spirit for the past four years.
            </p>
            <p className="vb-about-paragraph">
              What began as a celebration of excellence has now grown into one of the city’s most anticipated events, drawing the brightest students from schools across the region. From fierce debates and captivating performances to high-octane sports and mind-bending intellectual challenges, Vinterbash is where brilliance takes centre stage.
            </p>
            <p className="vb-about-paragraph">
              This year, it’s bigger. It’s bolder. And it’s bursting with even more excitement.
            </p>
            <p className="vb-about-paragraph">
              Vinterbash is not just a competition – it’s a stage where champions catch-up, rise, and take-over. It’s where passion meets purpose, and where young minds push the limits of what’s possible.
            </p>
            <p className="vb-about-paragraph">
              Let the countdown begin. Let the spirit ignite. Let Vinterbash roar!
            </p>
          </Box>
        </Box>

        {/* ===== footer ===== */}
        <Toolbar className="vb-footer-toolbar">
        <Box className="vb-footer-left">
          <Typography className="vb-footer-credit">
            © Developed by Tech Team Of SriVV OSA
          </Typography>
          <Box className="vb-footer-names-row">
          <Typography className="vb-footer-name">
            Arvindh Lakshman
          </Typography>
          <Typography className="vb-footer-name">
            Shrihari
          </Typography>
          <Typography className="vb-footer-name">
            Barath Srinivas
          </Typography>
          <Typography className="vb-footer-name">
            Arun Meyappan
          </Typography>
          <Typography className="vb-footer-name">
            Vishal V S
          </Typography>
          <Typography className="vb-footer-name">
            Deepak Kumar
          </Typography>
          </Box>
            </Box>
          <FlexBetween className="vb-footer-logos">
            <Box
              component="img"
              src={logo1}
              alt="srivv"
              className="vb-logo1"
            />
            
            <Box
              component="img"
              src={logo2}
              alt="osa"
              className="vb-logo2"
            />
          </FlexBetween>
        </Toolbar>
      </Box>
    </AnimatedPage>
  );
}

export default Homepage;