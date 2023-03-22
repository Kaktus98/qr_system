import React from "react";
//import Header from "./header/Header";
import { useNavigate } from "react-router-dom";

const IndroducingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="flex justify-content-center align-items-center vh-100">
        <div
          className="col-md-4 d-flex justify-content-center"
          style={{ marginTop: 200 }}
        >
          {/* pridal som style */}
          <button
            className="btn btn-success btn-lg mb-3"
            type="button"
            onClick={handleClick}
            style={{
              fontSize: "2rem",
              padding: "1.25rem 2.5rem",
              width: "600px",
              height: "80px",
            }}
          >
            Povinná evidencia dochádzky
          </button>
          <button
            className="btn btn-warning btn-lg"
            type="button"
            style={{
              fontSize: "2rem",
              padding: "1.25rem 2.5rem",
              width: "600px",
              height: "80px",
            }}
          >
            Nepovinná evidencia dochádzky
          </button>
        </div>
      </div>
    </>
  );
};

export default IndroducingPage;
