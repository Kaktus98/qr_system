import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/studentOverview");
  };

  const handleClickScanner = () => {
    navigate("/scanningQrCode");
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center  vh-100">
        <div className="col-md-4" style={{marginTop: 200}}>
          <button
            onClick={handleClickScanner}
            className="btn btn-dark btn-lg mb-3 mx-2"
            style={{fontSize: "2rem", width:300}}
          >
            Naskenuj QR
          </button>
          <button
            className="btn btn-secondary btn-lg mb-3 mx-2"
            type="button"
            onClick={handleClick}
            style={{fontSize: "2rem", width:300}}
          >
            Prehľad
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
