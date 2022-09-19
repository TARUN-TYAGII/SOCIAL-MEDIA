import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  AUTHENTICATE_USER,
  LOGOUT,
  CLEAR_AUTH_STATE,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
} from "../actions/actionType";

const initialAuthState = {
  user: {},
  isLoggedIn: false,
  inProgress: false,
  error: null,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        inProgress: false,
        error: null,
      };
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: false,
      };
    case EDIT_USER_FAILED:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
