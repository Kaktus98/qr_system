import React from "react";
import Header from "./header/Header";
import "./IndroducingPage.css";
import { useNavigate } from "react-router-dom";

const IndroducingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <Header></Header>
      <div>
        <button
          className="compulsoryAttendace"
          type="button"
          onClick={handleClick}
        >
          Povinná evidencia dochádzky
        </button>
      </div>
      <div>
        <button
          className="optionalAttendace"
          type="button"
          onClick={console.log("Gombik bol stlačený")}
        >
          Nepovinná evidencia dochádzky
        </button>
      </div>
    </div>
  );
};

export default IndroducingPage;
