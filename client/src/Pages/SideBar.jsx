import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar gradient-div shadow">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        <li>
          <Link to="/dashboard/products">Products</Link>
        </li>
        <li>
          <Link to="/dashboard/reports">Reports</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
