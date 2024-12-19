import { Cookies } from "react-cookie";
const cookies = new Cookies();

const getLocalAccessToken = () => {
  const token = cookies.get("accesstoken"); // ดึงค่า token ตรงๆ จาก cookies
  return token;
};

// ฟังก์ชันเพื่อดึงข้อมูล user จาก cookies
const getUser = () => {
  const user = cookies.get("user");
  return user;
};

// ฟังก์ชันเพื่อเอา user ออกจาก cookies
const removeUser = () => {
  cookies.remove("user", { path: "/" });
};

// ฟังก์ชันเพื่อเก็บข้อมูล user ลงใน cookies
const setUser = (user) => {
  cookies.set("user", JSON.stringify(user), {
    path: "/",
    expires: new Date(Date.now() + 86400 * 1000),
  });
};

// ใช้ getLocalAccessToken เพื่อตรวจสอบค่า accessToken
console.log("Access Token:", getLocalAccessToken());

const TokenService = {
  getLocalAccessToken,
  setUser,
  getUser,
  removeUser,
};

export default TokenService;
