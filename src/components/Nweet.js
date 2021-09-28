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
      <div className="nweetContent">
        <span className="nweetText">{`* ${nweetObj.creatorDisplayName} : ${nweetObj.text}`}</span>
        <span className="nweetCreatedAt">
          (
          {`${new Date(nweetObj.createdAt).toLocaleDateString()} ${new Date(
            nweetObj.createdAt
          ).toLocaleTimeString()}`}
          )
        </span>
        {isOwner && (
          <>
            <BoxIcons.BiWindowClose
              className="deleteBtn"
              onClick={onClickDelete}
            />
          </>
        )}
      </div>
      {nweetObj.attachmentUrl && (
        <img className="nweetImage" src={nweetObj.attachmentUrl} />
      )}
    </div>
  );
}

export default Nweet;
