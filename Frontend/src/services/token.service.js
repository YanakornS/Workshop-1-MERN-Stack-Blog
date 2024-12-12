const getLocalAccessToken = () => {
  const user = getUser();
  console.log("Access Token:", user?.accessToken); // ตรวจสอบค่า accessToken ที่เก็บใน localStorage
  return user?.accessToken;
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user)); // เก็บข้อมูล user ใน localStorage
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user")); // ดึงข้อมูลจาก localStorage
};

const removeUser = () => {
  localStorage.removeItem("user"); // ลบข้อมูล user
};

const Tokenservice = {
  getLocalAccessToken,
  setUser,
  getUser,
  removeUser,
};

export default Tokenservice;
