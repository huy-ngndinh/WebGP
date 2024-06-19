import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Homepage from "./homepage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <HashRouter basename="/">
    <Routes>
      <Route path="/" Component={Homepage} />
    </Routes>
  </HashRouter>
);
