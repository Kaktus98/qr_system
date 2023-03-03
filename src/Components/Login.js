import React, { useState, useEffect } from "react";
import Header from "./header/Header";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import "./Login.css";
import { setIdStudent } from "../reducer/Actions";
import { useSelector, useDispatch } from "react-redux";
//import store from "../reducer/Store";

const url = "http://localhost:8080/login";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  //const [studentId, setStudentId] = useState("");
  //const [, setLogin] = useState(false);
  const dispatch = useDispatch();
  const id_student = useSelector((state) => state.id_student);

  /* USESTATE -> hook vracia dva hodnoty: prvý je aktuálny stav a druhý je funkcia na zmenu stavu, viď onChange funkciu */

  const sendLoginRequest = (e) => {
    e.preventDefault();
    const requestBody = {
      email: email,
    };

    // POST request na endpoint /login
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody.email),
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.json()]);
        } else return Promise.reject("Invalid login attempt");
      })
      .then((data) => data["0"])
      .then((identifikator) => {
        dispatch(setIdStudent(identifikator["id_student"]));
        navigate("/home");
      })
      .catch((error) => {
        // spracovanie chyby
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(id_student);
  }, [id_student]);

  return (
    <div>
      <Header />
      <div className="formularLogin">
        <form onSubmit={sendLoginRequest}>
          <div>
            {/* <label htmlFor="email">email</label> */}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
              id="email"
              name="email"
              required
            />
          </div>

          <button type="submit">Prihlásiť sa</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
