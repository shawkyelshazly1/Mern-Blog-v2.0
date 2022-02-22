import axios from "axios";
import * as authActions from "./authActions-types";
import store from "../store";
import { showErrors, clearErrors } from "../error/error-actions";

//Try to fetch user if token is valid on each request
export const loadUser = () => (dispatch, getState) => {
  //dispatch user loading action
  dispatch({ type: authActions.USER_LOADING });

  axios
    .get("http://localhost:5000/api/users/auth", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: authActions.USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: authActions.AUTH_ERROR,
      });
    });
};

// logout User action
export const logoutUser = () => (dispatch) => {
  dispatch({ type: authActions.LOGOUT_SUCCESS });
};

//login user action
export const loginUser = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify(data);
  axios
    .post("http://localhost:5000/api/users/login", body, config)
    .then((res) => {
      store.dispatch(clearErrors());
      dispatch({ type: authActions.LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      store.dispatch(showErrors(err.response.data.error));
      dispatch({ type: authActions.LOGIN_FAIL });
    });
};

//register user action
export const registerUser = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify(data);
  axios
    .post("http://localhost:5000/api/users/register", body, config)
    .then((res) => {
      store.dispatch(clearErrors());
      dispatch({ type: authActions.REGISTER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      store.dispatch(showErrors(err.response.data.error));
      dispatch({ type: authActions.REGISTER_FAIL });
    });
};

//tokenConfig helper function
export const tokenConfig = (getState) => {
  //get token from state => from localStorage
  const token = getState().auth.token;

  //axios config object
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["authentication"] = `Bearer ${token}`;
  }

  return config;
};
