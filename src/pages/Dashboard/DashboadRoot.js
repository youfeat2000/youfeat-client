import React from "react";
import DashbordSideBar from "./DashbordSideBar";
import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import { ProfileProvider } from "../../context/ProfileContext";

function DashboadRoot() {
  return (
    <>
      <ProfileProvider>
        <div className="dash-con">
          <DashbordSideBar />
          <div className="dash-main">
            <DashboardNav />
            <Outlet />
          </div>
        </div>
      </ProfileProvider>
    </>
  );
}

export default DashboadRoot;
