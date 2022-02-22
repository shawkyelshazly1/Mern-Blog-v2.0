import * as errorActionTypes from "./errorActions-types";

const intitialState = {
  isError: false,
  err_msg: null,
};

const errorReducer = function (state = intitialState, action) {
  switch (action.type) {
    case errorActionTypes.GET_ERRORS:
      return { ...state, err_msg: action.payload.err_msg, isError: true };
    case errorActionTypes.CLEAR_ERRORS:
      return { ...state, err_msg: null, isError: false };
    default:
      return { ...state };
  }
};

export default errorReducer;
