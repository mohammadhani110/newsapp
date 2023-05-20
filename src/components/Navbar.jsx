import * as React from "react";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

//assets
import user from "../assets/user.png";
import SearchBar from "./SearchBar";
// import { useScrollPosition } from "../hooks/useScrollPosition";

const CustomLink = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  textDecoration: "none",
  fontSize: "1rem",
  position: "relative",

  "&:hover": {
    color: theme.palette.blue.main,
    "&:before": {
      content: "' '",
      height: "3px",
      width: "1rem",
      backgroundColor: theme.palette.blue.main,
      position: "absolute",
      bottom: "0px",
      left: "50%",
    },
  },
  "&.active": {
    color: theme.palette.blue.main,
    "&:before": {
      content: "' '",
      height: "3px",
      width: "1rem",
      backgroundColor: theme.palette.blue.main,
      position: "absolute",
      bottom: "0",
      left: "50%",
    },
  },
}));

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

export default function Navbar() {
  const location = useLocation();
  const theme = useTheme();
  // const scrollPosition = useScrollPosition();
  const handleSearch = (data) => {
    console.log(data);
  };
  return (
    // <Box sx={{ flexGrow: 0 }}>
    <>
      <AppBar
        position="sticky"
        sx={{ background: "white" }}
        elevation={0}
        // className={`${scrollPosition > 0 ? "white" : "transparent"}`}
      >
        <Container
          maxWidth="xl"
          sx={{ marginTop: "3rem", marginBottom: "3rem", padding: 0 }}
        >
          <Toolbar
            className={`toolbar `}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              gap: "2rem",
            }}
          >
            {/* primary nav */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "2rem",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ flexGrow: 0, textAlign: "center" }}
                  color={"primary"}
                  gutterBottom
                >
                  NEWS APP
                </Typography>

                <Box>
                  <SearchBar placeholder="Search..." onSearch={handleSearch} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "3rem",
                  [theme.breakpoints.down(1200)]: {
                    gap: "2rem",
                  },
                }}
              >
                <CustomLink to="/register">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: ".5rem",
                    }}
                  >
                    <img src={user} alt="signup" /> Signup
                  </Box>
                </CustomLink>

                <Button
                  variant="outlined"
                  sx={{
                    width: "174px",
                    fontWeight: 600,
                    fontSize: "1rem",
                    [theme.breakpoints.down(1200)]: {
                      width: "144px",
                    },
                  }}
                >
                  Learn more
                </Button>
              </Box>
            </Box>
            {/* secondary nav */}
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "4rem",
                  position: "relative",
                  [theme.breakpoints.down("1400")]: {
                    gap: "2rem",
                  },
                  [theme.breakpoints.down("1100")]: {
                    gap: "1rem",
                  },
                }}
              >
                {categories.map((category, i) => {
                  return (
                    <CustomLink
                      to={`/${category}`}
                      isActive={location?.pathname === category ? "active" : ""}
                    >
                      {category.toUpperCase}
                    </CustomLink>
                  );
                })}
                {/* <CustomLink
                  to="/buy"
                  isActive={location?.pathname === "/buy" ? "active" : ""}
                >
                  Buy
                </CustomLink>
                <CustomLink
                  to="/tutorials"
                  isActive={location?.pathname === "/tutorials" ? "active" : ""}
                >
                  Tutorials
                </CustomLink>
                <CustomLink
                  to="/rewards"
                  isActive={location?.pathname === "/rewards" ? "active" : ""}
                >
                  Rewards
                </CustomLink>
                <CustomLink
                  to="/affiliates"
                  isActive={
                    location?.pathname === "/affiliates" ? "active" : ""
                  }
                >
                  Affiliates
                </CustomLink>
                <CustomLink
                  to="/about"
                  isActive={location?.pathname === "/about" ? "active" : ""}
                >
                  About us
                </CustomLink>
                <CustomLink
                  to="/contact"
                  isActive={location?.pathname === "/contact" ? "active" : ""}
                >
                  Contact Us
                </CustomLink> */}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>

    // </Box>
  );
}
