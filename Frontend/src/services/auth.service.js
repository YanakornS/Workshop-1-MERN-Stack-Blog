import api from "./api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const register = async (username, password) => {
  return await api.post(BASE_URL + "/register", { username, password });
};

const login = async (username, password) => {
  const response = await api.post(`${AUTH_API}/signin`, { username, password });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data)); // Store user data
  }
  return response;
};

const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
