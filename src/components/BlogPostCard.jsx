import React from "react";
import { styled } from "@mui/system";
import { Box } from "@mui/material";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Typography,
} from "@mui/material";

const BlogCard = styled(Card)(({ theme }) => ({
  display: "flex",
  boxShadow: 0,
  gap: "1.5rem",
  borderRadius: theme.shape.borderRadius,
}));

const BlogContent = styled(CardContent)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const BlogImage = styled(CardMedia)(({ theme }) => ({
  width: 150,
  borderRadius: "1rem",
}));

const AvatarBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const BlogPostCard = ({ data }) => {
  const { image, category, title, author, avatar, date } = data;
  return (
    <BlogCard elevation={0}>
      <BlogImage image={image} title={title} sx={{}} />
      <BlogContent>
        <div>
          <CategoryChip label={category} color="primary" size="small" />
          <Typography variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
        </div>
        <AvatarBox>
          <Avatar src={avatar} alt={author} />
          <Box>
            <Typography variant="subtitle2">{author}</Typography>
            <Typography variant="caption" color="textSecondary">
              {date}
            </Typography>
          </Box>
        </AvatarBox>
      </BlogContent>
    </BlogCard>
  );
};

export default BlogPostCard;
