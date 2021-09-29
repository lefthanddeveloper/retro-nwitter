import React, { useEffect, useState } from "react";
import { firebaseFireStore, fireStore } from "../firebase";
import Nweet from "./Nweet";

function NweetContainer({ userObj, isProfile }) {
  const [nweets, setNweets] = useState([]);

  // const getNweetsFromDB = async () => {
  //   const querySnapshot = await firebaseFireStore.getDocs(
  //     firebaseFireStore.collection(fireStore, "nweets")
  //   );
  //   querySnapshot.forEach((doc) => {
  //     const nweetObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };

  //     setNweets((prev) => {
  //       return [nweetObj, ...prev];
  //     });
  //   });
  // };

  useEffect(() => {
    // getNweetsFromDB();
    let q;
    if (!isProfile) {
      q = firebaseFireStore.query(
        firebaseFireStore.collection(fireStore, "nweets"),
        firebaseFireStore.orderBy("createdAt")
      );
    } else {
      q = firebaseFireStore.query(
        firebaseFireStore.collection(fireStore, "nweets"),
        firebaseFireStore.where("creatorId", "==", userObj.uid)
      );
    }
    let newNweets;
    firebaseFireStore.onSnapshot(q, (snapShot) => {
      newNweets = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // if (!isProfile && newNweets.length > 10) {
      //   const tempNewNweets = newNweets.slice(-10);
      //   newNweets = tempNewNweets;
      // }
      setNweets(newNweets);
    });
  }, []);

  return (
    <div className="nweetContainer">
      {nweets.map((nweet) => (
        <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={userObj && userObj.uid === nweet.creatorId}
        />
      ))}
    </div>
  );
}

export default NweetContainer;
