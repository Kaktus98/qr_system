export const setIdStudent = (id_student) => {
    return {
      type: 'SET_ID_STUDENT',
      payload: id_student,
    };
  };
  
  export const resetIdStudent = () => {
    return {
      type: 'RESET_ID_STUDENT',
    };
  };