import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice.js";
import { toast } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
const Nav = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true
      });
      navigate("/login");
      dispatch(setUserData(null));

      toast.success(result.response.data);
    } catch (error) {
      console.log(error);
      toast.error("Logot Successfully");
    }
  };
  return (
    <div>
      <div className="w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10">
        <div className="lg:w-[20%] w-[40%] lg:pl-[30px] ">
          <img
            src={logo}
            className="w-[60px]  rounded-[5px] border-2 border-white "
          />
        </div>
        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden">
          {!userData && (
            <IoPersonCircleSharp
              className="w-[50px] h-[50px] fill-black cursor-pointer "
              onClick={() => setShow((prev) => !prev)}
            />
          )}
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              className="w-[50px] h-[50px] rounded-full flex items-center justify-center   border-2 bg-black border-white cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          ) : (
            <div
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center  text-[20px] border-2 bg-black border-white cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          )}

          {userData?.role === "educator" && (
            <div
              className="px-[20px] py-[10px] bg-[#693c7f] lg:text-white rounded-[10px] text-[18px] font-light  cursor-pointer fill-black border-2 border-white hover:bg-[#711f96] "
              onClick={() => navigate("/dashboard")}
            >
              {" "}
              DashBord
            </div>
          )}

          {!userData ? (
            <span
              className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#42369dd5] hover:bg-[#3728a7d5]"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#cf6666d5] hover:bg-[#cf4e4ed5]"
              onClick={handleLogOut}
            >
              Logout
            </span>
          )}

          {show && (
            <div className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md  px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer bg-[#352929]">
              <span
                className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 "
                onClick={() => navigate("/profile")}
              >
                My Profile
              </span>
              <span
                className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 "
                onClick={() => navigate("/mycourses")}
              >
                My Courses
              </span>
            </div>
          )}
        </div>
        <RxHamburgerMenu
          className="w-[35px] h-[35px] lg:hidden text-white cursor-pointer "
          onClick={() => setShowHam((prev) => !prev)}
        />
        <div
          className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center  justify-center flex-col gap-5 z-10 lg:hidden ${
            showHam
              ? "translate-x-[0] transition duration-600 "
              : "translate-x-[-100%] transition duration-600 "
          }`}
        >
          <RxCross1
            className="w-[35px] h-[35px] fill-white  absolute top-5 right-[4%] text-[white] cursor-pointer"
            onClick={() => setShowHam((prev) => !prev)}
          />

          {!userData && (
            <IoPersonCircleSharp className="w-[50px] h-[50px] fill-black cursor-pointer " />
          )}
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              className="w-[70px] h-[70px] rounded-full  flex items-center justify-center  border-2 bg-black border-white cursor-pointer"
            />
          ) : (
            <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center  text-[20px] border-2 bg-[#52ac34] border-white cursor-pointer">
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          )}

          <div
            className="w-[200px] border-2 bg-[#993a86]  h-[65px] text-white rounded-[10px] text-[18px] font-light    flex items-center justify-center   cursor-pointer hover:bg-[#981d7f]"
            onClick={() => navigate("/profile")}
          >
            {" "}
            My Profile
          </div>

          <div
            className="w-[200px] border-2 bg-[#3a995b]  h-[65px] text-white rounded-[10px] text-[18px] font-light    flex items-center justify-center   cursor-pointer hover:bg-[#129841]"
            onClick={() => navigate("/mycourses")}
          >
            {" "}
            My Courses
          </div>

          {userData?.role === "educator" && (
            <div
              className="w-[200px] bg-[#5d3a99] border-2   h-[65px] text-white rounded-[10px] text-[18px] font-light    flex items-center justify-center  cursor-pointer  hover:bg-[#6f0cc6]"
              onClick={() => navigate("/dashboard")}
            >
              {" "}
              DashBord
            </div>
          )}

          {!userData ? (
            <span
              className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#af46e3d5] hover:bg-[#932ec6d5]"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#a54d4dd5] hover:bg-[#be2e2ed5]"
              onClick={handleLogOut}
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
