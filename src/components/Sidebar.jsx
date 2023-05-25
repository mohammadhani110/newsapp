import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Sidebar = () => {
  const top = useSelector((state) => state.news?.top?.articles);
  const isLoading = useSelector((state) => state.news?.isLoadingSidebar);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={2}>
      {top &&
        top.length > 0 &&
        top.map((article, index) => (
          <Grid item xs={12} key={article.title} mb={2}>
            <Link
              to={`/blog/${article.title.split(" ").join("-")}`}
              style={{ textDecoration: "none" }}
            >
              <Grid container alignItems="center" spacing={4}>
                <Grid item>
                  <Typography variant="h4" style={{ color: "grey" }}>
                    #{index + 1}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" color="primary">
                    {article.title}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {article.publishedAt}
                  </Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
        ))}
    </Grid>
  );
};

export default Sidebar;
