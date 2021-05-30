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
function login({username,email,password}) {
  return (

    axios
    .post(api.auth.login, {
      username,
      email,
      password,
    })
    .then((res)=>{
      localStorage.setItem("token", res.data.key);    //saving it to the local storage
      return res;
    })
  )
}
// this function will tell whether we are already authenticated or not
const AuthenticationService = {
  isAuthenticated: isAuthenticated(),
  logout,
  login
};
export { AuthenticationService };
export default authAxios;
