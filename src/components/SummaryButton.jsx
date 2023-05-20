import React from "react";
import { styled } from "@mui/system";
import { IconButton } from "@mui/material";
import { BookOpenVariant } from "mdi-material-ui";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

const BottomRightButton = ({ onClick }) => {
  return (
    <StyledIconButton color="primary" aria-label="Add" onClick={onClick}>
      <BookOpenVariant style={{ height: "3rem", width: "3rem" }} />
    </StyledIconButton>
  );
};

export default BottomRightButton;
