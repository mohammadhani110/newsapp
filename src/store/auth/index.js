// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import { axiosDEF } from "../../hooks/useAxiosInterceptor";

export const signinAPI = createAsyncThunk("auth/signin", async (params) => {
  try {
    const response = await axiosDEF.post("/login", params);

    console.log("response signinAPI -->", response);

    return response.data;
  } catch (err) {
    console.log("signinAPI err", err?.response?.data?.message);
    throw new Error(err?.response?.data?.message);

    // return rejectWithValue(err.message);
  }
});

export const registerAPI = createAsyncThunk("auth/register", async (params) => {
  try {
    const response = await axiosDEF.post("/register", params);

    console.log("response registerAPI -->", response);

    return response.data;
  } catch (err) {
    console.log("registerAPI err", err?.response?.data?.message);
    throw new Error(err?.response?.data?.message);

    // return rejectWithValue(err.message);
  }
});

const initialState = {
  token: "",
  user: null,
  isAuthenticated: false,
  loading: false,
};
export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenAction(state, action) {
      state.token = action.token;
    },
    resetAuthUserAction(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = "";
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signinAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signinAPI.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(signinAPI.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.token = "";
    });

    builder.addCase(registerAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerAPI.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(registerAPI.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.token = "";
    });
  },
});

export const { resetAuthUserAction, setTokenAction } = auth.actions;
export default auth.reducer;
