import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
function Profile() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative">
        <div className="w-[45px] h-[35px] hover:bg-[#a8e8a8] flex items-center justify-center rounded-lg">
          <IoArrowBack
            className=" w-[28px] h-[28px] cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="flex flex-col items-center text-center">
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              className="w-24 h-24 rounded-full object-cover border-4 border-[black] "
            />
          ) : (
            <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] boreder-2 bg-black border-white">
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          )}

          <h2 className="text-2xl font-bold mt-4 text-gray-800 ">
            {userData.name}
          </h2>
          <p className="text-[15px] text-gray-500 ">{userData.role}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="text-[17px] flex items-center justify-start gap-2">
            <span className="font-semibold text-gray-700 ">Email : </span>
            <span>{userData.email}</span>
          </div>

          <div className="text-[17px] flex items-center justify-start gap-2">
            <span className="font-semibold text-gray-700 ">Bio : </span>
            <span>{userData.description}</span>
          </div>

          <div className="text-[17px] flex items-center justify-start gap-2">
            <span className="font-semibold text-gray-700 ">
              Enrolled Corses :{" "}
            </span>
            <span>{userData.enrolledCourses.length}</span>
          </div>
        </div>

        <div
          className="mt-6 flex justify-center gap-4"
          onClick={() => navigate("/editprofile")}
        >
          <button className="px-5 py-2 rounded bg-[#1b2851] text-white active:bg-[#4b4b4b] cursor-pointer transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
