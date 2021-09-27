import { useEffect, useState } from "react";
import "../App.css";
import { firebaseAuth, firebaseAppAuth } from "../firebase";
import AppRouter from "./Route";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(firebaseAuth.currentUser);
  const [userObj, setUserObj] = useState(null);
  const RegisterAuthStateChangeEvent = () => {
    firebaseAppAuth.onAuthStateChanged(firebaseAuth, (user) => {
      setUserObj(user);
      setIsLoggedIn(user);
      setInit(true);
    });
  };

  useEffect(() => {
    RegisterAuthStateChangeEvent();
  }, []);

  return (
    <div className="App">
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        <div>Loading...</div>
      )}

      <footer>&copy; {new Date().getFullYear()} Retro Nwitter</footer>
    </div>
  );
}

export default App;
