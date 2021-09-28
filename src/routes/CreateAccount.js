import React, { useState } from "react";
import { useHistory } from "react-router";
import { firebaseAppAuth, firebaseAuth } from "../firebase";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [isMouseOver, setIsMouseOver] = useState(false);

  const history = useHistory();
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirm") {
      setConfirm(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirm) {
      alert("INCORRECT PASSWORD");
      return;
    }

    try {
      firebaseAppAuth
        .createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((result) => {
          //update display
          firebaseAppAuth
            .updateProfile(result.user, {
              displayName: displayName,
            })
            .then(() => {
              history.push("/");
            });
        });
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="form_Login">
        <input
          className="form_input"
          name="email"
          type="text"
          placeholder="New Email Account"
          value={email}
          onChange={onChange}
          required
        />
        <input
          className="form_input"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          minLength="5"
          required
        />
        <input
          className="form_input"
          name="confirm"
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={onChange}
          minLength="5"
          required
        />
        <input
          className="form_input"
          type="text"
          placeholder="Display Name"
          name="displayName"
          value={displayName}
          onChange={onChange}
          required
        />
        <input
          className={`form_submit ${
            isMouseOver ? "login-mouseOver" : "login-mouseOut"
          }`}
          type="submit"
          value="Create"
          onMouseOver={() => {
            setIsMouseOver(true);
          }}
          onMouseOut={() => {
            setIsMouseOver(false);
          }}
        />
      </form>
      <span>{error}</span>
    </>
  );
}

export default CreateAccount;
