import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import studentManagementContainer from "../auth/studentManagement";
import ProtectedRoute from "../../components/protectedRoute";
const RootContainer = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
