import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../db/db"; // Import your Dexie DB
import { v4 as uuidv4 } from "uuid"; // Random ID generator

// --- 1. REGISTER ACTION ---
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      // Check if user already exists
      const existingUser = await db.users.where("email").equals(email).first();
      if (existingUser) {
        return rejectWithValue("User already exists!");
      }

      // Save new user to Dexie
      const newUser = { email, password, name };
      await db.users.add(newUser);

      // Generate Fake Token
      const token = uuidv4();
      localStorage.setItem("token", token);

      return { user: newUser, token };
    } catch (error) {
      return rejectWithValue("Registration failed");
    }
  },
);

// --- 2. LOGIN ACTION ---
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Find user in Dexie
      const user = await db.users.where("email").equals(email).first();

      if (!user || user.password !== password) {
        return rejectWithValue("Invalid Email or Password");
      }

      // Generate Fake Token
      const token = uuidv4();
      localStorage.setItem("token", token);

      return { user, token };
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  },
);

// --- 3. AUTH SLICE ---
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
