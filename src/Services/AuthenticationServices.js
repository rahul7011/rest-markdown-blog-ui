import axios from "axios";
import { api } from "../api";

//for authentication process
const authAxios = axios.create();

authAxios.interceptors.request.use((config) => {
  const newConfig = config;
  const token = localStorage.getItem("token");
  newConfig.headers = {
    Authorization: `Token ${token}`,
  };
  return newConfig;
});

function isAuthenticated() {
  const token = localStorage.getItem("token");
  return token !== null && token !== undefined;
}
function logout() {
  localStorage.removeItem("token");
}
function login({ username, email, password }) {
  return axios
    .post(api.auth.login, {
      username,
      email,
      password,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.key); //saving it to the local storage
      return res;
    });
}

function SignUp({ username, email, password1, password2 }) {
  return axios
    .post(api.auth.register, {
      username,
      email,
      password1,
      password2
    })
    .then((res) => {
      localStorage.setItem("token", res.data.key); //saving it to the local storage
      return res;
    });
}

// this function will tell whether we are already authenticated or not
const AuthenticationService = {
  isAuthenticated: isAuthenticated(),
  logout,
  login,
  SignUp
};
export { AuthenticationService };
export default authAxios;
