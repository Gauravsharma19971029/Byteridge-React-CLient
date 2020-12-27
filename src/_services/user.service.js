 import config from "config";
import { baseUrl } from "../../config";
import { authHeader } from "../_helpers";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
  getAllAudit,
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${baseUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out

  const user = localStorage.getItem("user");
  if (user) {
    const username = JSON.parse(user).username;
    const auditId = JSON.parse(user).auditId;
    const headers = new Headers(authHeader());
    headers.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ auditId }),
    };

    fetch(`${baseUrl}/users/logout`, requestOptions)
      .then((res) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.removeItem("user");
      })
      .catch((err) => console.log("Error", err));
  }
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${baseUrl}/users`, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log("Error", err));
}

function getAllAudit(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${baseUrl}/users/audit`, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log("Error", err));
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${baseUrl}/users/${id}`, requestOptions)
    .then(handleResponse)
    .catch((err) => console.log("Error", err));
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${baseUrl}/users/register`, requestOptions).then(
    handleResponse
  );
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${baseUrl}/users/${user.id}`, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${baseUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
