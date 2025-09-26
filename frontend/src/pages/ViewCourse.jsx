import React, { useEffect, useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import img from "../assets/empty.jpg";
import { MdOutlineStar } from "react-icons/md";
import { setSelectedCourse } from "../redux/courseSlice.js";
import { FaCirclePlay } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App.jsx";
import Card from "../component/Card.jsx";
import { toast } from "react-toastify";
import { setLectureData } from "../redux/lectureSlice.js";

function ViewCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const { courseData, selectedCourse } = useSelector((state) => state.course);
  const [creatorCourse, setCreatorCourse] = useState([]);
  const { userData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [fetchingCourse, setFetchingCourse] = useState(false); // separate spinner for initial fetch

  // 1) Fetch course + lectures as soon as page loads (or courseId changes)
  useEffect(() => {
    const fetchCourseWithLectures = async () => {
      try {
        setFetchingCourse(true);
        // backend endpoint you used earlier: /api/course/courselecture/:courseId
        const res = await axios.get(
          `${serverUrl}/api/course/courselecture/${courseId}`,
          { withCredentials: true }
        );

        // depending on backend shape, res.data might be course or { course, lectures }
        const courseObj = res.data.course || res.data; // flexible
        // dispatch selected course
        dispatch(setSelectedCourse(courseObj));
        // dispatch lectures (if lectures present)
        dispatch(setLectureData(courseObj.lectures || []));

        // automatically select first preview-free lecture if exists
        const firstPreview =
          (courseObj.lectures || []).find((l) => l.isPreviewFree) ||
          (courseObj.lectures || [])[0] ||
          null;
        setSelectedLecture(firstPreview);

        // if creator already present in courseObj, fetch creator details separately below (in other effect)
        setFetchingCourse(false);
      } catch (err) {
        setFetchingCourse(false);
        console.error("Error fetching course:", err);
        const msg = err?.response?.data?.message || "Failed to load course";
        toast.error(msg);
      }
    };

    if (courseId) {
      fetchCourseWithLectures();
    }
  }, [courseId, dispatch]);

  // 2) Fetch creator details whenever selectedCourse changes and has a creator
  useEffect(() => {
    const handleCreator = async () => {
      if (!selectedCourse) return;
      const creatorId = selectedCourse.creator?._id || selectedCourse.creator;
      if (!creatorId) return;

      try {
        const result = await axios.post(
          `${serverUrl}/api/course/creator`,
          { userId: creatorId },
          { withCredentials: true }
        );
        setCreatorData(result.data);
      } catch (error) {
        console.error("Error fetching creator:", error);
      }
    };
    handleCreator();
  }, [selectedCourse]);

  // 3) Build creatorCourse list (other courses by same creator)
  useEffect(() => {
    if (!creatorData) return;

    // if courseData (redux) has list of all courses, use it to filter (cheaper)
    if (Array.isArray(courseData) && courseData.length > 0) {
      const other = courseData.filter(
        (course) =>
          String(course.creator?._id || course.creator) ===
            String(creatorData._id) && String(course._id) !== String(courseId)
      );
      setCreatorCourse(other);
    } else {
      // fallback: try to fetch other courses by creator from backend if you have such endpoint
      // If you don't have an endpoint, leave creatorCourse empty for now.
      setCreatorCourse([]);
    }
  }, [creatorData, courseData, courseId]);

  // 4) Enrollment check: whenever userData or selectedCourse changes
  useEffect(() => {
    const verify = userData?.enrolledCourses?.some(
      (c) =>
        (typeof c === "string" ? c : c._id).toString() === courseId?.toString()
    );
    setIsEnrolled(Boolean(verify));
  }, [userData, selectedCourse, courseId]);

 // helper: average rating
const calculateAvgReview = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce(
    (sum, review) => sum + (review.rating || 0),
    0
  );
  return (total / reviews.length).toFixed(1);
};

const avgRating = calculateAvgReview(selectedCourse?.reviews);


  // submit review
  const handleReview = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/review/createreview`,
        { rating, comment, courseId },
        { withCredentials: true }
      );
      setLoading(false);
      setComment("");
      setRating(0);
      toast.success("Review Added");
      // optionally: refresh course reviews by re-fetching course/lectures
      // we'll re-fetch course quickly to update reviews UI
      try {
        const res = await axios.get(
          `${serverUrl}/api/course/courselecture/${courseId}`,
          { withCredentials: true }
        );
        const courseObj = res.data.course || res.data;
        dispatch(setSelectedCourse(courseObj));
        dispatch(setLectureData(courseObj.lectures || []));
      } catch (e) {
        // ignore refresh error
      }
    } catch (error) {
      setLoading(false);
      setComment("");
      setRating(0);
      const msg = error?.response?.data?.message || "Failed to submit review";
      toast.error(msg);
    }
  };

  // enroll handler with razorpay
  const handleEnroll = async (userId, courseId) => {
    try {
      const orderData = await axios.post(
        `${serverUrl}/api/order/razorpay-order`,
        { userId, courseId },
        { withCredentials: true }
      );
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        name: "VIRTUAL COURSES",
        description: "COURSE ENROLLMENT PAYMENT",
        order_id: orderData.data.id,
        handler: async function (response) {
          try {
            const verifyPayment = await axios.post(
              `${serverUrl}/api/order/verifypayment`,
              { ...response, courseId, userId },
              { withCredentials: true }
            );
            setIsEnrolled(true);
            toast.success(verifyPayment.data.message);
            // optionally refresh user/enrolled data here by calling user API or redux action
          } catch (error) {
            toast.error(
              error?.response?.data?.message || "Payment verification failed"
            );
          }
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while enrolling");
    }
  };

  // UI loader for initial fetch
  if (fetchingCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader size={50} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">
        {/* top Section  */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* thumbnail  */}
          <div className="w-full md:w-1/2">
            <div
              className="mb-[10px] h-[35px] w-[40px] bg-[#d8f5e3] rounded-lg pl-[4px] pt-[2px] hover:bg-[#c0f9d6] cursor-pointer"
              onClick={() => navigate("/")}
            >
              <IoReturnUpBackOutline className="text-[#1c0b39] w-[30px] h-[30px] cursor-pointer" />
            </div>

            {selectedCourse?.thumbnail ? (
              <img
                src={selectedCourse?.thumbnail}
                className="rounded-xl w-full object-cover h-[250px]"
                alt="thumbnail"
              />
            ) : (
              <img
                src={img}
                className="rounded-xl w-full object-cover"
                alt="placeholder"
              />
            )}
          </div>

          {/* course info  */}
          <div className="flex-1 space-y-2 mt-[45px]">
            <h2 className="text-2xl font-bold">{selectedCourse?.title}</h2>
            <p className="text-gray-600">{selectedCourse?.subTitle}</p>

            <div className="flex items-start flex-col justify-between">
              <div className="text-yellow-500 font-medium flex gap-2">
                <span className="flex items-center justify-start gap-1">
                  {" "}
                  <MdOutlineStar /> {avgRating}
                </span>
                <span className="text-gray-400">
                  ({selectedCourse?.reviews?.length || 0} Reviews)
                </span>
              </div>

              <div>
                <span className="text-xl font-semibold text-black">
                  {" "}
                  ₹ {selectedCourse?.price}
                </span>
                {"  "}
                <span className="line-through text-sm text-gray-400">
                  {(selectedCourse?.price || 0) + 200}
                </span>
              </div>

              <ul className="text-sm text-gray-700 space-y-1 pt-2">
                <li> ✅ 10+ hours of video content</li>
                <li> ✅ LifeTime access to course materials</li>
              </ul>

              {/* Enroll / Watch button logic */}
              {String(userData?._id) ===
              String(
                selectedCourse?.creator?._id || selectedCourse?.creator
              ) ? (
                <button
                  className="bg-[#4b514b] text-green-500 px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer"
                  onClick={() => navigate(`/viewlecture/${courseId}`)}
                >
                  Watch Now
                </button>
              ) : !isEnrolled ? (
                <button
                  className="bg-[black] text-white px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer"
                  onClick={() => handleEnroll(userData._id, courseId)}
                >
                  Enroll Now
                </button>
              ) : (
                <button
                  className="bg-[#4b514b] text-green-500 px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer"
                  onClick={() => navigate(`/viewlecture/${courseId}`)}
                >
                  Watch Now
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">What You'll Learn</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Learn {selectedCourse?.category} from Beginning</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Who This Course is For</h2>
          <p className=" text-gray-700 ">
            Beginners, aspiring developers, and professionals looking to upgrade
            skills
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200 ">
            <h2 className="text-xl font-bold mb-1 text-gray-800">
              {" "}
              Course Curriculum
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {selectedCourse?.lectures?.length || 0} Lectures
            </p>
            <div className="flex flex-col gap-3">
              {selectedCourse?.lectures?.map((lecture, index) => (
                <button
                  key={index}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${
                    lecture.isPreviewFree
                      ? "hover:bg-gray-100 cursor-pointer border-gray-300"
                      : "cursor-not-allowed opacity-60 border-gray-200 "
                  } ${
                    selectedLecture?._id === lecture._id
                      ? "bg-gray-100 border-gray-400  "
                      : ""
                  }`}
                  onClick={() => {
                    if (lecture.isPreviewFree) {
                      setSelectedLecture(lecture);
                    }
                  }}
                  disabled={!lecture.isPreviewFree}
                >
                  <span>
                    {lecture.isPreviewFree ? <FaCirclePlay /> : <FaLock />}
                  </span>
                  <span className="text-sm font-medium text-gray-800 ">
                    {" "}
                    {lecture.lectureTitle}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-[#383535] flex items-center justify-center">
              {selectedLecture?.videoUrl ? (
                <video
                  className="w-full h-full object-cover"
                  src={selectedLecture?.videoUrl}
                  controls
                />
              ) : (
                <span className="text-white text-xl">
                  {" "}
                  Select a Preview lecture to watch{" "}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-2xl font-semibold mb-2">Write a Reviews</h2>
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <MdOutlineStar
                  key={star}
                  onClick={() => setRating(star)}
                  className={
                    star <= rating
                      ? "fill-amber-300 text-[30px]"
                      : "fill-gray-300 text-[30px]"
                  }
                />
              ))}
            </div>

            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 resize-none"
              placeholder="Write your Review here ..."
              rows={4}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>

            <button
              className="bg-[#233f5f] text-[white] mt-3 px-4 py-2 rounded hover:bg-gray-800"
              disabled={loading}
              onClick={handleReview}
            >
              {loading ? (
                <ClipLoader size={20} color="white" />
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </div>

        {/* for creator information  */}
        <div className="flex items-center gap-4 pt-4 border-t">
          {creatorData?.photoUrl ? (
            <img
              src={creatorData?.photoUrl}
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-200"
              alt="creator"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-semibold border-2 border-amber-200">
              {creatorData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-lg  font-semibold">{creatorData?.name}</h2>
            <p className="md:text-sm text-gray-600 text-[10px]">
              {creatorData?.description}
            </p>
            <p className="md:text-sm text-gray-600 text-[10px]">
              {creatorData?.email}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xl font-semibold mb-2">
            Other Published Courses by the Educator -{" "}
          </p>
        </div>

        <div className="w-full transition-all duration-300 py-[20px] flex items-center justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]">
          {creatorCourse?.map((course, index) => (
            <Card
              key={index}
              thumbnail={course.thumbnail}
              id={course._id}
              price={course.price}
              title={course.title}
              category={course.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
