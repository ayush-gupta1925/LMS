import React from "react";
import Nav from "../component/Nav.jsx";
import home from "../assets/home1.jpg";
import { FaGooglePlay } from "react-icons/fa";
import ai from "../assets/ai.png";
import ail from "../assets/SearchAi.png";
import Logo from "../component/Logo.jsx";
import ExploreCourses from "../component/ExploreCourses.jsx";
import CardPage from "../component/CardPage.jsx";
import { useNavigate } from "react-router-dom";
import About from "../component/About.jsx";
import Footer from "../component/Footer.jsx";
import ReviewPage from "../component/ReviewPage.jsx";
import getPublishedCourses from "../customHooks/getPublishedCourses.js";
import getAllReviews from "../customHooks/getAllReviews.js";
function Home() {
  getPublishedCourses();
  getAllReviews();

  const navigate = useNavigate();

  return (
    <div className="w-[100%] overflow-hidden">
      <div className="w-[100%] lg:h-[140vh] h-[70vh] relative">
        <Nav />

        <img
          src={home}
          className="object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]"
        />

        <span className="lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px] ">
          Grow Your Skills to Adcance
        </span>
        <span className="lg:text-[60px] absolute md:text-[35px] lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold text-[16px] ">
          Your Career Path
        </span>
        <div className="absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap">
          <button
            className="px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black wtext-[18px] font-light flex gap-2 cursor-pointer rounded-[10px]"
            onClick={() => navigate("/allcourses")}
          >
            {" "}
            View All courses{" "}
            <FaGooglePlay className="w-[23px] h-[25px] lg:fill-white  fill-black " />
          </button>
          <button
            className="px-[20px] py-[10px] border-2 lg:bg-white bg-black lg:text-black text-white  text-[18px] font-light flex gap-2 cursor-pointer rounded-[10px]"
            onClick={() => navigate("/search")}
          >
            Search with AI{" "}
            <img
              src={ai}
              alt="AI Icon"
              className="w-[30px] h-[30px] rounded-full hidden lg:block"
            />
            <img
              src={ail}
              alt="AI Icon"
              className="w-[30px] h-[30px] rounded-full lg:hidden"
            />
          </button>
        </div>
      </div>
      <Logo />
      <ExploreCourses />
      <CardPage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  );
}

export default Home;
