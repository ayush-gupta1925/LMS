import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
export const serverUrl = "http://localhost:8000";

import { ToastContainer } from "react-toastify";
import getCurrentUser from "./customHooks/getCurrentUser.js";
import Profile from "./pages/Profile.jsx";
import { useDispatch, useSelector } from "react-redux";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Dashboard from "./pages/Educator/Dashboard.jsx";
import Courses from "./pages/Educator/Courses.jsx";
import CreateCourses from "./pages/Educator/CreateCourses.jsx";
import getCreatorCourse from "./customHooks/getCreatorCourse.js";
import EditCourses from "./pages/Educator/EditCourses.jsx";
import getPublishedCourses from "./customHooks/getPublishedCourses.js";
import AllCourses from "./pages/AllCourses.jsx";
import CreateLecture from "./pages/Educator/CreateLecture.jsx";
import EditLecture from "./pages/Educator/EditLecture.jsx";
import ViewCourse from "./pages/ViewCourse.jsx";
import ScrollToTop from "./component/ScrollToTop.jsx";
import ViewLectures from "./pages/ViewLectures.jsx";
import MyEnrollCourses from "./pages/MyEnrollCourses.jsx";
import getAllReviews from "./customHooks/getAllReviews.js";
import SearchWithAI from "./pages/SearchWithAI.jsx";
import Ai from "./component/Ai.jsx";

function App() {
  getCurrentUser();
  getCreatorCourse();
  getPublishedCourses();
  getAllReviews();
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to={"/signup"} />}
        />

        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/dashboard"
          element={
            userData?.role === "educator" ? (
              <Dashboard />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />

        <Route
          path="/courses"
          element={
            userData?.role === "educator" ? (
              <Courses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />

        <Route
          path="/createcourses"
          element={
            userData?.role === "educator" ? (
              <CreateCourses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />

        <Route
          path="/editcourses/:courseId"
          element={
            userData?.role === "educator" ? (
              <EditCourses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />

        <Route
          path="/allcourses"
          element={userData ? <AllCourses /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/createlecture/:courseId"
          element={
            userData?.role === "educator" ? (
              <CreateLecture />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />

        <Route
          path="/editlecture/:courseId/:lectureId"
          element={
            userData?.role === "educator" ? (
              <EditLecture />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />

        <Route
          path="/viewcourse/:courseId"
          element={userData ? <ViewCourse /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/viewlecture/:courseId"
          element={userData ? <ViewLectures /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/mycourses"
          element={userData ? <MyEnrollCourses /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/search"
          element={userData ? <SearchWithAI /> : <Navigate to={"/signup"} />}
        />
      </Routes>
      <Ai/>
    </>
  );
}

export default App;
