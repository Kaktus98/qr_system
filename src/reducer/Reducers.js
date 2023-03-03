const initialState = {
    id_student: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ID_STUDENT':
        return {
          ...state,
          id_student: action.payload,
        };
      case 'RESET_ID_STUDENT':
        return {
          ...state,
          id_student: null,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;