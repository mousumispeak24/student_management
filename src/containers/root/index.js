import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import studentManagementContainer from "../auth/studentManagement";
const RootContainer = () => {

  return (
    <Router>
        <Switch>
          <Route exact path="/studentManagement" component={studentManagementContainer} />
          <Redirect from="/" exact to="/studentManagement" />
          <Route exact path="*" component={studentManagementContainer} />
        </Switch>
    </Router>
  );
};

export default RootContainer;
