import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Weather from "./weather";

export default function Routing() {
  return (
    <Router>
      <Switch>
        <Route path="/weather/:city" component={Weather} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
}
