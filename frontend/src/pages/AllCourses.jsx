import React, { useEffect, useState } from "react";
import Nav from "../component/Nav.jsx";
import ai from "../assets/SearchAi.png";
import { IoReturnUpBackOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../component/Card.jsx";

function AllCourses() {
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((c) => c !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let courseCopy = courseData?.slice();
    if (category.length > 0) {
      courseCopy = courseCopy.filter((c) => category.includes(c.category));
    }
    setFilterCourses(courseCopy);
  };

  useEffect(() => {
    setFilterCourses(courseData);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Nav />

      <button
        className="fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black "
        onClick={() => setIsSidebarVisible((prev) => !prev)}
      >
        {isSidebarVisible ? "Hide" : "Show"}
      </button>

      {/* side baar */}

      <aside
        className={`w-[260px] h-screen overflow-y-auto bg-[#37a6c2] fixed top-0 left-0 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5 p-[13px] ${
          isSidebarVisible ? "translate-x-0" : " -translate-x-full"
        } md:block md:translate-x-0`}
      >
        <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6">
          {" "}
          <div className="w-[45px] h-[35px] hover:bg-[#a8e8a8] flex items-center justify-center rounded-lg ">
            <div
              className="w-[37px] h-[30px] bg-[#8ad18a] rounded-lg pt-[1px] pl-[3px] cursor-pointer"
              onClick={() => navigate("/")}
            >
              <IoReturnUpBackOutline className=" w-[28px] h-[28px] cursor-pointer text-[#0b0b70]" />
            </div>
          </div>
          <span className="text-[#3e3939]">Filter By Cateogry</span>
        </h2>

        <form
          className="space-y-4 text-sm bg-[#468797] border-white text-[white] border
    p-[20px] rounded-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <button
            className="px-[10px] py-[10px]
           bg-[#180945] text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2"
            onClick={() => navigate("/search")}
          >
            {" "}
            Search with AI{" "}
            <img src={ai} className=" w-[30px] h-[30px] rounded-full " />
          </button>

          <label
            htmlFor="APP"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              id="APP"
              className="accent-black w-4 h-4 rounded-md"
              value={"APP Development"}
              onChange={toggleCategory}
            />{" "}
            APP Development
          </label>

          <label
            htmlFor="AI/ML"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              id="AI/ML"
              className="accent-black w-4 h-4 rounded-md"
              value={"AI/ML"}
              onChange={toggleCategory}
            />{" "}
            AI/ML
          </label>

          <label
            htmlFor="DATAScience"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              id="DATAScience"
              className="accent-black w-4 h-4 rounded-md"
              value={"DATA Science"}
              onChange={toggleCategory}
            />{" "}
            DATA Science
          </label>

          <label
            htmlFor="EthicalHacking"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              id="EthicalHacking"
              className="accent-black w-4 h-4 rounded-md"
              value={"Ethical Hacking"}
              onChange={toggleCategory}
            />{" "}
            Ethical Hacking
          </label>

          <label
            htmlFor="UI/UXDesigning"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              id="UI/UXDesigning"
              className="accent-black w-4 h-4 rounded-md"
              value={"UI/UX Designing"}
              onChange={toggleCategory}
            />
            UI/UX Designing
          </label>

          <label
            htmlFor="WebDevelopment"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              id="WebDevelopment"
              className="accent-black w-4 h-4 rounded-md"
              value={"Web Development"}
              onChange={toggleCategory}
            />{" "}
            Web Development
          </label>

          {/* <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox" id=""
              className="accent-black w-4 h-4 rounded-md" value={"UI/UX Designing"} onChange={toggleCategory}
            />{" "} 
            UI/UX Designing
          </label> */}

          <label
            htmlFor="DataAnalytics"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              id="DataAnalytics"
              className="accent-black w-4 h-4 rounded-md"
              value={"Data Analytics"}
              onChange={toggleCategory}
            />{" "}
            Data Analytics
          </label>

          <label
            htmlFor="Others"
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              type="checkbox"
              id="Others"
              className="accent-black w-4 h-4 rounded-md"
              value={"Others"}
              onChange={toggleCategory}
            />
            Others
          </label>
        </form>
      </aside>

      <main className="w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]">
        {filterCourses?.map((course, index) => (
          <Card
            key={index}
            thumbnail={course.thumbnail}
            title={course.title}
            category={course.category}
            price={course.price}
            id={course._id}
            reviews={course.reviews}
          />
        ))}
      </main>
    </div>
  );
}

export default AllCourses;
