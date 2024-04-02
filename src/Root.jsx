import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Pages/NavBar";

export default function Root() {
  return (
    <>
      <NavBar />
      <h1>hello</h1>

      <Outlet />
    </>
  );
}
