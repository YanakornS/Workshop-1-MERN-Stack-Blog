import React from "react";
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";

//Import รูปเข้ามา
import Logout from "../assets/logout.png";
import Profiles from "../assets/profiles.png";

const UserProfile = () => {
  const { logout } = useAuthContext(); // ดึงฟังก์ชัน logout จาก context
  const navigate = useNavigate(); // ใช้ navigate เพื่อเปลี่ยนเส้นทาง

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // เรียกใช้ฟังก์ชัน logout
        navigate("/Login"); // ใช้ navigate เพื่อเปลี่ยนเส้นทางไปที่หน้า Login
        Swal.fire("Logged Out", "You have been logged out.", "success");
      }
    });
  };

  return (
    <div className="relative">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar border border-gray-300 rounded-full p-1 relative"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              alt="User Avatar"
              src="https://cdn-icons-png.freepik.com/512/7718/7718888.png"
            />
          </div>
          {/* Green Dot */}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-white border border-gray-200 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
        >
          <li>
            <Link
              to="/userprofile"
              className="flex items-center justify-between text-[#007BFF] hover:bg-[#F0F4FF] px-4 py-2 rounded-md"
            >
              Profile
              <img src={Profiles} alt="Profiles Icon" className="w-5 h-5" />
            </Link>
          </li>

          <li>
            <a
              className="text-[#FF4D4D] hover:bg-[#FFECEC] px-4 py-2 rounded-md"
              onClick={handleLogout}
            >
              Logout
              <img src={Logout} alt="Logout Icon" className="w-5 h-5" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
