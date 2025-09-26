import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../redux/courseSlice.js";

const getPublishedCourses = () => {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);
  return useEffect(() => {
    const getCourseData = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getpublished", {
          withCredentials: true
        });
        dispatch(setCourseData(result.data));
      } catch (error) {
        return null
      }
    };
    getCourseData();
  }, []);
};

export default getPublishedCourses;
