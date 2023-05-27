import React, { useEffect } from "react";

import { styled } from "@mui/material/styles";
import { Box, Container, Grid } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import BlogPostList from "../../components/BlogPostList";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNewsByCategory, resetNewsDetailsAction } from "../../store/news";

const BlogPostPageWrapper = styled(Grid)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const BlogPostContentWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const SidebarWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));
const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let retryCount = 0;
  useEffect(() => {
    console.log(location?.pathname?.split("/category/")[1]);
    if (location?.pathname?.split("/category/")[1] && retryCount === 0) {
      dispatch(getNewsByCategory(location?.pathname?.split("/category/")[1]));
      retryCount++;
    }
    dispatch(resetNewsDetailsAction());
  }, [location?.pathname]);

  return (
    <Container maxWidth="xl">
      <BlogPostPageWrapper container spacing={5}>
        <BlogPostContentWrapper item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <BlogPostList newsType={"category"} />
          </Box>
        </BlogPostContentWrapper>
        <SidebarWrapper item xs={12} md={4}>
          {/* Sidebar content */}
          <Sidebar />
        </SidebarWrapper>
      </BlogPostPageWrapper>
    </Container>
  );
};

export default Home;
