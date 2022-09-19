import { APIUrls } from "../helpers/urls";
import { getAuthTokenFromLocalStorage, getFormBody } from "../helpers/utils";
import {
  AUTHENTICATE_USER,
  LOGIN_FAILURE,
  LOGIN_START,
  LOGOUT,
  SIGNUP_FAILURE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  CLEAR_AUTH_STATE,
  LOGIN_SUCCESS,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
} from "./actionType";

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          //dispatch loginsuccess
          dispatch(loginSuccess(data.data.user));
        }

        dispatch(loginFailed(data.message));
      });
  };
}

//signup or Register

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupSuccessful(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILURE,
    error,
  };
}

export function signup(email, password, confirmPassword, name) {
  return (dispatch) => {
    dispatch(startSignup());
    const url = APIUrls.signUp();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({
        email,
        password,
        confirm_password: confirmPassword,
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          //dispatch loginsuccess
          localStorage.setItem("token", data.data.token);
          dispatch(signupSuccessful(data.data.user));
          return;
        }

        dispatch(signupFailed(data.message));
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function clearAuth() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function editUserSuccessful(user) {
  return {
    type: EDIT_USER_SUCCESS,
    user,
  };
}

export function editUserFailure(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}

export function editUser(name, password, confirmPassword, userId) {
  return (dispatch) => {
    const url = APIUrls.editProfile();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Auhtorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password: confirmPassword,
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("EDIT PROFILE", data);
        if (data.success) {
          dispatch(editUserSuccessful(data.data.user));

          if (data.data.token) {
            localStorage.setItem("token", data.data.token);
          }
          return;
        }

        dispatch(editUserFailure(data.message));
      });
  };
}
