import React, { useState } from "react";
import { useHistory } from "react-router";
import { firebaseAppAuth, firebaseAuth } from "../firebase";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
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
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirm) {
      alert("INCORRECT PASSWORD");
      return;
    }

    try {
      await firebaseAppAuth.createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="New Email Account"
          value={email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          minLength="5"
          required
        />
        <input
          name="confirm"
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={onChange}
          minLength="5"
          required
        />
        <input type="submit" value="Create" />
      </form>
      <span>{error}</span>
    </>
  );
}

export default CreateAccount;
