import React from "react";
import * as BoxIcons from "react-icons/bi";
import { firebaseFireStore, fireStore } from "../firebase";
import "./Nweet.css";

function Nweet({ nweetObj, isOwner }) {
  const onClickDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (ok) {
      await firebaseFireStore.deleteDoc(
        firebaseFireStore.doc(fireStore, "nweets", nweetObj.id)
      );
    }
  };

  return (
    <div className="nweetObj">
      <div className="nweetText">{nweetObj.text}</div>
      {isOwner && (
        <>
          {/* <button className="DeleteBtn" onClick={onClickDelete}> */}

          <BoxIcons.BiWindowClose
            className="deleteBtn"
            onClick={onClickDelete}
          />
          {/* </button> */}
        </>
      )}
    </div>
  );
}

export default Nweet;
