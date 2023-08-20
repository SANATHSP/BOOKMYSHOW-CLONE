import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store";

// creating a root element for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = "http://localhost:5500"; // set default base url

// render the app within the root element
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
