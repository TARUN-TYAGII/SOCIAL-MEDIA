const API_ROOT = "https://codeial.codingninjas.com:8000/api/v2";

export const APIUrls = {
  login: () => `${API_ROOT}/users/login`,
  signUp: () => `${API_ROOT}/users/signup`,
  editProfile: () => `${API_ROOT}/users/edit`,
  userProfile: (userId) => `${APIUrls}/users/${userId}`,
  fetchPosts: (page = 1, limit = 10) =>
    `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  userFriends: () => `${API_ROOT}/friendship/fetch_user_friends`,
  addFriend: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  removeFriend: (userId) =>
    `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
  createPOST: () => `${APIUrls}/posts/create`,
};
