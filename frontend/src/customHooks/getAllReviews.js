import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setReviewData } from "../redux/reviewSlice.js";

function getAllReviews() {
  const dispatch = useDispatch();
  useEffect(() => {
    const allReviews = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/review/getreview", {
          withCredentials: true
        });

        dispatch(setReviewData(result.data));
      } catch (error) {
       return null
      }
    };
    allReviews();
  }, []);
}

export default getAllReviews;
