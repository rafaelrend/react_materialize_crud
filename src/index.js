import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.5.0";
import "assets/css/material-origin.css?v=1.5.0";
//https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.css

import $ from 'jquery';


//https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.js
//https://unpkg.com/@material-ui/core@3.1.2/umd/material-ui.production.min.js
import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);
