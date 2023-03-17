import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSlovakDay } from "../components/utils/GetSlovakDay";
import { useNavigate } from "react-router-dom";

const HomePageTeacher = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState();
  const id_teacher = useSelector((state) => state.id);
  const navigate = useNavigate();

  const handleClick = (id_predmet) => {
    navigate("/qrCode", { state: { id_predmet } });
  };

  useEffect(() => {
    const day = getSlovakDay(new Date().getUTCDay());
    fetch(
      selectedSubject && selectedSubject !== "Všetky predmety"
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
  }, [selectedSubject, id_teacher]);

  const subjectNames = [
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
            {subjectNames.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
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
                <th>QR kód</th>
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
                      onClick={() => handleClick(row.id_predmet)}
                    >
                      Vygeneruj a zobraz QR kód
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

export default HomePageTeacher;
