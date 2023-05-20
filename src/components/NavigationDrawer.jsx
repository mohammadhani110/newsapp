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

export default function NavigationDrawer({ open, setOpen }) {
  // const [open, setOpen] = React.useState(false);

  // const toggleDrawer = (open) => (event) => {
  //     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //         return;
  //     }

  //     setOpen(open)
  // };

  const location = useLocation();
  const list = () => (
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
              {/* <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon> */}
              <ListItemText primary={route.name} />
            </ListItem>
          </CustomLink>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"left"}
          open={open}
          onClose={() => setOpen(false)}
          transitionDuration={{ enter: 500, appear: 1000, exit: 500 }}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
