import React from "react";


import blog from "../assets/Blog.png";

const Header = () => {
  return (
    <>
      <div className="flex items-center m-2.7">
        {/* โลโก้ */}
        <img
          src={blog} // เปลี่ยนเป็น path ของไฟล์โลโก้ที่คุณต้องการ
          alt="Logo"
          className="h-12 w-14 mr-4" // ปรับขนาดและระยะห่าง
        />
        {/* ชื่อเว็บไซต์ */}
        <p className="text-2xl font-bold text-[#9EDF9C] "></p>
      </div>
    </>
  );
};

export default Header;
