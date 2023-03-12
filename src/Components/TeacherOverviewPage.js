import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSlovakDay } from "../components/utils/GetSlovakDay";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const TeacherOverviewPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState();
  const id_teacher = useSelector((state) => state.id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const day = getSlovakDay(new Date(selectedDate).getUTCDay());
    console.log(id_teacher);
    fetch(
      selectedSubject
        ? `http://localhost:8080/prehladPredmetov/${id_teacher}?den=${day}&nazov_predmetu=${selectedSubject}`
        : `http://localhost:8080/prehladPredmetov/${id_teacher}?den=${day}`
    )
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to retrieve data");
        }
        return r.json();
      })
      .then((d) => setSubjects(d))
      .catch((e) => console.error(e));
  }, [selectedSubject, id_teacher, selectedDate]);

  const subjectNames = [
    "Matematika",
    "Ekonometria",
    "Manažment",
    "Marketing",
    "Softvérové Inžinierstvo",
    "Databázové systémy",
    "UX dizajn",
    "Financie",
  ];

  const handleClick = (id_predmet, datum) => {
    console.log(id_predmet);
    navigate("/teacherAttendanceOverview", { state: { id_predmet, datum } });
  };

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
            {subjectNames.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
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
      {subjects.length === 0 ? (
        <div className="noDataMessage">
          <p>Pre zvolený deň neexistuje záznam</p>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <table className="table table-striped table-bordered table-hover align-middle">
            <thead className="table-secondary">
              <tr>
                <th>Predmet</th>
                <th>Deň</th>
                <th>Skupina</th>
                <th>Čas</th>
                <th>Zoznam študentov + status</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((row, i) => (
                <tr key={i}>
                  <td>{row.nazov_predmetu}</td>
                  <td>{row.den}</td>
                  <td>{row.skupina}</td>
                  <td>{row.cas}</td>
                  <td>
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "blue",
                        cursor: "pointer",
                      }}
                      onClick={() => handleClick(row.id_predmet, new Date())}
                    >
                      Zoznam študentov/status
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TeacherOverviewPage;
