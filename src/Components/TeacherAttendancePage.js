import React from "react";
import { useLocation } from "react-router-dom";

const TeacherAttendancePage = () => {
  const { state } = useLocation();
  const { id_predmet, datum } = state;

  console.log(id_predmet);
  console.log(datum);

  return <div>TeacherAttendancePage</div>;
};

export default TeacherAttendancePage;
