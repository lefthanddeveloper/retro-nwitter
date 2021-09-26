import { useHistory } from "react-router";
import { useState } from "react";
import "./NweetForm.css";

function NweetForm({ isLoggedIn }) {
  const history = useHistory();
  const [nweet, setNweet] = useState("");

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

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="nweetForm">
      <form onSubmit={onSubmit} className="form_nweet">
        <input
          className="input_text"
          type="text"
          placeholder="What's happening?"
          required
          value={nweet}
          onChange={OnChange}
          onClick={OnClick}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default NweetForm;
