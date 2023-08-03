import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RootRoute from "./pages/RootRoute";
import DashboadRoot from "./pages/Dashboard/DashboadRoot";
import Index from "./pages/Dashboard/Index";
import ProtectedRoute from "./component/ProtectedRoute";
import PersistentLogin from "./component/PersistentLogin";
import PreventLogin from "./component/PreventLogin";
import Profile from "./pages/Dashboard/Profile";
import Notification from "./pages/Dashboard/Notification";
import Admin from "./pages/Dashboard/Admin";
import UserRanking from "./pages/Dashboard/UserRanking";

const App = () => {
  return (
    <Routes>
      <Route element={<RootRoute />}>
        <Route index element={<Home />} />
      </Route>
      <Route element={<PreventLogin />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<PersistentLogin />}>
        <Route path="/dashboard" element={<DashboadRoot />}>
          <Route index element={<Index />} />
          <Route path="/dashboard/profile/:id" element={<Profile />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/notification" element={<Notification />} />
            <Route path="/dashboard/admin" element={<Admin />} />
          </Route>
          <Route path="/dashboard/rank" element={<UserRanking />} />
        </Route>
      </Route>
      <Route
        path="/*"
        element={
          <div className="none">
            <h1>Oops 404 pages not found</h1>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
