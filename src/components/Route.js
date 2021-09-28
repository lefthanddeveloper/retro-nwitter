import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import CreateAccount from "../routes/CreateAccount";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Profile from "../routes/Profile";
import NavBar from "./NavBar";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} />
        <Switch>
          <Route exact path="/">
            <Home isLoggedIn={isLoggedIn} userObj={userObj} />
          </Route>
          <Route exact path="/profile">
            <Profile userObj={userObj} />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/createAccount">
            <CreateAccount />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
