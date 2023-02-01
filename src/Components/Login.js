import React, { useState } from "react";
import "./Navbar";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for="email">email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="email"
        id="email"
        name="email"
      />{" "}
      <br />
      <label for="password">heslo</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.password)}
        type="heslo"
        placeholder="heslo"
        id="heslo"
        name="heslo"
      />{" "}
      <br />
      <button type="submit">Prihlásiť sa</button>
    </form>
  );
};

export default Login;
