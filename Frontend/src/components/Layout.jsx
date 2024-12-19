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
        <main className="flex-grow flex item-center justify-center container h-screen px-4 sm:px-6 lg:px-8 mt-auto">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
