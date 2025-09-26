import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import getCreatorCourse from "../../customHooks/getCreatorCourse.js";
function Dashboard() {
  getCreatorCourse();

  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { creatorCourseData } = useSelector((state) => state.course);

  const CourseProgressData =
    creatorCourseData?.map((course) => ({
      name: course.title?.slice(0, 10) + "...",
      lectures: course.lectures?.length || 0
    })) || [];

  const EnrollData =
    creatorCourseData?.map((course) => ({
      name: course.title?.slice(0, 10) + "...",
      enrolled: course.enrolledStudents?.length || 0
    })) || [];

  const totalEarning =
    creatorCourseData?.reduce((sum, course) => {
      const studentCount = course.enrolledStudents?.length || 0;
      const courseRevenue = course.price ? course.price * studentCount : 0;

      return sum + courseRevenue;
    }, 0) || 0;

  return (
    <div className="flex in-h-screen bg-gray-100">
      <div
        className="w-[45px] h-[35px] hover:bg-[#f0f5de] flex items-center justify-center rounded-lg absolute top-[5%] left-[5%]"
        onClick={() => navigate("/")}
      >
        <IoArrowBack className=" w-[28px] h-[28px] cursor-pointer" />
      </div>

      <div className="w-full px-6 py-10 bg-gray-50  space-y-10 ">
        {/* main section */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row  items-center gap-6">
          <img
            src={userData?.photoUrl || userData?.name.slice(0, 1).toUpperCase()}
            className="w-28 h-28 rounded-full  object-cover border-2 border-black shadow-md"
          />
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl font-bold  text-gray-800">
              Welcome , {userData?.name || "Educator"}
            </h1>
            <h3 className="text-xl font-bold  text-gray-600">
              Total Earning : ₹ {totalEarning.toLocaleString()}
            </h3>
            <h4 className="text-gray-600 text-sm ">
              {userData?.description ||
                "Start Creating Courses for Your Students"}
            </h4>
            <h1
              className="px-[10px] text-center py-[10px] border-2 bg-[#7c53a2] border-black text-white items-center justify-center  cursor-pointer rounded-2xl"
              onClick={() => navigate("/courses")}
            >
              Create Courses
            </h1>
          </div>
        </div>

        {/* graph section  */}

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* for course progress graph  */}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">
              Course Progress (Lectures)
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CourseProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lectures" fill="#22C55E" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* enrolled students  */}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Student Enrollment</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={EnrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" fill="#22C55E" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
