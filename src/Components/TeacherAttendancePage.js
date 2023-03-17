import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const TeacherAttendancePage = () => {
  const [studentList, setStudentList] = useState([]);
  const [studentZoznam, setStudentZoznam] = useState([]);
  const { state } = useLocation();
  const { id_predmet, datum } = state;


  useEffect(() => {
    fetch(`http://localhost:8080/prehlad/ucitel/${id_predmet}?datum=${datum}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to retrieve data");
        }
        return r.json();
      })

      .then((d) => setStudentList(d.map(student => {
        const matchingStudent = studentZoznam.find(s => s.id_predmet === id_predmet && s.meno === student.meno && s.priezvisko === student.priezvisko);
        return {
          ...student,
          
          status: matchingStudent ? "Prítomný" : "Náhrada hodiny"
          
        }
      })))
      .catch((e) => console.error(e));
  }, [id_predmet,datum,studentZoznam]);

  useEffect(() => {
    fetch(`http://localhost:8080/prehlad/ucitelZoznam/${id_predmet}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to retrieve data");
        }
        return r.json();
      })
      
      .then((d) => setStudentZoznam(d))
      .catch((e) => console.error(e));
  }, [id_predmet]);

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
              <td style={{ background: row.status ? "#7AEA90" : "#FFFF8A" }}>
                {row.status ? "Prítomný" : "Náhrada hodiny"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherAttendancePage;
