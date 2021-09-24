import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route>
              <Home exact path="/" />
            </Route>
          </>
        ) : (
          <>Not LoggedIN</>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
