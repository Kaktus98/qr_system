import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSlovakDay } from "../components/utils/GetSlovakDay";
import { useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { addDays } from "date-fns";

const TeacherOverviewPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectNames, setSubjectNames] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("Všetky predmety");
  const id_teacher = useSelector((state) => state.id);
  const [selectedDate, setSelectedDate] = useState(new Date()); //najpr to vypusti do sveta 6ku a to je sobota
  const navigate = useNavigate();

  useEffect(() => {
    console.log(selectedDate);
    const day = getSlovakDay(new Date(selectedDate).getUTCDay());
    console.log(new Date(selectedDate).getUTCDay());
    console.log(day);
    //po stlačení dátumu na kalendári,ergo pri stlačení soboty vratí 5ku čo je nepochopitelné lebo sa to zrazu dojebe a vráti piatok

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
  }, [selectedSubject, id_teacher, selectedDate]);

  useEffect(() => {
    fetch(`http://localhost:8080/prehladPredmetov/predmetyUcitel/${id_teacher}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to retrieve data");
        }
        return r.json();
      })
      .then((d) => {
        const names = [...new Set(d.map((subject) => subject.nazov_predmetu))];
        setSubjectNames(["Všetky predmety", ...names]);
      })
      .catch((e) => console.error(e));
  }, [id_teacher]);

  /* const handleClick = (id_predmet, datum, skupina, nazov_predmetu) => {
    navigate("/teacherAttendanceOverview", {
      state: { id_predmet, datum, skupina, nazov_predmetu },
    });
  }; */

  const studnetsTemplate = (row) => {
    const handleClick = (id_predmet, datum, skupina, nazov_predmetu) => {
      navigate("/teacherAttendanceOverview", {
        state: { id_predmet, datum, skupina, nazov_predmetu },
      });
    };

    return (
      <span
        /* href="/teacherAttendanceOverview" */
        onClick={() =>
          handleClick(
            row.id_predmet,
            new Date().toISOString().slice(0, 10),
            row.skupina,
            row.nazov_predmetu
          )
        }
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          color: "blue",
        }}
      >
        Zoznam študentov/status
      </span>
    );
  };

  return (
    <>
      <div className="mr-1 ml-1 mt-3">
        <div className="flex flex-column lg:flex-row lg:justify-content-around justify-content-center ">
          <div className="w-full lg:w-16rem mb-3">
            <Dropdown
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              options={subjectNames}
              className="w-full"
            />
          </div>
          <div className="w-full lg:w-16rem mb-3">
            {/* <Calendar
              value={selectedDate}
              onChange={(date) => setSelectedDate(date.value)}
              className="w-full"
            /> */}
            {/* <Calendar
              value={selectedDate}
              onChange={(date) => {
                const newDate = new Date(date.value);
                newDate.setDate(newDate.getDate() + 1);
                setSelectedDate(newDate);
              }}
              className="w-full"
            /> */}
            <Calendar
              value={selectedDate}
              onChange={(date) => setSelectedDate(addDays(date.value, 1))}
              className="w-full"
            />
          </div>
        </div>
        {subjects.length === 0 ? (
          <div className="noDataMessage">
            <p>Pre zvolený deň neexistuje záznam</p>
          </div>
        ) : (
          <div className="m-4">
            <DataTable stripedRows value={subjects}>
              <Column field="nazov_predmetu" header="Predmet"></Column>
              <Column field="den" header="Deň"></Column>
              <Column field="skupina" header="Skupina"></Column>
              <Column field="cas" header="Čas"></Column>
              <Column
                /* field="status" */
                header="Zoznam študentov + status"
                body={studnetsTemplate}
              />
            </DataTable>
          </div>
        )}
      </div>
    </>
  );
};

export default TeacherOverviewPage;

/*  <div className="d-flex justify-content-center">
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
                        onClick={() =>
                          handleClick(
                            row.id_predmet,
                            new Date().toISOString().slice(0, 10),
                            row.skupina,
                            row.nazov_predmetu
                          )
                        }
                      >
                        Zoznam študentov/status
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
                      )} */
