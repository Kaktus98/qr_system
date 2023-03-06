export const setId = (id) => {
    return {
      type: 'SET_ID',
      payload: id,
    };
  };
  
  export const resetId = () => {
    return {
      type: 'RESET_ID',
    };
  };

  export const setRole = (role) => {
    return {
      type: 'SET_ROLE',
      payload: role,
    };
  };
  
  export const resetRole = () => {
    return {
      type: 'RESET_ROLE',
    };
  };