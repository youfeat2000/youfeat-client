import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../redux-slice/AuthSlice";
import UsersSlice from "../redux-slice/UsersSlice";

const Store = configureStore({
  reducer: {
    AuthSlice,
    UsersSlice,
  },
});

export default Store;
