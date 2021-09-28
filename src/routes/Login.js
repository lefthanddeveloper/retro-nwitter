import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { firebaseAppAuth, firebaseAuth } from "../firebase";
import "./Login.css";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isMouseOver, setIsMouseOver] = useState(false);

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

  const onMouseOverLoginBtn = () => {
    setIsMouseOver(true);
  };
  const onMouseOutLoginBtn = () => {
    setIsMouseOver(false);
  };
  return (
    <>
      <form className="form_Login" onSubmit={onSubmit}>
        <input
          className="form_input"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          className="form_input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <input
          className={`form_submit ${
            isMouseOver ? "login-mouseOver" : "login-mouseOut"
          }`}
          type="submit"
          value="LogIn"
          onMouseOver={onMouseOverLoginBtn}
          onMouseOut={onMouseOutLoginBtn}
        />
      </form>
      <div className="socialLogins">
        <button
          className="btn-socialLogin"
          name="google"
          onClick={onClickSocialLogin}
        >
          Continue with Google
        </button>
        <button
          className="btn-socialLogin"
          name="github"
          onClick={onClickSocialLogin}
        >
          Continue with Github
        </button>
      </div>
      <div>{error}</div>
      <div className="btn-createAccount">
        <Link to="/createAccount">Create Account</Link>
      </div>
    </>
  );
}

export default Login;
