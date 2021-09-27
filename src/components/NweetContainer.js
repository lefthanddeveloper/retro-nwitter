import React, { useEffect, useState } from "react";
import { firebaseFireStore, fireStore } from "../firebase";
import Nweet from "./Nweet";

function NweetContainer({ userObj }) {
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

    firebaseFireStore.onSnapshot(
      firebaseFireStore.collection(fireStore, "nweets"),
      (snapShot) => {
        const newNweets = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(newNweets);
      }
    );
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
