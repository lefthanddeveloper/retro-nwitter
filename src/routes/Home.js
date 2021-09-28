import React from "react";
import NweetContainer from "../components/NweetContainer";
import NweetForm from "../components/NweetForm";
import "./Home.css";
function Home({ isLoggedIn, userObj }) {
  return (
    <div>
      <NweetForm isLoggedIn={isLoggedIn} userObj={userObj} />
      <NweetContainer userObj={userObj} isProfile={false} />
    </div>
  );
}

export default Home;
