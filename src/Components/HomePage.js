import React from "react";
import Header from "./header/Header";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/studentOverview");
  };

  return (
    <div>
      <Header />
      <div>
        <button>Naskenuj QR</button>
        <button type="button" onClick={handleClick}>
          Prehľad
        </button>
      </div>
    </div>
  );
};

export default HomePage;
