import React from "react";
//import Header from "./header/Header";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/studentOverview");
  };

  /*  const handleLogin = () => {
    setLogin(true);
  } */

  return (
    <>
      {/* <Header /> */}
      <div className="d-flex justify-content-center align-items-center  vh-100">
        <div className="col-md-4">
          <button className="btn btn-dark btn-lg mb-3 mx-2">Naskenuj QR</button>
          <button
            className="btn btn-secondary btn-lg mb-3 mx-2"
            type="button"
            onClick={handleClick}
          >
            Prehľad
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
