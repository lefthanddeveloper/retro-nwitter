import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { firebaseAppAuth, firebaseAuth } from "../firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    firebaseAppAuth
      .signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((user) => {
        history.push("/");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const onClickSocialLogin = (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseAppAuth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseAppAuth.GithubAuthProvider();
    }

    firebaseAppAuth
      .signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        console.log(result);
        history.push("/");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  return (
    <>
      <form className="form_Login" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value="LogIn" />
      </form>
      <button name="google" onClick={onClickSocialLogin}>
        Continue with Google
      </button>
      <button name="github" onClick={onClickSocialLogin}>
        Continue with Github
      </button>
      <div>{error}</div>
      <Link to="/createAccount">Create Account</Link>
    </>
  );
}

export default Login;
