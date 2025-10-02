import React from "react";
import { useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function MyEnrollCourses() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
     console.log(userData)
  return (
    <div className="min-h-screen w-full px-4 py-9 bg-gray-50">
      {/* Back button */}
      {/* < IoArrowBack
        className="absolute top-[3%] md:top-[6%] left-[5%] w-[30px] h-[30px] cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Page heading */}
      {/* <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">
        My Enrolled Courses
      </h1> */}

      <IoArrowBack
  className="absolute top-[3%] md:top-[6%] left-[5%] w-[30px] h-[30px] cursor-pointer"
  onClick={() => navigate("/")}
/>

{/* Page heading */}
<h1 className="text-xl sm:text-2xl md:text-3xl text-center font-bold text-gray-800 mb-6">
  My Enrolled Courses
</h1>


      {userData?.enrolledCourses?.length === 0 ? (
        <p className="text-gray-500 text-center w-full">
          You haven't enrolled in any courses yet
        </p>
      ) : (
        <div className="flex items-center justify-center flex-wrap gap-6">
          {userData?.enrolledCourses?.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden border w-72 flex flex-col"
            >
              {/* Thumbnail */}
              <img
                src={course?.thumbnail}
                alt={course?.title}
                className="w-full h-40 object-cover"
              />

              {/* Course Info */}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {course?.title}
                </h2>
                <p className="text-sm text-gray-600">{course?.category}</p>
                <p className="text-sm text-gray-600 mb-3">{course?.level}</p>

                {/* Watch Now Button */}
                <button
                  onClick={() => navigate(`/viewlecture/${course._id}`)}
                  className="mt-auto px-4 py-2 border-2 bg-black border-black text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-700 transition"
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEnrollCourses;
