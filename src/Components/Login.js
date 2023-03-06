import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { setId } from "../reducer/Actions";
import { setRole } from "../reducer/Actions";
import { useDispatch } from "react-redux";

const url = "http://localhost:8080/login";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

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
        dispatch(setId(identifikator["id"]));
        dispatch(setRole(identifikator["rola"])); // pridanie novej akcie SET_ROLE
        console.log(identifikator["rola"]);
        //navigate("/home");
        if (identifikator["rola"] === "STUDENT") {
          navigate("/homeStudent");
        } else if (identifikator["rola"] === "TEACHER") {
          navigate("/homeTeacher");
        }
      })
      .catch((error) => {
        // spracovanie chyby
        console.error(error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-5 bg-light rounded border">
        <form onSubmit={sendLoginRequest}>
          <div className="form-group">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
              id="email"
              name="email"
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Prihlásiť sa
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
