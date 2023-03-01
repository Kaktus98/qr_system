//rafce, skratka pre nacitanie predpisu funkcie
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import IndroducingPage from "./components/IndroducingPage";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import StudentOverview from "./student/StudentOverview";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndroducingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<HomePage />} />
          <Route path="studentOverview" element={<StudentOverview/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
