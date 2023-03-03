import React, { useState, useEffect } from "react";
import "./Header.css";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetIdStudent } from "../../reducer/Actions";
//import store from "../../reducer/Store";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const dispatch = useDispatch();
  const id_studentIsNull = useSelector((state) => state.id_student);

  const handleClick = () => {
    //vymaz id užívateľa po odhlásení ktoré už máme uložené
    dispatch(resetIdStudent(id_studentIsNull));
    //console.log(store.getState());
    //console.log(id_student);
    navigate("/");
    setIsLoggedIn(false);
  };

  const handleLogo = () => {
    navigate("/home");
  };

  useEffect(() => {
    console.log(id_studentIsNull);
  }, [id_studentIsNull]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" onClick={handleLogo}>
          Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Názov stránky</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn && (
              <Button variant="outline-secondary" onClick={handleClick}>
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
