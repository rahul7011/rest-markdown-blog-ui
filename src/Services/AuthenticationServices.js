import axios from "axios";

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
  return token !== null && token != undefined;
}
function logout() {
  localStorage.removeItem("token");
}
// this function will tell whether we are already authenticated or not
const AuthenticationService = {
  isAuthenticated: isAuthenticated(),
  logout
};
export { AuthenticationService };
export default authAxios;
