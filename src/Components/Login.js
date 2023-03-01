import React, { useState, useEffect } from "react";
import Header from "./header/Header";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import "./Login.css";

const url = "http://localhost:8080/login";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");

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
        setStudentId(identifikator["id_student"]);
        navigate("/home");
      })
      .catch((error) => {
        // spracovanie chyby
        console.error(error);
      });
  };
  /* const sendLoginRequest = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", {email} )
      .then((response) => {
        setStudentId(response.data.id_student);
        // handle successful login here
      })
      .catch((error) => {
        // handle login error here
        console.error(error);
      });
  };
  console.log(studentId);
 */

  useEffect(() => {
    console.log(studentId);
  });

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
