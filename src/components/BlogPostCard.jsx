import React from "react";
import { styled } from "@mui/system";
import avatarImg from "../assets/1.png";
import { Box } from "@mui/material";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Typography,
} from "@mui/material";
import { setIdAction, setURLAction } from "../store/news";
import { Link } from "react-router-dom";

const BlogCard = styled(Card)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.between("xs", "md")]: {
    flexDirection: "column",
  },

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
  width: 200,
  borderRadius: "1rem",
  [theme.breakpoints.between("xs", "md")]: {
    width: "100%",
    height: 200,
  },
}));

const AvatarBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

// const avatar = "https://i.pravatar.cc/300";
const BlogPostCard = ({ data, dispatch }) => {
  const { urlToImage, title, description, author, publishedAt, url } = data;

  const id = title.split(" ").join("-");
  return (
    <Link
      to={`/blog/${id}`}
      style={{ textDecoration: "none" }}
      onClick={() => {
        dispatch(setIdAction(id));
        dispatch(setURLAction(url));
      }}
    >
      <BlogCard elevation={0}>
        <BlogImage image={urlToImage} title={title} />
        <BlogContent>
          <div>
            <CategoryChip label={"general"} color="primary" size="small" />
            <Typography variant="h6" component="h2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              {description}
            </Typography>
          </div>
          <AvatarBox>
            <Avatar src={avatarImg} alt={author} />
            <Box>
              <Typography variant="subtitle2">{author}</Typography>
              <Typography variant="caption" color="textSecondary">
                {publishedAt}
              </Typography>
            </Box>
          </AvatarBox>
        </BlogContent>
      </BlogCard>
    </Link>
  );
};

export default BlogPostCard;
