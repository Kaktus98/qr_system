import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetUser } from "../../reducer/Actions";
import logoEuba from "../../logo/logoEuba_1.jpg";
import Spinner from "../spinner/Spinner";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const id_visitor = useSelector((state) => state.id);
  const role = useSelector((state) => state.role);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    dispatch(resetUser());
    navigate("/");
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleClickOverview = () => {
    setIsLoading(true);
    navigate("/teacherOverview");
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleLogo = () => {
    setIsLoading(true);
    if (role === "STUDENT" && isLoggedIn) {
      navigate("/homeStudent");
    } else if (role === "TEACHER" && isLoggedIn) {
      navigate("/homeTeacher");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleClicTodaySubjects = () => {
    setIsLoading(true);
    navigate("/homeTeacher");
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleActionMenuClick = () => {
    setShowActionMenu(!showActionMenu);
  };

  // Kontrola, či je užívateľ prihlásený
  const isLoggedIn = id_visitor !== null;

  // Kontrola, či aktuálna cesta nie je úvodná stránka alebo stránka prihlásenia
  const isOnHomeOrLogin =
    location.pathname === "/" || location.pathname === "/login";

  const roleIsTeacher = role === "TEACHER";

  const isOverviewPage = location.pathname === "/teacherOverview";

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div
        className={
          "grid justify-content-between align-items-center pt-3 pb-2 pr-3 pl-4"
        }
        style={{
          background: "#4170c5",
          fontSize: 25,
        }}
      >
        <div className="col-12 flex justify-content-between ">
          <div className="cursor-pointer" onClick={handleLogo}>
            <img
              src={logoEuba}
              alt="eubaImg"
              style={{
                borderRadius: "5px",
                /* border: "1px solid #1a1a1a", */
                boxShadow: "rgba(0, 0, 0, 0.25) 0 10px 15px",
              }}
            />
          </div>
          {!isOnHomeOrLogin && (
            <div>
              <i
                className="pi pi-bars cursor-pointer"
                onClick={handleActionMenuClick}
                style={{ fontSize: "2rem" }}
              ></i>
            </div>
          )}
        </div>

        {showActionMenu && (
          <div className={"col-12 flex justify-content-end menu"}>
            {isLoggedIn &&
              !isOnHomeOrLogin &&
              roleIsTeacher &&
              !isOverviewPage && (
                <button
                  onClick={handleClickOverview}
                  className={"mr-3"}
                  style={{ background: "#E6D0BC", borderColor: "black" }}
                >
                  Prehľad dochádzky
                </button>
              )}
            {isOverviewPage && (
              <button
                onClick={handleClicTodaySubjects}
                className={"mr-3"}
                style={{ background: "#E6D0BC", borderColor: "black" }}
              >
                Dnešné predmety
              </button>
            )}
            {isLoggedIn && !isOnHomeOrLogin && (
              <button
                style={{ background: "#E6D0BC", borderColor: "black" }}
                onClick={handleClick}
              >
                Odhlásenie
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default Header;
