import { APIUrls } from "../helpers/urls";
import { ADD_FRIEND, FETCH_FRIEND_SUCCESS, REMOVE_FRIEND } from "./actionType";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";

export function fetchFriendsSuccess(friends) {
  return {
    type: FETCH_FRIEND_SUCCESS,
    friends,
  };
}
export function fetchUserFriend(userId) {
  return (dispatch) => {
    const url = APIUrls.userFriends(userId);
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Auhtorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("FRIENDS", data);
        dispatch(fetchFriendsSuccess(data.data.friends));
      });
  };
}

export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}

export function removeFriend(userId) {
  return {
    type: REMOVE_FRIEND,
    userId,
  };
}
