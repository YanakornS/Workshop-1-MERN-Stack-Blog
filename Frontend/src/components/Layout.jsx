import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#8B5DFF] to-[#5A3DFF]">
        <Navbar />
      </div>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#8B5DFF] to-[#5A3DFF]">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;