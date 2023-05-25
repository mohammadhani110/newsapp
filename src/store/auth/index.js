// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import { axiosDEF, axiosJWT } from "../../hooks/useAxiosInterceptor";

export const getUser = createAsyncThunk("auth/user", async (params) => {
  try {
    const response = await axiosJWT.post("auth/user", params);

    console.log("response getUser -->", response);

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
      throw new Error("getting user Failed");
    }
  }
});

export const signinAPI = createAsyncThunk("auth/signin", async (params) => {
  try {
    const response = await axiosDEF.post("auth/login", params);

    console.log("response signinAPI -->", response);

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
      throw new Error("Login Failed");
    }
  }
});

export const registerAPI = createAsyncThunk("auth/register", async (params) => {
  try {
    const response = await axiosDEF.post("/auth/register", params);

    console.log("response registerAPI -->", response);

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
      throw new Error("Registeration Failed");
    }
  }
});

const initialState = {
  token: "",
  refreshToken: "",
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};
export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenAction(state, action) {
      state.token = action.payload;
    },
    resetAuthUserAction(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = "";
      state.refreshToken = "";
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signinAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signinAPI.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(signinAPI.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.token = "";
      state.refreshToken = "";
      state.error = action.error;
    });

    builder.addCase(registerAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerAPI.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    });
    builder.addCase(registerAPI.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.token = "";
      state.refreshToken = "";
      state.error = action.error;
    });

    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.token = "";
      state.refreshToken = "";
      state.error = action.error;
    });
  },
});

export const { resetAuthUserAction, setTokenAction } = auth.actions;
export default auth.reducer;
