import {
  ADD_FRIEND,
  FETCH_FRIEND_SUCCESS,
  REMOVE_FRIEND,
} from "../actions/actionType";

const defaultProfileState = [];

export function friends(state = defaultProfileState, action) {
  switch (action.type) {
    case FETCH_FRIEND_SUCCESS:
      return [...action.friends];
    case ADD_FRIEND:
      return state.concat(action.friend);
    case REMOVE_FRIEND:
      const newArray = state.filter(
        (friend) => friend.to_user._id !== action.userId
      );
      return newArray;
    default:
      return state;
  }
}
