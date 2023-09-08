import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//backend url to share it across the applicatoin
//const uri = "http://localhost:3500";
const uri = "https://youfeat-server.onrender.com";

export const handleGetVote = createAsyncThunk("getvote", () => {
  return fetch(`${uri}/allvote`, {
    method: "POST",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

export const handleGetUsers = createAsyncThunk("getusers", () => {
  return fetch(`${uri}/users`, {
    method: "POST",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

export const handleGetUser = createAsyncThunk("getuser", () => {
  return fetch(`${uri}/user`, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
});
export const handleGetComments = createAsyncThunk("getcomments", () => {
  return fetch(`${uri}/allcomment`, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    user: null,
    loading: false,
    users: [],
    vote: [],
    comments: [],
    search: null,
    toggle: true,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setVotes: (state, { payload }) => {
      state.vote = payload;
    },
    setToggle: (state, { payload }) => {
      state.toggle = payload;
    },
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    setComments: (state, { payload }) => {
      state.comments = payload;
    },
  },
  extraReducers: {
    [handleGetVote.pending]: (state) => {
      state.loading = true;
    },
    [handleGetVote.fulfilled]: (state, { payload }) => {
      state.vote = payload;
      state.loading = false;
    },
    [handleGetUsers.rejected]: (state) => {
      state.loading = false;
    },
    [handleGetUsers.pending]: (state) => {
      state.loading = true;
    },
    [handleGetUsers.fulfilled]: (state, { payload }) => {
      const i = payload?.filter((v) => v.video);
      state.users = i;
      state.search = i;
      state.loading = false;
    },
    [handleGetUsers.rejected]: (state) => {
      state.loading = false;
    },
    [handleGetUser.pending]: (state) => {
      state.loading = true;
    },
    [handleGetUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    },
    [handleGetUser.rejected]: (state) => {
      state.loading = false;
    },
    [handleGetComments.fulfilled]: (state, { payload }) => {
      state.comments = payload;
      state.loading = false;
    },
    [handleGetComments.rejected]: (state) => {
      state.loading = false;
    },
    [handleGetComments.pending]: (state) => {
      state.loading = true;
    },
  },
});

export default usersSlice.reducer;
export const {
  setUser,
  setUsers,
  setSearch,
  setToggle,
  setVotes,
  setComments,
} = usersSlice.actions;
