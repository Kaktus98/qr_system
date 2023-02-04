import React, { useState } from "react";
import Header from "./header/Header";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const databaseOfUsers = [
    {
      id: 1,
      role: "student",
      name: "John",
      surname: "Doe",
      email: "johndoe@hotmail.com",
      password: "heslo123",
    },
    {
      id: 2,
      role: "teacher",
      name: "Jane",
      surname: "Doe",
      email: "janedoe@gmail.com",
      password: "heslo123",
    },
    {
      id: 3,
      role: "student",
      name: "Jason",
      surname: "Lee",
      email: "jacksmith@outlook.com",
      password: "heslo123",
    },
    {
      id: 4,
      role: "student",
      name: "Milan",
      surname: "Mrkva",
      email: "milan@gmail.com",
      password: "heslo123",
    },
    {
      id: 5,
      role: "teacher",
      name: "Bronislava",
      surname: "Donovan",
      email: "bronislava@outlook.com",
      password: "heslo123",
    },
    {
      id: 6,
      role: "teacher",
      name: "Ladislav",
      surname: "Kováč",
      email: "laco@gmail.com",
      password: "heslo123",
    },
  ];

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* USESTATE -> hook vracia dva hodnoty: prvý je aktuálny stav a druhý je funkcia na zmenu stavu, viď onChange funkciu */

  /*   const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); */

  const handleSubmit = (event) => {
    event.preventDefault();
    const account = databaseOfUsers.find((user) => user.email === email);
    if (account && account.password === password) {
      navigate("/home");
    } else {
      alert("wrong email or password");
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="formularLogin">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="password"
              id="password"
              name="password"
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
