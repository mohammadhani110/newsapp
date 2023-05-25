import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// import ListItemIcon from '@mui/material/ListItemIcon';
import { NavLink, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { clearPersist } from "../store";
import { useDispatch } from "react-redux";
import { resetAuthUserAction } from "../store/auth";

const CustomLink = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ theme, isActive }) => ({
  color:
    isActive === "active"
      ? theme.palette.secondary.main
      : theme.palette.primary.main,
  fontWeight: 600,
  textDecoration: "none",
}));

const navigation = [
  { name: "Home", path: "/" },
  { name: "Business", path: "/business" },
  { name: "Entertainment", path: "/entertainment" },
  { name: "General", path: "/general" },
  { name: "Health", path: "/health" },
  { name: "Science", path: "/science" },
  { name: "Sports", path: "/sports" },
  { name: "Technology", path: "/technology" },
  { name: "Logout", path: "/logout" },
  // { name: "Register", path: "/register" },
  // { name: "Login", path: "/login" },
];

export default function NavigationDrawer({ open, setOpen, subscriptionPage }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(resetAuthUserAction());
    clearPersist();
  };
  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"left"}
          open={open}
          onClose={() => setOpen(false)}
          transitionDuration={{ enter: 500, appear: 1000, exit: 500 }}
        >
          {!subscriptionPage && getNavLists(navigation, setOpen, location)}
          {subscriptionPage && getNav(setOpen, logout)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

const getNavLists = ({ navigation, setOpen, location }) => (
  <Box
    sx={{ width: 250 }}
    role="presentation"
    onClick={() => setOpen(false)}
    onKeyDown={() => setOpen(false)}
  >
    {/* onClick={() => { if (route.path === "/location") { sessionStorage.setItem("path", "/location") } }} */}
    <List>
      {navigation.map((route) => (
        <CustomLink
          to={route.path}
          isActive={location?.pathname === route.path ? "active" : ""}
        >
          <ListItem button key={route.name}>
            <ListItemText primary={route.name} />
          </ListItem>
        </CustomLink>
      ))}
    </List>
    <Divider />
  </Box>
);
const getNav = ({ setOpen, logout }) => {
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
        <ListItem button onClick={logout}>
          <ListItemText primary={"Logout"} />
        </ListItem>
        <Divider />
      </List>
    </Box>
  );
};
