import React from "react";
import { Routes, Route } from "react-router-dom";
// import RequireAuth from "../routes/RequireAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Budgets from "./pages/Budgets";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/Dashboard" element={<Dashboard />} />
      <Route path="/budgets" element={<Budgets />} />
    </Routes>
  );
}

export default App;
