import axios from "axios";
import React, { useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../App.jsx";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../redux/lectureSlice.js";
import { IoArrowBack } from "react-icons/io5";
function EditLecture() {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const { lectureData } = useSelector((state) => state.lecture);
  const dispatch = useDispatch();
  const selectedLecture = lectureData.find(
    (lecture) => lecture._id === lectureId
  );
  const [lectureTitle, setLectureTitle] = useState(
    selectedLecture?.lectureTitle || ""
  );
  const [videoUrl, setVideoUrl] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(
    selectedLecture?.isPreviewFree || false
  );

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const handleEditLecture = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("lectureTitle", lectureTitle);
    if (videoUrl) formData.append("videoUrl", videoUrl);
    // ✅ Only send isPreviewFree explicitly
    formData.append("isPreviewFree", isPreviewFree ? "true" : "false");

    try {
      const result = await axios.post(
        serverUrl + `/api/course/editlecture/${lectureId}`,
        formData,
        { withCredentials: true }
      );

      // ✅ Replace updated lecture instead of pushing duplicate
      const updatedLectures = lectureData.map((l) =>
        l._id === lectureId ? result.data : l
      );

      dispatch(setLectureData(updatedLectures));
      setLoading(false);
      navigate("/courses");
      toast.success("Lecture Updated Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Edit lecture error");
    }
  };

  const removeLecture = async () => {
    setLoading1(true);
    try {
      await axios.delete(serverUrl + `/api/course/removelecture/${lectureId}`, {
        withCredentials: true
      });

      setLoading1(false);
      navigate(`/createLecture/${courseId}`);

      toast.success("Lecture Deleted Successfully");
    } catch (error) {
      console.log(error);
      setLoading1(false);
      toast.error("deleted lecture error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* header  */}
        <div className="flex items-center gap-4 mb-2">
          <IoArrowBack
            className="text-gray-600 cursor-pointer text-[30px]"
            onClick={() => navigate(`/createlecture/${courseId}`)}
          />
          <h2 className="text-xl font-semibold text-center">
            Update Course Lecture
          </h2>
        </div>

        <button
          className="mt-2 px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm cursor-pointer"
          onClick={removeLecture}
          disabled={loading1}
        >
          {loading1 ? <ClipLoader size={30} color="white" /> : "Remove Lecture"}
        </button>

        <div className="space-y-4 ">
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lecture Title
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[black] focus:outline-none  "
              required
              onChange={(e) => setLectureTitle(e.target.value)}
              value={lectureTitle}
            />
          </div>

          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Video
            </label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:bg-gray-700 file:text-[white] hover:file:bg-gray-500 file:rounded-md"
              required
              accept="video/*"
              onChange={(e) => setVideoUrl(e.target.files[0])}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="accent-[black] h-4 w-4"
              id="isFree"
              onChange={() => setIsPreviewFree((prev) => !prev)}
              checked={isPreviewFree} // ✅ linked with state
            />
            <label htmlFor="isFree" className="text-sm text-gray-700 ">
              Is this Video FREE ?
            </label>
          </div>
        </div>

        {loading ? <p>Uplaoding Video ... Please Wait.</p> : ""}

        <div className="pt-4">
          <button
            className="w-full bg-[#8f23ad] text-white rounded-md text-sm font-medium py-3 hover:bg-[#b43dce] transition"
            onClick={handleEditLecture}
            disabled={loading}
          >
            {" "}
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Update Lecture"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditLecture;
