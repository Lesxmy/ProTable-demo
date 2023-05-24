import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "@rexd/core";

// const rootElement = document.getElementById("root")!;
// const root = ReactDOM.createRoot(rootElement);

ReactDOM.render(
  <React.StrictMode>
    <AppProvider root>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
