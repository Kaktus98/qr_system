import React from "react";
import Header from "./header/Header";
import "./IndroducingPage.css";

const IndroducingPage = () => {
  return (
    <div>
      <Header></Header>
      <div>
        <button
          className="compulsoryAttendace"
          type="button"
          onClick={console.log("Gombik bol stlačený")}
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
