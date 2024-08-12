import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CardDataProvider from './Components/useCardData.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <CardDataProvider>
    <App />
  </CardDataProvider>
);
