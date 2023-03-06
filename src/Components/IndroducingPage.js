import React from "react";
//import Header from "./header/Header";
import "./IndroducingPage.css";
import { useNavigate } from "react-router-dom";

const IndroducingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-4">
          <button
            className="btn btn-success btn-lg mb-3 w-100"
            type="button"
            onClick={handleClick}
          >
            Povinná evidencia dochádzky
          </button>
          <button className="btn btn-warning btn-lg w-100" type="button">
            Nepovinná evidencia dochádzky
          </button>
        </div>
      </div>
    </>
  );
};

export default IndroducingPage;
