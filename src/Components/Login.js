import React, { useState } from "react";

import "./Navbar";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  /* USESTATE -> hook vracia dva hodnoty: prvý je aktuálny stav a druhý je funkcia na zmenu stavu, viď onChange funkciu */

  /*   const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); */

  const handleSubmit = (e) => {
    // Prevent page reload
    e.preventDefault();
  };

  /*   const renderErrorMessage = (email) => {
    email === errorMessages.email && <div>{errorMessages.message}</div>;
  }; */

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label for="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
          id="email"
          name="email"
          required
        />
        {/* {renderErrorMessage("email")} */}
      </div>
      <div>
        <label for="password">password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.password)}
          type="password"
          placeholder="password"
          id="password"
          name="password"
          required
        />
        {/* {renderErrorMessage("password")} */}
      </div>

      <button type="submit">Prihlásiť sa</button>
    </form>
  );
};

export default Login;
