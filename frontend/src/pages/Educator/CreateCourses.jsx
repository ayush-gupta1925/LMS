import React, { useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { serverUrl } from "../../App.jsx";

function CreateCourses() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCreateCourse = async () => {
    setLoading(true);
    try {
      await axios.post(
        serverUrl + "/api/course/create",
        { title, category },
        { withCredentials: true }
      );

      navigate("/courses");
      setLoading(false);
      toast.success("Course Created");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Create course error");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md rounded-md mt-10 relative">
        <div
          className="w-[45px] h-[35px] hover:bg-[#a8e8a8] flex items-center justify-center rounded-lg absolute top-[5%] left-[4%]"
          onClick={() => navigate("/courses")}
        >
          <IoReturnUpBackOutline className=" w-[28px] h-[28px] cursor-pointer text-[#23234d]" />
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#63ad50] ">
          Create Course
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter Course Title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="">
            <label
              htmlFor="cat"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Category
            </label>
            <select
              id="cat"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value=""> Select Category</option>
              <option value="APP Development">APP Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="DATA Science">DATA Science</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI/UX Designing">UI/UX Designing</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <button
            className="w-full bg-[#873ba2] text-white  py-2 px-4 rounded-md active:bg-[#9011c7] transition cursor-pointer"
            disabled={loading}
            onClick={handleCreateCourse}
          >
            {" "}
            {loading ? <ClipLoader size={30} color="white" /> : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourses;
