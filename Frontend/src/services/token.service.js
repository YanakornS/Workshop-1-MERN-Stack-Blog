import { Cookies } from "react-cookie";
const cookies = new Cookies();

const getLocalAccessToken = () => {
  const user = getUser();
  return user?.accessToken;
};
console.log("Access Token:", user?.accessToken); // ตรวจสอบค่า accessToken ที่เก็บใน localStorage
const getUser = () => {
  const user = cookies.get("user");
  return user;
};

const removeUser = () => {
  cookies.remove("user", { path: "/" });
};

const setUser = (user) => {
  cookies.set("user", JSON.stringify(user), {
    path: "/",
    expires: new Date(Date.now() + 86400),
  });
};
const TokenService = {
  getLocalAccessToken,
  setUser,
  getUser,
  removeUser,
};

export default TokenService;
