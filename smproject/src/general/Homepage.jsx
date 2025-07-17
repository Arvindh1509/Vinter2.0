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
import AnimatedPage from "../templates/AnimatedPage";
import FlexBetween from "../templates/FlexBetween";
import logo1 from "../assets/srivv_logo_2.png";
import logo2 from "../assets/srivv_osa_logo.png";

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
        sx={{
          animation: "fadeIn 1.5s ease-in-out",
          "@keyframes fadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
          px: downSm ? 1 : 0,           /* lite horizontal pad for tiny phones */
        }}
      >
        {/* ===== title ===== */}
        <Box display="flex" flexDirection="column" mt="2%">
          <Typography
            fontWeight="bold"
            fontFamily="nevis, sans-serif"
            fontSize="4rem"               /* original size */
            sx={{
              color: "black",
              textAlign: "center",
              lineHeight: downSm ? 1.1 : 1,  // prevent wrap overlap
              fontSize: downSm ? "2.5rem" : downMd ? "3rem" : "4rem",
            }}
          >
            V&nbsp;I&nbsp;N&nbsp;T&nbsp;E&nbsp;R&nbsp;B&nbsp;A&nbsp;S&nbsp;H&nbsp;’25
          </Typography>

          <Typography
            fontWeight="bold"
            fontFamily="nevis, sans-serif"
            fontSize="2rem"               /* original size */
            sx={{
              color: "black",
              textAlign: "center",
              fontSize: downSm ? "1.3rem" : downMd ? "1.6rem" : "2rem",
            }}
          >
            CATCH-UP&nbsp;.&nbsp;RISE&nbsp;.&nbsp;TAKE-OVER
          </Typography>
        </Box>

        {/* ===== carousel ===== */}
        <Box
          sx={{
            width: "100%",
            maxWidth: downSm ? 320 : downMd ? 700 : 1000, // shrink below 960 px
            mx: "auto",
            mt: 2,
            border: "0.3rem solid #FEC000",
            borderRadius: 3,
          }}
        >
          <Slider {...settings}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Box key={i}>
                <Box
                  component="img"
                  src={require(`../assets/org_pics/assets/pic${i}.jpg`)}
                  alt={`carousel ${i}`}
                  sx={{ width: "100%", height: "auto", borderRadius: 2 }}
                />
              </Box>
            ))}
          </Slider>
        </Box>

        {/* ===== register strip ===== */}
        <FlexBetween
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
        >
          <Typography
            fontWeight="bold"
            fontFamily="nevis, sans-serif"
            fontSize="2rem"                 /* keep original */
            sx={{
              color: "white",
              fontSize: downSm ? "1.3rem" : "2rem",
              textAlign: downSm ? "center" : "left",
              flex: "1 1 240px",
            }}
          >
            Click here to register for Events
          </Typography>

          <Button
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
        </FlexBetween>

        {/* ===== about ===== */}
        <Box mt={4}>
          <Typography variant="h4" textAlign="center" mb={2}>
            About&nbsp;Us
          </Typography>

          <Typography
            component="p"
            sx={{
              width: downSm ? "90%" : "66%",
              mx: "auto",
              textAlign: "justify",
              fontSize: "1rem",
              fontWeight:"bold",
            fontFamily:"nevis, sans-serif"
            }}
          >
           <p>With the blessings of the Almighty, the Old Students Association of Sri Vageesha Vidhyashram proudly presents the fifth edition of Vinterbash – our flagship inter-school fest that has lit up Trichy with talent, creativity, and youthful spirit for the past four years.</p>
<p>What began as a celebration of excellence has now grown into one of the city’s most anticipated events, drawing the brightest students from schools across the region. From fierce debates and captivating performances to high-octane sports and mind-bending intellectual challenges, Vinterbash is where brilliance takes centre stage.</p>
<p>This year, it’s bigger. It’s bolder. And it’s bursting with even more excitement.</p>
<p>Vinterbash is not just a competition – it’s a stage where champions catch-up, rise, and take-over. It’s where passion meets purpose, and where young minds push the limits of what’s possible.</p>
<p>Let the countdown begin. Let the spirit ignite. Let Vinterbash roar!</p>

          </Typography>
        </Box>

        {/* ===== footer ===== */}
        <Toolbar
          sx={{
            flexDirection: downSm ? "column" : "row",
            bgcolor:"#291611",
            mt: 4,
            px: 3,
            py: 3,
            gap: downSm ? 2 : 0,
          }}
        >
        <Box display="flex" flexDirection="column">
          <Typography
            fontWeight="bold"
            fontSize="1.5rem"
            sx={{
              color: "white",
              fontSize: downSm ? "1.1rem" : "1.5rem",
              textAlign: "center",
            }}
          >
            © Developed by Tech Team Of SriVV OSA
          </Typography>
          <Box display="flex" flexDirection="row" justifyContent="space-around" marginTop="2.5%">
          <Typography
            fontWeight="bold"
            fontSize="1.5rem"
            sx={{
              color: "white",
              fontSize: downSm ? "1.1rem" : "1.5rem",
            }}
            
          >
            Arvindh Lakshman
          </Typography>
          <Typography
            fontWeight="bold"
            fontSize="1.5rem"
            sx={{
              color: "white",
              fontSize: downSm ? "1.1rem" : "1.5rem",
            }}
          >
            Shrihari
          </Typography>
          </Box>
            </Box>
          <FlexBetween gap={2} ml={downSm ? 0 : "auto"}>
            <Box
              component="img"
              src={logo1}
              alt="srivv"
              sx={{
                width: downSm ? 120 : 100,
                height: "auto",
              }}
            />
            
            <Box
              component="img"
              src={logo2}
              alt="osa"
              sx={{
                width: downSm ? 120 : 200,
                height: "auto",
              }}
            />
          </FlexBetween>
        </Toolbar>
      </Box>
    </AnimatedPage>
  );
}

export default Homepage;
