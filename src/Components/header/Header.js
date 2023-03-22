import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetUser } from "../../reducer/Actions";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const id_visitor = useSelector((state) => state.id);
  const role = useSelector((state) => state.role);

  const handleClick = () => {
    dispatch(resetUser());
    navigate("/");
  };

  const handleClickOverview = () => {
    navigate("/teacherOverview"); //dokončiť
  };

  const handleLogo = () => {
    if (role === "STUDENT" && isLoggedIn) {
      navigate("/homeStudent");
    } else if (role === "TEACHER" && isLoggedIn) {
      navigate("/homeTeacher");
    }
  };

  const handleClicTodaySubjects = () => {
    navigate("/homeTeacher");
  };

  // Kontrola, či je užívateľ prihlásený
  const isLoggedIn = id_visitor !== null;

  // Kontrola, či aktuálna cesta nie je úvodná stránka alebo stránka prihlásenia
  const isOnHomeOrLogin =
    location.pathname === "/" || location.pathname === "/login";

  const roleIsTeacher = role === "TEACHER";

  const isOverviewPage = location.pathname === "/teacherOverview";

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
      <div
        className="cursor-pointer flex col-12 justify-content-center lg:justify-content-start lg:col-6"
        onClick={handleLogo}
      >
        QR_AttendanceSystem
      </div>

      <div className={"col-12 flex justify-content-end lg:col-6"}>
        {isLoggedIn && !isOnHomeOrLogin && roleIsTeacher && !isOverviewPage && (
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
    </div>
  );
};

export default Header;
