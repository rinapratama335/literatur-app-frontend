import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/UserContext";

ReactDOM.render(
  <React.Fragment>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.Fragment>,
  document.getElementById("root")
);
