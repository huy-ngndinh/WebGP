import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { user_context } from "./user_context";
import { User } from "./user_context";
import Homepage from "./homepage";
import Selection from "./selection";
import Circuit from "./circuit";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const Wrapper = () => {
  const [user_info, set_user_info] = useState<User>({
    circuit_index: -1,
  });

  return (
    <user_context.Provider value={{ user_info, set_user_info }}>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" Component={Homepage} />
          <Route path="/selection" Component={Selection} />
          <Route path="/circuit" Component={Circuit} />
        </Routes>
      </HashRouter>
    </user_context.Provider>
  );
};

root.render(<Wrapper />);
