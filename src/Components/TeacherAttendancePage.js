import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const TeacherAttendancePage = () => {
  const [studentList, setStudentList] = useState([]);
  const { state } = useLocation();
  const { id_predmet, datum } = state;

  console.log(id_predmet);
  console.log(datum);

  useEffect(() => {
    fetch(`http://localhost:8080/prehlad/ucitel/${id_predmet}?datum=${datum}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to retrieve data");
        }
        return r.json();
      })
      .then((d) => setStudentList(d))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <table className="table table-striped table-bordered table-hover align-middle">
        <thead className="table-secondary">
          <tr>
            <th>Meno</th>
            <th>Priezvisko</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((row, i) => (
            <tr key={i}>
              <td>{row.meno}</td>
              <td>{row.priezvisko}</td>
              <td style={{ background: row.status ? "#7AEA90" : "#D98886" }}>
                {row.status ? "Prítomný" : "Neprítomný"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherAttendancePage;
