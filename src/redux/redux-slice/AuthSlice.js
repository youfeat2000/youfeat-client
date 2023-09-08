import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

//backend url to share it across the applicatoin
//const uri = "http://localhost:3500";
const uri = "https://youfeat-server.onrender.com";
export const handleLogout = createAsyncThunk("/logout", () => {
  return fetch(`${uri}/logout`, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => {
      if (res.ok) {
        return;
      } else {
        throw "Error";
      }
    })
    .catch((err) => console.log(err));
});

export const handleRefresh = createAsyncThunk("/refresh", () => {
  return fetch(`${uri}/refresh`, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 401) {
        throw "Unauthorized";
      } else {
        throw "error";
      }
    })
    .catch((err) => console.log(err));
});

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    auth: null,
    uri,
    loading: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
  extraRedusers: {
    [handleLogout.pending]: (state) => {
      state.loading = true;
    },
    [handleLogout.fulfilled]: (state) => {
      state.auth = null;
      state.loading = false;
      const navigate = useNavigate();
      navigate("/login");
    },
    [handleLogout.rejected]: (state) => {
      state.loading = false;
      state.auth = null;
      const navigate = useNavigate();
      navigate("/login");
    },
  },
  extraReducers: {
    [handleRefresh.pending]: (state) => {
      state.loading = true;
    },
    [handleRefresh.fulfilled]: (state, action) => {
      state.auth = action.payload;
      state.loading = false;
    },
    [handleRefresh.rejected]: (state) => {
      state.loading = false;
      state.auth = null;
    },
  },
});

export const { setAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
