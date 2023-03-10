//rafce, skratka pre nacitanie predpisu funkcie
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import IndroducingPage from "./components/IndroducingPage";
import Login from "./components/Login";
import HomePageStudent from "./student/HomePageStudent";
import HomePageTeacher from "./components/HomePageTeacher";
import StudentOverview from "./student/StudentOverview";
import Header from "./components/header/Header";
import QrCodePage from "./components/qrCode/QrCodePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<IndroducingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homeStudent" element={<HomePageStudent />} />
          <Route path="/homeTeacher" element={<HomePageTeacher />} />
          <Route path="/studentOverview" element={<StudentOverview />} />
          <Route path="/qrCode" element={<QrCodePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
