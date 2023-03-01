import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";

const StudentOverview = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:8080/prehlad/2?den=Pondelok&nazov_predmetu=Ekonometria`
      );
      const json = await response.json();
      console.log(json);
      setData(json);
    }
    fetchData();
  });

  return (
    <>
      <Header />
      <table>
        <thead>
          <tr>
            <th>id_dochadzka</th>
            <th>meno</th>
            <th>priezvisko</th>
            <th>den</th>
            <th>nazov_predmetu</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <th>{row.id_dochadzka}</th>
              <td>{row.meno}</td>
              <td>{row.priezvisko}</td>
              <td>{row.den}</td>
              <td>{row.nazov_predmetu}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StudentOverview;
