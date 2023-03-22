import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { exportToExcel } from "../components/utils/ExportToExcel";

const TeacherAttendancePage = () => {
  const [studentList, setStudentList] = useState([]);

  const { state } = useLocation();
  const { id_predmet, datum, skupina, nazov_predmetu } = state;

  useEffect(() => {
    const fetchData = async () => {
      const [response1, response2] = await Promise.all([
        fetch(
          `http://localhost:8080/prehlad/ucitel/${id_predmet}?datum=${datum}`
        ),
        fetch(`http://localhost:8080/prehlad/ucitelZoznam/${id_predmet}`),
      ]);

      let pritomniStudenti = await response1.json();
      let vsetciStudenti = await response2.json();

      // Perform some operations on the data
      vsetciStudenti = vsetciStudenti
        .map((student) => {
          // kazdy stundet je nepritomny
          student.status = "Nepritomný";
          return student;
        })
        .map((student) => {
          // hladame vsetkych studenotov, kt su pritomny a su z danej hodiny
          if (
            pritomniStudenti
              .map((s) => s.id_student)
              .includes(student.id_student)
          ) {
            student.status = "Pritomný";
          }
          return student;
        });

      pritomniStudenti
        .filter(
          (s) => !vsetciStudenti.map((x) => x.id_student).includes(s.id_student)
        )
        .map((s) => {
          const { meno, priezvisko, id_student } = s;
          return {
            id_predmet: id_predmet,
            id_student,
            meno,
            priezvisko,
            status: "Náhrada hodiny",
          };
        })
        .forEach((x) => vsetciStudenti.push(x));
      setStudentList(vsetciStudenti);
    };

    fetchData();
  }, [id_predmet, datum]);

  const handleExport = () => {
    exportToExcel(studentList, `${nazov_predmetu}_Sk${skupina}_${datum}`);
  };

  return (
    <>
      <div>
        <button className="btn btn-success" onClick={handleExport}>
          Exportovanie do Excelu
        </button>
      </div>
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
                <td
                  style={{
                    background:
                      row.status === "Pritomný"
                        ? "#79d191"
                        : row.status === "Nepritomný"
                        ? "#DB8C87"
                        : "#E3D27F",
                  }}
                >
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeacherAttendancePage;
