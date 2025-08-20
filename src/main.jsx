import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { Provider } from "react-redux";
import store from "./store/index";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster
        toastOptions={{
          position: "top-right",
          style: {
            background: "#27272A",
            color: "white",
          },
        }}
      />
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);
