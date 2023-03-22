import React, { useState, useEffect } from "react";
/* import DatePicker from "react-datepicker"; */
import { useSelector } from "react-redux";
import "./StudentOverview.css";
import "react-datepicker/dist/react-datepicker.css";
import { getSlovakDay } from "../components/utils/GetSlovakDay";

const StudentOverview = () => {
  const [data, setData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState();
  const id_student = useSelector((state) => state.id);
  const [selectedDay, setSelectedDay] = useState(
    getSlovakDay(new Date().getUTCDay())
  );

  useEffect(() => {
    /* const day = getSlovakDay(new Date(selectedDate).getUTCDay()) */
    fetch(
      selectedSubject && selectedSubject !== "Všetky predmety"
        ? `http://localhost:8080/prehlad/student/${id_student}?den=${selectedDay}&nazov_predmetu=${selectedSubject}`
        : `http://localhost:8080/prehlad/student/${id_student}?den=${selectedDay}`
    )
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to retrieve data");
        }
        return r.json();
      })
      .then((d) => setData(d))
      .catch((e) => console.error(e));
  }, [selectedSubject, id_student, selectedDay]); //ak sa zmeni jedna z hodnout tak sa zmení aj URL

  const subjects = [
    "Všetky predmety",
    "Matematika",
    "Ekonometria",
    "Manažment",
    "Marketing",
    "Softvérové Inžinierstvo",
    "Databázové systémy",
    "UX dizajn",
    "Financie",
  ];

  const weekDays = [
    "Pondelok",
    "Utorok",
    "Streda",
    "Stvrtok",
    "Piatok",
    "Sobota",
    "Nedela",
  ];

  return (
    <>
      <div className="d-flex justify-content-center mb-3 mt-5">
        <div className="p-d-flex p-jc-center">
          <select
            className="form-control"
            id="subjectDropdown"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={{ margin: "0 auto" }}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            id="weekDays"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            style={{ margin: "0 auto" }}
          >
            {weekDays.map((days) => (
              <option key={days} value={days}>
                {days}
              </option>
            ))}
          </select>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="noDataMessage">
          <p>Pre zvolený deň neexistuje záznam</p>
        </div>
      ) : (
        <div className="p-d-flex p-jc-center">
          <table
            className="p-table table-striped table-bordered table-hover align-middle"
            style={{
              border: "1px solid black",
              borderCollapse: "collapse",
              width: "50%",
              margin: "0 auto",
            }}
          >
            <thead
              className="table-secondary"
              style={{ border: "1px solid black" }}
            >
              <tr>
                <th>Meno</th>
                <th>Priezvisko</th>
                <th>Deň</th>
                <th>Predmet</th>
                <th>Status</th>
                <th>Dátum </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid black" }}>{row.meno}</td>
                  <td style={{ border: "1px solid black" }}>
                    {row.priezvisko}
                  </td>
                  <td style={{ border: "1px solid black" }}>{row.den}</td>
                  <td style={{ border: "1px solid black" }}>
                    {row.nazov_predmetu}
                  </td>
                  <td
                    style={{
                      background: row.status ? "#7AEA90" : "#D98886",
                      border: "1px solid black",
                    }}
                  >
                    {row.status ? "Prítomný" : "Neprítomný"}
                  </td>
                  <td style={{ border: "1px solid black" }}>{row.datum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default StudentOverview;

//table
/* <div className="d-flex justify-content-center ">
<table className="table table-striped table-bordered table-hover align-middle" style={{borderColor: "black"}}>
<thead className="table-secondary" >
  <tr>
    <th style={{width: 250}} >Meno</th>
    <th style={{width: 250}}>Priezvisko</th>
    <th style={{width: 250}}>Deň</th>
    <th style={{width: 250}}>Predmet</th>
    <th style={{width: 250}}>Status</th>
    <th style={{width: 250}}>Dátum </th>
  </tr>
</thead>
<tbody>
  {data.map((row, i) => (
    <tr key={i}>
      <td>{row.meno}</td>
      <td>{row.priezvisko}</td>
      <td>{row.den}</td>
      <td>{row.nazov_predmetu}</td>
      <td
        style={{ background: row.status ? "#7AEA90" : "#D98886" }}
      >
        {row.status ? "Prítomný" : "Neprítomný"}
      </td>
      <td>{row.datum}</td>
    </tr>
  ))}
</tbody>
</table>
  </div> */
