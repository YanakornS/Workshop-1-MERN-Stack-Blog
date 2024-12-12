import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      {/* Background gradient ที่จะรองรับการแสดงผลทุกขนาดหน้าจอ */}
      <div className="bg-gradient-to-b from-[#8B5DFF] to-[#5A3DFF]">
        <Navbar />
      </div>

      {/* กำหนดให้เนื้อหาภายในเต็มความสูงของหน้าจอ */}
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#8B5DFF] to-[#5A3DFF]">
        
        {/* ส่วนของ main content */}
        <main className="flex-grow px-4 sm:px-6 lg:px-8"> {/* เพิ่ม padding สำหรับทุกขนาดหน้าจอ */}
          <Outlet />
        </main>
        
        {/* ส่วน footer */}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
