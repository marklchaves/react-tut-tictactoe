import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./Game";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
