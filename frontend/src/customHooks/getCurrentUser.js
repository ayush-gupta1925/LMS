import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
const getCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
          withCredentials: true
        });

        dispatch(setUserData(result.data));
      } catch (error) {
        dispatch(setUserData(null));
      }
    };
    fetchUser();
  }, []);
};

export default getCurrentUser;
