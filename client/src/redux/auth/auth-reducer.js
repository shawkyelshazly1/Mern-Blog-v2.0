import * as authActions from "./authActions-types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: true,
  user_id: null,
  user_avatar: null,
};

const authReducer = function (state = initialState, action) {
  switch (action.type) {
    case authActions.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case authActions.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user_id: action.payload.id,
        user_avatar: action.payload.avatar,
      };
    case authActions.REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case authActions.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.token,
        user_avatar: action.payload.avatar,
      };
    case authActions.AUTH_ERROR:
    case authActions.LOGIN_FAIL:
    case authActions.LOGOUT_SUCCESS:
    case authActions.REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user_id: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default authReducer;
