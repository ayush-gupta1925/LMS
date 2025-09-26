import React, { useEffect, useReducer, useRef, useState } from "react";
import img from "../../assets/empty.jpg";
import { MdEdit } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { IoArrowBack } from "react-icons/io5";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../App.jsx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice.js";

function EditCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);
  const [isPublished, setIsPublished] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { courseId } = useParams();
  const thumb = useRef();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [frontendImage, setFrontendImage] = useState(img);
  const [backendImage, setBackendImage] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const getCurrentById = async () => {
    try {
      const result = await axios.get(
        serverUrl + `/api/course/getcourse/${courseId}`,
        { withCredentials: true }
      );
      setSelectedCourse(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("subTitle", subTitle);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("category", category); // ✅

    formData.append("isPublished", isPublished);
    formData.append("thumbnail", backendImage);

    try {
      const result = await axios.post(
        serverUrl + `/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      );
      const updateData = result.data;
      if (updateData.isPublished) {
        const updateCourses = courseData.map((c) =>
          c._id === courseId ? updateData : c
        );

        if (!courseData.some((c) => c._id === courseId)) {
          updateCourses.push(updateData);
        }
        dispatch(setCourseData(updateCourses));
      } else {
        const filterCourse = courseData.filter((c) => c._id !== courseId);
        dispatch(setCourseData(filterCourse));
        dispatch(setCourseData(filterCourse));
      }

      navigate("/courses");
      setLoading(false);
      toast.success("Course Updated");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Course Updated Error");
    }
  };

  const handleRemoveCourse = async () => {
    setLoading1(true);
    try {
      const result = await axios.delete(
        serverUrl + `/api/course/remove/${courseId}`,
        {
          withCredentials: true
        }
      );
      const filterCourse = courseData.filter((c) => c._id !== courseId);
      dispatch(setCourseData(filterCourse));

      navigate("/courses");
      setLoading1(false);
      toast.success("Course Deleted Successfully");
    } catch (error) {
      console.log(error);
      setLoading1(false);
      toast.success("Course Deleted Error");
    }
  };

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title || "");
      setSubTitle(selectedCourse.subTitle || "");
      setDescription(selectedCourse.description || "");
      setCategory(selectedCourse.category || ""); // ✅ fixed spelling
      setPrice(selectedCourse.price || "");
      setLevel(selectedCourse.level || "");
      setFrontendImage(selectedCourse.thumbnail || img);
      setIsPublished(selectedCourse.isPublished);
    }
  }, [selectedCourse]); // ✅ runs whenever selectedCourse changes

  useEffect(() => {
    getCurrentById();
  }, []);
  return (
    <div className=",ax-w-5xl mx-auto p-6 mt-10 bg-shite rounded-lg shadow-md md:w-[70%] w-full">
      {/* top baar */}
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0 mb-6 relative">
  {/* Left Section (Back + Heading) */}
  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 w-full md:w-auto text-center md:text-left">
   <div
  className="flex items-center gap-1 sm:gap-2 w-max h-10 sm:h-[35px] px-2 sm:px-3 bg-[#e0f7e0] hover:bg-[#a8e8a8] rounded-lg cursor-pointer"
  onClick={() => navigate("/courses")}
>
  <IoArrowBack className="w-5 h-5 sm:w-6 sm:h-6 text-[#0b0b70]" />
  <span className="text-sm sm:text-base font-medium text-[#0b0b70]">Back</span>
</div>

    <h2 className="text-lg sm:text-2xl font-semibold text-[#9147c2]">
      All Details Information Regarding the Course
    </h2>
  </div>

  {/* Right Section (Button) */}
  <div className="w-full sm:w-auto flex justify-center md:justify-start mt-2 md:mt-0">
    <button
      className="bg-[#9456b7] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base"
      onClick={() => navigate(`/createlecture/${selectedCourse?._id}`)}
    >
      Go to Lecture Page
    </button>
  </div>
</div>


      {/* form detail pages */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>
        <div className="space-x-2 space-y-2">
          {!isPublished ? (
            <button
              className="bg-[#c3d0f5] text-[#1212e1]  px-4 py-2 rounded-md boreder-1 cursor-pointer"
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to Publish
            </button>
          ) : (
            <button
              className="bg-[#c3d0f5] text-[#1212e1] px-4 py-2 rounded-md boreder-1 cursor-pointer "
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to UnPublish
            </button>
          )}

          <button
            className="bg-[#d52d2d] text-[#181819] px-4 py-2 rounded-md boreder-1 mb-8 cursor-pointer"
            onClick={handleRemoveCourse}
            disabled={loading1}
          >
            {" "}
            {loading1 ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Remove Course"
            )}
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Course Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
             
            />
          </div>

          <div>
            <label
              htmlFor="subtitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              SubTitle
            </label>
            <input
              type="text"
              id="subtitle"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Course Title"
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
              required
            />
          </div>

          <div>
            <label
              htmlFor="des"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              type="text"
              id="des"
              className="w-full border px-4 py-2 rounded-md resize-none h-24"
              placeholder="Course Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {/* for cateogry */}
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor=""
              >
                Course Category
              </label>
              <select
                name=""
                id=""
                className="w-full border px-4 py-2 rounded-md bg-white"
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
            {/* for level */}
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="level"
                
              >
                Course Level
              </label>
              <select
                name=""
                id="level"
                className="w-full border px-4 py-2 rounded-md bg-white"
                onChange={(e) => setLevel(e.target.value)}
                value={level}
                required
              >
                <option value=""> Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            {/* for price */}
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="price"
              >
                Course Price (INR)
              </label>

              <input
                type="number"
                name=""
                id="price"
                className="w-full border px-4 py-2 rounded-md"
                placeholder="₹"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Thumbnail
            </label>

            <input
              type="file"
              hidden
              ref={thumb}
              accept="image/*"
              onChange={handleThumbnail}
            />
          </div>
          <div className="relative w-[300px] h-[170px]">
            <img
              src={frontendImage}
              onClick={() => thumb.current.click()}
              className="w-[100%] h-[100%] border-1 border-black rounded-[5px] cursor-pointer"
            />
            <MdEdit
              className="w-[20px] h-[20px] absolute top-2 right-2 cursor-pointer text-[#3c25e8]"
              onClick={() => thumb.current.click()}
            />
          </div>

          <div className="flex items-center justify-start gap-[15px]">
            <button
              className="bg-[#e9e8e8] hover:bg-red-200  text-black border-1 border-black cursor-pointer px-4 py-2 rounded-md"
              onClick={() => navigate("/courses")}
            >
              Cancel
            </button>
            <button
              className="bg-[#3d8811] text-white px-7 py-2 rounded-md hover:bg-[#44a30d] cursor-pointer"
              disabled={loading}
              onClick={handleEditCourse}
            >
              {" "}
              {loading ? <ClipLoader size={30} color="white" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourses;
