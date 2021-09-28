import React from "react";
import * as BoxIcons from "react-icons/bi";
import {
  firebaseAppStorage,
  firebaseFireStore,
  firebaseStorage,
  fireStore,
} from "../firebase";
import "./Nweet.css";

function Nweet({ nweetObj, isOwner }) {
  const onClickDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (ok) {
      if (nweetObj.attachmentUrl !== "") {
        const storage = firebaseStorage;
        const attachmentRef = firebaseAppStorage.ref(
          storage,
          nweetObj.attachmentUrl
        );
        await firebaseAppStorage.deleteObject(attachmentRef);
      }

      await firebaseFireStore.deleteDoc(
        firebaseFireStore.doc(fireStore, "nweets", nweetObj.id)
      );
    }
  };

  return (
    <div className="nweetObj">
      <div className="nweetText">{nweetObj.text}</div>
      {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
      {isOwner && (
        <>
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
