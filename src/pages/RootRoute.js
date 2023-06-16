import React from "react";
import Nav from "../component/Nav";
import { Outlet } from "react-router-dom";

function RootRoute() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default RootRoute;
