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

import SearchBar from "./SearchBar";
import DropdownMenu from "./DropdownMenu";

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

export default function Navbar({ subscriptionPage }) {
  const location = useLocation();
  const theme = useTheme();
  // const scrollPosition = useScrollPosition();
  const handleSearch = (data) => {
    console.log(data);
  };
  if (subscriptionPage) {
    return (
      <AppBar
        position="sticky"
        sx={{ background: "white" }}
        elevation={0}
        // className={`${scrollPosition > 0 ? "white" : "transparent"}`}
      >
        <Container
          maxWidth="xl"
          sx={{
            marginTop: subscriptionPage ? "0" : "3rem",
            marginBottom: subscriptionPage ? "0" : "3rem",
            padding: 0,
          }}
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
                <CustomLink to={`/`}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ flexGrow: 0, textAlign: "center" }}
                    color={"primary"}
                    gutterBottom
                  >
                    NEWS APP
                  </Typography>
                </CustomLink>
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
                <DropdownMenu />
                {/* 
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
                  Subscribe
                </Button> */}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
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
                <CustomLink to={`/`}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ flexGrow: 0, textAlign: "center" }}
                    color={"primary"}
                    gutterBottom
                  >
                    NEWS APP
                  </Typography>
                </CustomLink>

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
                <DropdownMenu />

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
                  Subscribe
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
                      to={`/category/${category}`}
                      key={Math.random() * 100000}
                      isActive={location?.pathname === category ? "active" : ""}
                    >
                      {category?.toUpperCase()}
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
