import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import NavbarDesktop from "./Navbar";
import NavbarMobile from "./NavbarMobile";
import React from "react";

const Header = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("1000"));

  return (
    <>
      {!mobile && <NavbarDesktop />}
      {mobile && <NavbarMobile />}
    </>
  );
};

export default Header;
