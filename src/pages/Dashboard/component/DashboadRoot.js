import React from "react";
import DashbordSideBar from "./DashbordSideBar";
import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import { ProfileProvider } from "../../../context/ProfileContext";

function DashboadRoot() {
  return (
    <>
      <ProfileProvider>
        <DashboardNav />
        <div className="dash-main">
          <DashbordSideBar />
          <Outlet />
        </div>
      </ProfileProvider>
    </>
  );
}

export default DashboadRoot;
