import React from "react";
import { Grid, Typography } from "@mui/material";

const Sidebar = () => {
  const topArticles = [
    { rank: 1, title: "Article 1", time: "5 min ago" },
    { rank: 2, title: "Article 2", time: "10 min ago" },
    { rank: 3, title: "Article 3", time: "15 min ago" },
    { rank: 4, title: "Article 4", time: "20 min ago" },
    { rank: 5, title: "Article 5", time: "25 min ago" },
  ];

  return (
    <Grid container spacing={2}>
      {topArticles.map((article) => (
        <Grid item xs={12} key={article.rank} mb={2}>
          <Grid container alignItems="center" spacing={4}>
            <Grid item>
              <Typography variant="h6" style={{ color: "grey" }}>
                #{article.rank}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{article.title}</Typography>
              <Typography variant="caption" color="textSecondary">
                {article.time}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Sidebar;
