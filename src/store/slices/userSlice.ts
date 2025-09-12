import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const SignInUser = createAsyncThunk(
  "user/signIn",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/signIn",
        { credentials },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      console.log("error while signing in", err);

      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Unknown sign in error ocured"
        );
      }

      return rejectWithValue("An unknown Error Occured");
    }
  }
);

export const SignUpUser = createAsyncThunk(
  "user/signUp",
  async (
    credentials: { userName: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/signUp",
        { credentials },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      console.log("error while signing up", err);

      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Unknown sign up error ocured"
        );
      }

      return rejectWithValue("An unknown Error Occured");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: "",
  reducers: {},
});

export default userSlice.reducer;
