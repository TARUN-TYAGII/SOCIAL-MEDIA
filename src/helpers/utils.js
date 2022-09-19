export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let keyencoded = encodeURIComponent(property);
    let valueencoded = encodeURIComponent(params[property]);

    formBody.push(keyencoded + "=" + valueencoded);
  }

  return formBody.join("&");
}

export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem("token");
}
