import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./Routes";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

render(
  <Router>
    <Routes />
  </Router>,
  document.getElementById("root")
);
serviceWorker.unregister();
