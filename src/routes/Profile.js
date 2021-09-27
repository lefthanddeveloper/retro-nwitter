import React from "react";
import { useHistory } from "react-router";
import { firebaseAppAuth, firebaseAuth } from "../firebase";
import "./Profile.css";

function Profile() {
  const history = useHistory();

  const onClickLogOut = async () => {
    await firebaseAppAuth.signOut(firebaseAuth);
    alert("Logged Out Successfully");
    history.push("/");
  };

  return (
    <>
      <div className="profile">
        <div>Profile</div>
        <button onClick={onClickLogOut} className="btn-logout">
          Log Out
        </button>
      </div>
    </>
  );
}

export default Profile;
