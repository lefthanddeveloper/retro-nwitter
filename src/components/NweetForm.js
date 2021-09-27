import { useHistory } from "react-router";
import { useState } from "react";
import "./NweetForm.css";
import { firebaseFireStore, fireStore } from "../firebase";
import * as BootstrapIcon from "react-icons/bs";

function NweetForm({ isLoggedIn, userObj }) {
  const history = useHistory();
  const [nweet, setNweet] = useState("");
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [attachment, setAttachment] = useState(null);

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
      await firebaseFireStore.addDoc(
        firebaseFireStore.collection(fireStore, "nweets"),
        {
          text: nweet,
          createdAt: Date.now(),
          creatorId: userObj.uid,
        }
      );
    } catch (e) {
      console.error("Error adding document : " + e);
    }

    setNweet("");
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

  return (
    <div className="nweetForm">
      <form onSubmit={onSubmit} className="form_nweet">
        <input
          className="input_text"
          type="text"
          placeholder="What's in your head today?"
          required
          value={nweet}
          onChange={OnChange}
          onClick={OnClick}
        />
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
          {/* <div className="container-btn_image">
            <input
              className="input-image"
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
          </div>
          <BootstrapIcon.BsImageAlt className="btn_image" /> */}
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
      {attachment && <img src={attachment} className="attachment-Image" />}
    </div>
  );
}

export default NweetForm;
