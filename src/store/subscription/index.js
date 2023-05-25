// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import { axiosJWT } from "../../hooks/useAxiosInterceptor";

// // ** Fetch getNewsSummary
export const getSubscription = createAsyncThunk(
  "subscriptionSlice/getSubscription",
  async (data) => {
    try {
      console.log("data subscription", data);
      const response = await axiosJWT.post(`/create-subscription`, data);

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
        throw new Error("Unable to subscribe");
      }
    }
  }
);

const initialState = {
  details: null,
  error: null,
  isLoading: false,
};
export const subscriptionSlice = createSlice({
  name: "subscriptionSlice",
  initialState,
  reducers: {
    setSubcsriptionAction(state, action) {
      state.details = action.payload;
    },
  },
  extraReducers: (builder) => {
    // // getLatestNews
    // builder.addCase(getSubscription.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getSubscription.fulfilled, (state, action) => {
    //   state.latest = action.payload;
    //   state.isLoading = false;
    //   state.error = null;
    // });
    // builder.addCase(getSubscription.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error;
    // });
  },
});
export const { setSubcsriptionAction } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
