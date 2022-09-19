import { APIUrls } from "../helpers/urls";
import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
} from "./actionType";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFailed(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

export function startUserProfileSearch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileSearch());

    const url = APIUrls.userProfile(userId);
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Auhtorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("USER PROFILE", data);
        dispatch(userProfileSuccess(data.data.user));
      });
  };
}
