import React from "react";
import NweetForm from "../components/NweetForm";
import "./Home.css";
function Home({ isLoggedIn }) {
  return (
    <div>
      <NweetForm isLoggedIn={isLoggedIn} />
      <div className="home">Home</div>
    </div>
  );
}

export default Home;
