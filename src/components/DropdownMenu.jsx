import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Box, styled } from "@mui/material";
import AccountCircleOutline from "mdi-material-ui/AccountCircleOutline";
import { useNavigate } from "react-router-dom";
import { resetAuthUserAction } from "../store/auth";
import { useDispatch } from "react-redux";

const CustomBox = styled(Box)(({ theme }) => ({
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
      left: "36%",
    },
  },
}));

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(resetAuthUserAction());
    navigate("/login");
  };

  return (
    <>
      <CustomBox>
        <IconButton color="inherit" onClick={handleOpenMenu}>
          <AccountCircleOutline
            fontSize="3rem"
            style={{ height: "3rem", width: "3rem" }}
          />
        </IconButton>
        {/* Register */}
      </CustomBox>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default DropdownMenu;
