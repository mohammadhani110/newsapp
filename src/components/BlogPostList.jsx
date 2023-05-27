import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogPostCard from "./BlogPostCard";
import Loader from "./Loader";

const BlogPostList = ({ newsType }) => {
  const isLoading = useSelector((state) => state.news.isLoading);
  let allNews = useSelector((state) => state.news?.latest?.articles);
  let categoryNews = useSelector(
    (state) => state.news?.newsByCategories?.articles
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("BlogPostList");
  }, [allNews, categoryNews]);
  // const image = "https://picsum.photos/400";
  if (isLoading) {
    return <Loader />;
  }
  if (!isLoading && newsType === "category") {
    return (
      <>
        {categoryNews &&
          categoryNews.length > 0 &&
          categoryNews.map((data, index) => {
            return (
              <BlogPostCard
                data={data}
                id={index + 1}
                dispatch={dispatch}
                key={Math.random() * 1000000 + 1}
              />
            );
          })}
      </>
    );
  }

  return (
    <>
      {allNews &&
        allNews.length > 0 &&
        allNews.map((data, index) => {
          return (
            <BlogPostCard
              data={data}
              id={index + 1}
              dispatch={dispatch}
              key={Math.random() * 1000000 + 1}
            />
          );
        })}
    </>
  );
};

export default BlogPostList;
