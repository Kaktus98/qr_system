import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import "./StudentOverview.css";
import "react-datepicker/dist/react-datepicker.css";
import { getSlovakDay } from "../components/utils/GetSlovakDay";

const StudentOverview = () => {
  const [data, setData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState();
  const id_student = useSelector((state) => state.id);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const day = getSlovakDay(new Date(selectedDate).getUTCDay())
    fetch(
      selectedSubject && selectedSubject !== "Všetky predmety"
        ? `http://localhost:8080/prehlad/student/${id_student}?den=${day}&nazov_predmetu=${selectedSubject}`
        : `http://localhost:8080/prehlad/student/${id_student}?den=${day}`
    )
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to retrieve data");
        }
        return r.json();
      })
      .then((d) => setData(d))
      .catch((e) => console.error(e));
  }, [selectedSubject, id_student, selectedDate]); //ak sa zmeni jedna z hodnout tak sa zmení aj URL

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

  return (
    <>
      <div className="d-flex justify-content-center mb-3">
        <div className="form-group">
          <select
            className="form-control"
            id="subjectDropdown"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <div className="react-datepicker-wrapper">
            <DatePicker
              id="datePicker"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="noDataMessage">
          <p>Pre zvolený deň neexistuje záznam</p>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <table className="table table-striped table-bordered table-hover align-middle">
            <thead className="table-secondary">
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
        </div>
      )}
    </>
  );
};

export default StudentOverview;
