import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import NavbarDesktop from "./Navbar";
import NavbarMobile from "./NavbarMobile";
import React from "react";

const Header = ({ subscriptionPage }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("1000"));

  return (
    <>
      {!mobile && <NavbarDesktop subscriptionPage={subscriptionPage} />}
      {mobile && <NavbarMobile subscriptionPage={subscriptionPage} />}
    </>
  );
};

export default Header;
