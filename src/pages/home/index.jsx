import React from "react";

import { styled } from "@mui/material/styles";
import { Box, Container, Grid } from "@mui/material";
import BlogPostCard from "../../components/BlogPostCard";
import Sidebar from "../../components/Sidebar";

const blogPost = {
  title: "The Importance of Regular Exercise",
  category: "Health and Fitness",
  content:
    "Regular exercise has numerous benefits for both physical and mental health. It helps improve cardiovascular health, build muscle strength, and enhance flexibility. Exercise also releases endorphins, which are natural mood boosters, leading to reduced stress and improved mental well-being. Make it a habit to engage in regular physical activity to reap the benefits.",
  author: "John Doe",
  date: "2022-12-5",
  image:
    "https://images.pexels.com/photos/2755972/pexels-photo-2755972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  avatar: "https://example.com/image.jpg",
};

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
  return (
    <Container maxWidth="xl">
      <BlogPostPageWrapper container spacing={5}>
        <BlogPostContentWrapper item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <BlogPostCard data={blogPost} />
            <BlogPostCard data={blogPost} />
            <BlogPostCard data={blogPost} />
            <BlogPostCard data={blogPost} />
            <BlogPostCard data={blogPost} />
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
