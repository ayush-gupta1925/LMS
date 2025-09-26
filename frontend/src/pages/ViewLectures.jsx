import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { FaCirclePlay } from "react-icons/fa6";

import { setLectureData } from "../redux/lectureSlice.js";
import { serverUrl } from "../App.jsx";

function ViewLectures() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);
  const { lectureData } = useSelector((state) => state.lecture);

  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);

  // Find the selected course
  const selectedCourse = courseData?.find((course) => course._id === courseId);

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

  // Initialize lectureData and selectedLecture
  useEffect(() => {
    if (selectedCourse?.lectures?.length > 0) {
      dispatch(setLectureData(selectedCourse.lectures));
      setSelectedLecture((prev) => prev || selectedCourse.lectures[0]);
    }
  }, [selectedCourse, dispatch]);

  // Fetch creator info
  useEffect(() => {
    if (!selectedCourse?.creator) return;
    const fetchCreator = async () => {
      try {
        const res = await axios.post(
          `${serverUrl}/api/course/creator`,
          { userId: selectedCourse.creator },
          { withCredentials: true }
        );
        setCreatorData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCreator();
  }, [selectedCourse]);

  // Guard: if course not found
  if (!selectedCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Course not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">
      {/* Left: Video Player */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        <h2 className="text-3xl font-bold flex items-center gap-4">
          <IoReturnUpBackOutline
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
          {selectedCourse?.title}
        </h2>
        <div className="mt-2 flex gap-4 text-sm text-gray-500">
          <span>Category: {selectedCourse?.category}</span>
          <span>Level: {selectedCourse?.level}</span>
        </div>
        <div className="aspect-video bg-black rounded-xl overflow-hidden mt-4">
          {selectedLecture?.videoUrl ? (
            <video
              src={selectedLecture.videoUrl}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Select a lecture
            </div>
          )}
        </div>
        <h2 className="mt-2 text-xl font-semibold">
          {selectedLecture?.lectureTitle}
        </h2>
      </div>

      {/* Right: Lecture List + Educator */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-4">All Lectures</h2>
        <div className="flex flex-col gap-3 mb-6">
          {lectureData?.length > 0 ? (
            lectureData.map((lecture, index) => (
              <button
                key={index}
                onClick={() => setSelectedLecture(lecture)}
                className={`flex justify-between p-3 rounded-lg border ${
                  selectedLecture?._id === lecture._id
                    ? "bg-gray-200 border-gray-500"
                    : "hover:bg-gray-50 border-gray-300"
                }`}
              >
                <span>{lecture.lectureTitle}</span>
                <FaCirclePlay />
              </button>
            ))
          ) : (
            <p>No lecture available</p>
          )}
        </div>

        {creatorData && (
          <div className="mt-4 border-t pt-4">
            <h3 className="font-semibold">Educator</h3>
            <div className="flex items-center gap-4">
              {creatorData?.photoUrl ? (
                <img
                  src={creatorData.photoUrl}
                  alt={creatorData?.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-lg font-semibold">
                  {creatorData?.name?.slice(0, 1).toUpperCase()}
                </div>
              )}

              <div>
                <h2 className="font-medium">{creatorData.name}</h2>
                <p className="text-sm text-gray-600">
                  {creatorData.description}
                </p>
                <p className="text-sm text-gray-600">{creatorData.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewLectures;
