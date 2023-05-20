// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import { axiosJWT } from "../../hooks/useAxiosInterceptor";

// ** Fetch Users
export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  try {
    const response = await axiosJWT.get("/admin/users");

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
});

// ** Get User Details
export const getUserDetails = createAsyncThunk(
  "news/getUserDetails",
  async (id) => {
    try {
      const response = await axiosJWT.get(`/admin/user/${id}`);

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
        throw new Error("Unable to get user details");
      }
    }
  }
);

// ** Add User
export const addUser = createAsyncThunk(
  "news/addUser",
  async (data, { dispatch }) => {
    try {
      const response = await axiosJWT.post("/api/admin/user", data);
      dispatch(fetchNews());

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
        throw new Error("Unable to add user");
      }
    }
  }
);

const initialState = {
  data: [],
  details: null,
  error: null,
  isLoading: false,
};
export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchNews
    builder.addCase(fetchNews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // getUserDetails
    builder.addCase(getUserDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default newsSlice.reducer;
