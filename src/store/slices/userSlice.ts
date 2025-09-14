import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { User } from "../../components/SharedTypes";

type InitialStateTypes = {
  loading: boolean;
  message: string | null;
  user: User | null;
};

const initialState: InitialStateTypes = {
  loading: false,
  message: null,
  user: null,
};

export const SignInUser = createAsyncThunk(
  "user/signIn",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/signIn",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      return res.data.message;
    } catch (err) {
      console.log("error while signing in", err);

      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Unknown sign in error occurred"
        );
      }

      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const SignUpUser = createAsyncThunk(
  "user/signUp",
  async (
    {
      userName,
      email,
      password,
    }: { userName: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/signUp",
        {
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.data.message);
      return res.data.message;
    } catch (err) {
      // Only log the backend message, not the full AxiosError object
      if (axios.isAxiosError(err)) {
        console.log("Backend error message:", err.response?.data?.message);
        return rejectWithValue(
          err.response?.data?.message || "Unknown sign up error occurred"
        );
      }

      console.log("Unknown error:", err);
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      console.log("Error while logout", err);
      rejectWithValue("Errorwhile Signing out");
    }
  }
);

export const LoadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/loadUserAuth",
        {},
        { withCredentials: true }
      );
      return res.data.user;
    } catch (err: unknown) {
      const axiosErr = err as AxiosError;

      // If auth token expired or invalid → refresh and retry
      if (
        axiosErr.response?.status === 403 ||
        axiosErr.response?.status === 401
      ) {
        try {
          // Call refresh token endpoint
          await axios.post(
            "http://localhost:5000/refresh-token",
            {},
            { withCredentials: true }
          );

          // Retry loading user with new access token
          const retryRes = await axios.post(
            "http://localhost:5000/loadUserAuth",
            {},
            { withCredentials: true }
          );

          return retryRes.data.user;
        } catch {
          return rejectWithValue("Session expired, please login again");
        }
      }

      return rejectWithValue("Failed to load user");
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(SignUpUser.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(SignUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(SignUpUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      })

      .addCase(SignInUser.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(SignInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(SignInUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      })
      .addCase(LoadUser.pending, (state) => {
        state.loading = true;
        state.user = null;
      })
      .addCase(LoadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.message = null;
      });
  },
});

export default userSlice.reducer;
