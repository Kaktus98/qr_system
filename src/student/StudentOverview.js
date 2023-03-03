import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/header/Header";
//import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import "./StudentOverview.css";

const StudentOverview = () => {
  const [data, setData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("Ekonometria");
  const id_studentNonNull = useSelector((state) => state.id_student);
  //const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchData = useCallback(
    async (subject) => {
      const response = await fetch(
        `http://localhost:8080/prehlad/${id_studentNonNull}?den=Pondelok&nazov_predmetu=${subject}`
      );
      const json = await response.json();
      console.log(json);
      setData(json);
      console.log();
    },
    [id_studentNonNull]
  );

  useEffect(() => {
    fetchData(selectedSubject);
  }, [selectedSubject, fetchData]);

  const subjects = ["Matematika", "Ekonometria", "Fyzika"];

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center mb-3">
        <div className="form-group">
          <label htmlFor="subjectDropdown">Vyberte predmet:</label>
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
        </div>
      </div>
      <label htmlFor="datePicker">Vyberte dátum:</label>
      <br />
      {/* <DatePicker
        id="datePicker"
        selected={selectedDate}
        onChange={(e) => setSelectedDate(e.targer.value)}
      /> */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped text-center">
          <thead>
            <tr>
              <th>id_dochadzka</th>
              <th>meno</th>
              <th>priezvisko</th>
              <th>den</th>
              <th>nazov_predmetu</th>
              <th>status</th>
              <th>datum</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <th>{row.id_dochadzkaStudent}</th>
                <td>{row.meno}</td>
                <td>{row.priezvisko}</td>
                <td>{row.den}</td>
                <td>{row.nazov_predmetu}</td>
                <td>{row.status ? "Prítomný" : "Neprítomný"}</td>
                <td>{row.datum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentOverview;
 
 
