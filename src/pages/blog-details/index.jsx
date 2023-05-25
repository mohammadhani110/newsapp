import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Container, Paper, Typography, CardMedia } from "@mui/material";
import SummaryButton from "../../components/SummaryButton";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getFullArticle, getNewsSummary } from "../../store/news";
import parse from "html-react-parser";
import { toast } from "react-hot-toast";

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
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.news.isLoading);
  const newsId = useSelector((state) => state.news?.details?.newsId);
  const url = useSelector((state) => state.news?.details?.url);
  const summarizeText = useSelector((state) => state.news?.details?.summary);
  const fullContent = useSelector((state) => state.news?.details?.content);
  let allNews = useSelector((state) => state.news?.latest?.articles);
  let categoryNews = useSelector(
    (state) => state.news?.newsByCategories?.articles
  );

  const filterByAll = allNews?.filter(
    (article) => article?.title?.split(" ").join("-") === newsId
  );
  const filterByCategory = categoryNews?.filter(
    (article) => article?.title?.split(" ").join("-") === newsId
  );
  let retryCount = 0;
  useEffect(() => {
    if (url && retryCount === 0) {
      dispatch(getFullArticle(url));
      retryCount++;
    }
  }, [newsId, url, dispatch]);

  useEffect(() => {
    console.log("news");
  }, [allNews, categoryNews, summarizeText]);

  const [toggle, setToggle] = useState(false);

  const getContent = (data) => {
    const { urlToImage, title, description, author, publishedAt, content } =
      data;
    // let sanitizedContent;
    // if (fullContent) {
    //   sanitizedContent = DOMPurify.sanitize(fullContent);
    // }

    return (
      <StyledPaper elevation={0}>
        <CardMedia
          component="img"
          src={urlToImage}
          alt="Blog Post Image"
          style={{ marginBottom: "16px", borderRadius: "4px" }}
        />
        <Typography variant="h4" fontSize="2rem" color={"primary"} gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {description}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {publishedAt} by {author}
        </Typography>
        {!fullContent && (
          <Typography variant="body1" paragraph>
            {content}
          </Typography>
        )}
        {fullContent && (
          <Typography variant="body1" paragraph>
            {parse(fullContent)}
          </Typography>
        )}

        {/* Add more content as needed */}
      </StyledPaper>
    );
  };

  function extractPlainText(node) {
    if (typeof node === "string") {
      return node;
    }

    if (Array.isArray(node)) {
      return node.map(extractPlainText).join("");
    }

    if (node.props && node.props.children) {
      return extractPlainText(node.props.children);
    }

    return "";
  }
  const getParsedText = () => {
    const parsedContent = parse(fullContent);
    const plainText = extractPlainText(parsedContent);

    return plainText;
    // if (plainText) {
    //   return <div>Plain Text: {plainText}</div>;
    // }

    // return <div>{summarizeText}</div>;
  };
  const handleSummary = async () => {
    setToggle(!toggle);
    const text = getParsedText();
    if (text) {
      const { error } = await dispatch(getNewsSummary(text));

      toast.error(error?.message, {
        position: "bottom-right",
        duration: 5000,
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <StyledContainer maxWidth="md">
      {filterByAll && filterByAll?.length > 0 && getContent(filterByAll[0])}
      {filterByCategory &&
        filterByCategory?.length > 0 &&
        getContent(filterByCategory[0])}

      {/* {toggle && (
        <StyledPaper>
          <Typography variant="body1" paragraph>
            {getParsedText()}
          </Typography>
        </StyledPaper>
      )} */}
      {toggle && summarizeText && (
        <StyledPaper>
          <Typography variant="body1" paragraph>
            {/* {fullContent && getParsedText()} */}
            {summarizeText}
          </Typography>
        </StyledPaper>
      )}

      <SummaryButton onClick={handleSummary} />
    </StyledContainer>
  );
};

export default BlogDetailsPage;
