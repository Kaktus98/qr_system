import React, { useState, useEffect } from "react";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [idStudent, setIdStudent] = useState(null);

  //const dispatch = useDispatch();
  //const idStudent = useSelector((state) => state.id_student);

  const handleClick = () => {
    //vymaz id užívateľa po odhlásení ktoré už máme uložené v localStorage

    localStorage.removeItem("id_student");
    setIdStudent(null);
    navigate("/");
  };

  const handleLogo = () => {
    //navigate("/home");
  };

  useEffect(() => {
    const idStudentLS = localStorage.getItem("id_student");
    setIdStudent(idStudentLS);
  }, []); //ked sa zmeni id student av [] tak vyrenderuj log

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
            {idStudent && (
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
