import React, { useEffect } from "react";
import { useHistory } from "react-router";
import {
  firebaseAppAuth,
  firebaseAuth,
  firebaseFireStore,
  fireStore,
} from "../firebase";
import "./Profile.css";

function Profile({ userObj }) {
  const history = useHistory();

  const getMyNweets = async () => {
    const q = firebaseFireStore.query(
      firebaseFireStore.collection(fireStore, "nweets"),
      firebaseFireStore.where("creatorId", "==", userObj.uid),
      firebaseFireStore.orderBy("createdAt")
    );

    const querySnapshot = await firebaseFireStore.getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onClickLogOut = async () => {
    await firebaseAppAuth.signOut(firebaseAuth);
    alert("Logged Out Successfully");
    history.push("/");
  };

  return (
    <>
      <div className="profile">
        <div>{userObj.displayName} Profile</div>
        <button onClick={onClickLogOut} className="btn-logout">
          Log Out
        </button>
      </div>
    </>
  );
}

export default Profile;
