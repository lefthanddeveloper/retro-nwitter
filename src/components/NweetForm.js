import { useHistory } from "react-router";
import { useState } from "react";
import "./NweetForm.css";
import {
  firebaseAppStorage,
  firebaseFireStore,
  firebaseStorage,
  fireStore,
} from "../firebase";
import * as BootstrapIcon from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

function NweetForm({ isLoggedIn, userObj }) {
  const history = useHistory();
  const [nweet, setNweet] = useState("");
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [attachment, setAttachment] = useState("");

  const theImage = <img src={attachment} className="attachedImage" />;

  const OnChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const OnClick = (event) => {
    if (!isLoggedIn) {
      alert("Please, Log In");
      history.push("/login");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let attachmentUrl = "";

      if (attachment != "") {
        const attachmentRef = firebaseAppStorage.ref(
          firebaseStorage,
          `${userObj.uid}/${uuidv4()}`
        );

        const response = await firebaseAppStorage.uploadString(
          attachmentRef,
          attachment,
          "data_url"
        );

        attachmentUrl = await firebaseAppStorage.getDownloadURL(response.ref);
      }

      const nweetObj = {
        text: nweet,
        createdAt: Date.now(),
        creatorDisplayName: userObj.displayName,
        creatorId: userObj.uid,
        attachmentUrl,
      };

      console.log(nweetObj);
      await firebaseFireStore.addDoc(
        firebaseFireStore.collection(fireStore, "nweets"),
        nweetObj
      );
    } catch (e) {
      console.error("Error adding document : " + e);
    }

    setNweet("");
    setAttachment("");
  };

  const OnMouseOver = () => {
    setIsMouseOver(true);
  };

  const OnMouseOut = () => {
    setIsMouseOver(false);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    if (files.length === 0) return;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClickCancelImage = () => {
    setAttachment(null);
  };

  return (
    <div className="nweetForm">
      <form onSubmit={onSubmit} className="form_nweet">
        <div className="inputArea">
          <textarea
            className="input_text"
            type="textarea"
            placeholder="What's in your head now?"
            required
            value={nweet}
            onChange={OnChange}
            onClick={OnClick}
          />
          {attachment && (
            <>
              {/* <img src={attachment} className="attachedImage" /> */}
              {theImage}
              <button className="btn-cancelImage" onClick={onClickCancelImage}>
                X
              </button>
            </>
          )}
        </div>
        <div className="form_bottom">
          <label className="label-image">
            <BootstrapIcon.BsImageAlt className="btn_image" />
            <input
              className="input-image"
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
          </label>
          <input
            className={`input_submit ${
              isMouseOver ? "submit-mouseOver" : "submit-mouseOut"
            }`}
            onMouseOver={OnMouseOver}
            onMouseOut={OnMouseOut}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default NweetForm;
