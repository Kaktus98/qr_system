import React from "react";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setId } from "../../reducer/Actions";


const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const id_visitor = useSelector((state) => state.id);
  const role = useSelector((state) => state.role);

  const handleClick = () => {
    dispatch(setId(null));
    navigate("/");
  };

  const handleLogo = () => {
    if (role === "STUDENT") {
      navigate("/homeStudent");
    } else {
      navigate("/homeTeacher");
    }
  };

  // Kontrola, či je užívateľ prihlásený
  const isLoggedIn = id_visitor !== null;

  // Kontrola, či aktuálna cesta nie je úvodná stránka alebo stránka prihlásenia
  const isOnHomeOrLogin =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand href="#home" onClick={handleLogo}>
          QR_AttendanceSystem
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home"></Nav.Link>
          </Nav>
          <Nav>
            {/* Kontrola, či má užívateľ byť prihlásený a aktuálna cesta nie je úvodná stránka alebo stránka prihlásenia */}
            {isLoggedIn && !isOnHomeOrLogin && (
              <Button
                
                onClick={handleClick}
                className="bg-dark hover-darkgreen"
              >
                Odhlásenie
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
