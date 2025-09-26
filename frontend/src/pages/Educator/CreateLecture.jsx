import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../App.jsx";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
import { setLectureData } from "../../redux/lectureSlice.js";

function CreateLecture() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { lectureData } = useSelector((state) => state.lecture);

  const handleCreateLecture = async () => {
    setLoading(true);
    try {
      await axios.post(
        serverUrl + `/api/course/createlecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true }
      );

      // ✅ naya lecture create hone ke baad turant updated lectures fetch karo
      const updated = await axios.get(
        serverUrl + `/api/course/courselecture/${courseId}`,
        { withCredentials: true }
      );

      dispatch(setLectureData(updated.data.lectures || [])); // update redux

      setLectureTitle("");
      setLoading(false);
      toast.success("Lecture Created Successfully!");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Create Lecture Failed");
    }
  };

  // get course lectures
  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const result = await axios.get(
          serverUrl + `/api/course/courselecture/${courseId}`,
          { withCredentials: true }
        );

        // यहाँ पूरा course object आया है, lectures अंदर हैं
        dispatch(setLectureData(result.data.lectures || []));
      } catch (error) {
        console.log(error);
      }
    };
    getCourseLecture();
  }, [courseId, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-whte  shadow-xl rounded-xl w-full max-w-2xl p-6">
        {/* header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Let's Add a Lecture
          </h1>
          <p className="text-sm text-gray-500">
            Enter the title and add your video lectures to enhance your course
            content.
          </p>
        </div>

        {/* input area */}
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4"
          placeholder="e.g. Introduction to MERN Stack"
          onChange={(e) => setLectureTitle(e.target.value)}
          value={lectureTitle}
        />

        {/* button */}
        <div className="flex gap-4 mb-6">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-s, font-medium cursor-pointer"
            onClick={() => navigate(`/editcourses/${courseId}`)}
          >
            <IoReturnUpBackOutline />
            Back to Course
          </button>
          <button
            className="px-5 py-2 rounded-md bg-[#8d39f4] text-white hover:bg-[#9631cd] transition-all text-sm font-medium shadow cursor-pointer"
            onClick={handleCreateLecture}
            disabled={loading}
          >
            {" "}
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "+ Create Lecture"
            )}
          </button>
        </div>

        {/* lecture list  */}

        <div className="space-y-2">
          {lectureData?.map((lecture, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700"
            >
              <span>
                Lecture - {index + 1} : {lecture?.lectureTitle}
              </span>
              <FaEdit
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() =>
                  navigate(`/editlecture/${courseId}/${lecture._id}`)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;
