import * as errorActionTypes from "./errorActions-types";

export const showErrors = (err_msg) => (dispatch) => {
  dispatch({
    type: errorActionTypes.GET_ERRORS,
    payload: {
      err_msg,
    },
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: errorActionTypes.CLEAR_ERRORS });
};
