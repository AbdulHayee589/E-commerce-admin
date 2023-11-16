import React from "react";
import Sidebar from "./Sidebar";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./Home";
import Analytics from "./Products";
import Reports from "./Reports";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="content">
        <h2 className="col-md-3 text-center border-3 rounded-4 p-2 shadow gradient-div">
          INFINITY CUSTOM
        </h2>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
