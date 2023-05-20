import React, { useState } from "react";
import { styled } from "@mui/system";
import { Container, Paper, Typography, CardMedia } from "@mui/material";
import SummaryButton from "../../components/SummaryButton";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
}));
const image =
  "https://images.pexels.com/photos/2755972/pexels-photo-2755972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const BlogDetailsPage = () => {
  const [toggle, setToggle] = useState(false);
  const handleSummary = () => {
    setToggle(!toggle);
  };
  return (
    <StyledContainer maxWidth="md">
      <StyledPaper elevation={0}>
        <CardMedia
          component="img"
          src={image}
          alt="Blog Post Image"
          style={{ marginBottom: "16px", borderRadius: "4px" }}
        />
        <Typography variant="h4" gutterBottom>
          Blog Title
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Published on May 20, 2023 by John Doe
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
          felis posuere, sagittis enim a, ultricies justo. ...
        </Typography>
        <Typography variant="body1" paragraph>
          Vivamus blandit ultrices faucibus. Fusce rhoncus arcu elit, quis
          bibendum magna aliquet nec. Ut et gravida nunc. ...
        </Typography>
        {/* Add more content as needed */}
      </StyledPaper>

      {toggle && (
        <StyledPaper>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
            felis posuere, sagittis enim a, ultricies justo. ...
          </Typography>
          <Typography variant="body1" paragraph>
            Vivamus blandit ultrices faucibus. Fusce rhoncus arcu elit, quis
            bibendum magna aliquet nec. Ut et gravida nunc. ...
          </Typography>
        </StyledPaper>
      )}

      <SummaryButton onClick={handleSummary} />
    </StyledContainer>
  );
};

export default BlogDetailsPage;
