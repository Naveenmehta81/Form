import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../db/db"; // import data or api
import { v4 as uuidv4 } from "uuid"; // it give us random twt token
import bcrypt from "bcryptjs"; // genrate hash password

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const existingUser = await db.users.where("email").equals(email).first();
      if (existingUser) {
        // mil gya
        return rejectWithValue("User already exists!");
      }

      const hashpassword = await bcrypt.hash(password, 10);
      const newUser = {
        email,
        password: hashpassword,
        name,
      };
      const userid = await db.users.add(newUser);

      const safeuser = { id: userid, name, email };

      // Generate Fake Token with new users
      const token = uuidv4();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(safeuser));

      return { user: safeuser, token };
    } catch (error) {
      return rejectWithValue("Registration failed", error.message);
    }
  },
);

// login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await db.users.where("email").equals(email).first();

      if (!user) {
        // nahi mila !
        return rejectWithValue("Invalid Email or Password");
      }

      const hashmatch = await bcrypt.compare(password, user.password);
      if (!hashmatch) {
        return rejectWithValue("inavild email and password");
      }

      const safeuser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const token = uuidv4();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(safeuser));

      return { user, token };
    } catch (error) {
      return rejectWithValue("Login failed", error);
    }
  },
);

// forgot password
export const requestRestpassword = createAsyncThunk(
  "auth/requestrest",
  async (email, { rejectWithValue }) => {
    console.log("try to forgot password ");
    try {
      const user = await db.users.where("email").equals(email).first();
      if (!user) {
        alert("user not found in data base ");
        return rejectWithValue("emil is not found ");
      }

      const resetToken = uuidv4();
      await db.users.update(user.id, { resetToken: resetToken });

      return resetToken;
    } catch (error) {
      return rejectWithValue("reset falied", error);
    }
  },
);

// reset password
export const resetpassword = createAsyncThunk(
  "auth/resetpassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    console.log("reset password here");
    console.log("token", token);
    console.log("new password ", newPassword);
    try {
      console.log(`searhc with this token${token}`);
      const users = await db.users
        .filter((user) => user.resetToken === token)
        .toArray();

      const user = users[0];
      if (!user) {
        const allusers = await db.users.toArray();
        console.log(allusers);
        return rejectWithValue("invalid link");
      }
      console.log("user found", user);

      const hashnewpassword = await bcrypt.hash(newPassword, 10);
      await db.users.update(user.id, {
        password: hashnewpassword,
        resetToken: null,
      });
      console.log("updated done herer");
      return "succefully changed password";
    } catch (error) {
      console.log("reset password not working", error);
      return rejectWithValue("failed to reset password");
    }
  },
);

// this our slice - reducer + action + state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user") || null),
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
      })
      // forgot
      .addCase(requestRestpassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestRestpassword.fulfilled, (state, action) => {
        state.loading = false;
        alert(
          `clikc the link and rest it  : /reset-password/${action.payload}`,
        );
      })
      .addCase(requestRestpassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetpassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetpassword.fulfilled, (state) => {
        state.loading = false;
        alert(`update password succefully`);
      })
      .addCase(resetpassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
