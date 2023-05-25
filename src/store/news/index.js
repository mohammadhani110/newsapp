// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import { axiosJWT } from "../../hooks/useAxiosInterceptor";

// ** Fetch getLatestNews
export const getLatestNews = createAsyncThunk("newsSlice/latest", async () => {
  try {
    const response = await axiosJWT.get("/api/news/latest");

    return response.data;
  } catch (error) {
    if (
      error &&
      error?.response &&
      error?.response?.data &&
      error?.response?.data?.error
    ) {
      throw new Error(error?.response?.data?.error);
    } else {
      throw new Error("Unable to fetch latest news ");
    }
  }
});
// ** Fetch getTopNews
export const getTopNews = createAsyncThunk("newsSlice/top", async () => {
  try {
    const response = await axiosJWT.get("/api/news/top");

    return response.data;
  } catch (error) {
    if (
      error &&
      error?.response &&
      error?.response?.data &&
      error?.response?.data?.error
    ) {
      throw new Error(error?.response?.data?.error);
    } else {
      throw new Error("Unable to fetch top news");
    }
  }
});
// ** Fetch getNewsByCategory
export const getNewsByCategory = createAsyncThunk(
  "newsSlice/newsByCategory",
  async (category) => {
    try {
      const response = await axiosJWT.get(`/api/news/by-category/${category}`);

      return response.data;
    } catch (error) {
      if (
        error &&
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.error
      ) {
        throw new Error(error?.response?.data?.error);
      } else {
        throw new Error("Unable to fetch news by category");
      }
    }
  }
);
// ** Fetch getFullArticle
export const getFullArticle = createAsyncThunk(
  "newsSlice/fullArticle",
  async (url) => {
    try {
      const response = await axiosJWT.post(`/api/news/get-content`, { url });

      return response.data;
    } catch (error) {
      if (
        error &&
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.error
      ) {
        throw new Error(error?.response?.data?.error);
      } else {
        throw new Error("Unable to get fullArticle");
      }
    }
  }
);
// ** Fetch getCategories
export const getCategories = createAsyncThunk(
  "newsSlice/categories",
  async () => {
    try {
      const response = await axiosJWT.get("/api/news/categories");

      return response.data;
    } catch (error) {
      if (
        error &&
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.error
      ) {
        throw new Error(error?.response?.data?.error);
      } else {
        throw new Error("Unable to fetch users");
      }
    }
  }
);

// ** Fetch getNewsSummary
export const getNewsSummary = createAsyncThunk(
  "newsSlice/summary",
  async (article) => {
    try {
      const response = await axiosJWT.post(`/api/news/summary`, { article });

      return response.data;
    } catch (error) {
      if (
        error &&
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.error
      ) {
        throw new Error(error?.response?.data?.error);
      } else {
        throw new Error("Unable to fetch users");
      }
    }
  }
);

const initialState = {
  top: [],
  latest: [],
  categories: [],
  newsByCategories: [],
  details: {
    newsId: null,
    url: "",
    summary: null,
    content: null,
  },
  error: null,
  isLoading: false,
  errorSidebar: null,
  isLoadingSidebar: false,
};
export const newsSlice = createSlice({
  name: "newsSlice",
  initialState,
  reducers: {
    setIdAction(state, action) {
      state.details.newsId = action.payload;
    },
    setURLAction(state, action) {
      state.details.url = action.payload;
    },
  },
  extraReducers: (builder) => {
    // getLatestNews
    builder.addCase(getLatestNews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLatestNews.fulfilled, (state, action) => {
      state.latest = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getLatestNews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // getTopNews
    builder.addCase(getTopNews.pending, (state) => {
      state.isLoadingSidebar = true;
    });
    builder.addCase(getTopNews.fulfilled, (state, action) => {
      state.top = action.payload;
      state.isLoadingSidebar = false;
      state.errorSidebar = null;
    });
    builder.addCase(getTopNews.rejected, (state, action) => {
      state.isLoading = false;
      state.errorSidebar = action.error;
    });

    // getNewsByCategory
    builder.addCase(getNewsByCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNewsByCategory.fulfilled, (state, action) => {
      state.newsByCategories = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getNewsByCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // getCategories
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // getFullArticle
    builder.addCase(getFullArticle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFullArticle.fulfilled, (state, action) => {
      state.details.content = action.payload?.content;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getFullArticle.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // getNewsSummary
    builder.addCase(getNewsSummary.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNewsSummary.fulfilled, (state, action) => {
      state.details.summary = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getNewsSummary.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});
export const { setIdAction, setURLAction } = newsSlice.actions;

export default newsSlice.reducer;
