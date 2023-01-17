import React from "react";
import ReactDOM from "react-dom";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import SettingsPage from "./SettingsPage";
import TransactionsPage from "./TransactionsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/:action" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
