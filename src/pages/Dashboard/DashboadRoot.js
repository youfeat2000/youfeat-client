import React from "react";
import DashbordSideBar from "./DashbordSideBar";
import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";

function DashboadRoot() {
  return (
    <>
      <div className="dash-con">
        <DashbordSideBar />
        <div className="dash-main">
          <DashboardNav />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default DashboadRoot;
