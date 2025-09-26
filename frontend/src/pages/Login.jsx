import React from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase.js";
function Login() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      navigate("/");
      setLoading(false);

      toast.success("Login Successfully"); // ✅ use `success`, not `done`
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName; // ✅ Correct field
      let email = user.email;
      let role = "";
      const result = await axios.post(
        serverUrl + "/api/auth/googleauth",
        { name, email, role },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      navigate("/");

      toast.success("Login Successfully"); // ✅ use `success`, not `done`
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center ">
      <form
        className=" w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-[#41a856] text-2xl ">
              {" "}
              Welcome Back{" "}
            </h1>
            <h2 className="text-[#317c3e] text-[18px]"> Login your Account</h2>
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              id="password"
              type={show ? "text" : "password"}
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {show ? (
              <IoEyeOff
                className="absolute w-[20px] h-[20px] cursor-pointer right-[7%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <IoEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[7%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          <button
            className="w-[80%] h-[40px] bg-[#b93333] text-white cursor-pointer flex items-center justify-center rounded-[15px] hover:bg-[#ad2020]"
            disabled={loading}
            onClick={handleLogin}
          >
            {" "}
            {loading ? <ClipLoader size={30} color="white" /> : "Login"}
          </button>

          <sapn
            className="text-[15px] cursor-pointer text-[#2c2727] underline hover:text-[#d43033]"
            onClick={() => navigate("/forgotpassword")}
          >
            Frogot Password
          </sapn>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4] "></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
              Or
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4] "></div>
          </div>

          <div
            className="w-[80%] h-[40px] border-1 border-[black] rounded-full flex   bg-[#f4f4fd] items-center justify-center cursor-pointer"
            onClick={googleLogin}
          >
            <img src={google} className="w-[25px] " />
            <span className="text-gray-700  text-[20px]">oogle</span>
          </div>

          <div className="text-[#6f6f6f]">
            {" "}
            Create a new Account{" "}
            <span
              className="underline underline-offset-1 text-[black] cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </div>
        </div>

        {/* right div */}
        <div className="w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden">
          <img src={logo} alt="logo" className="w-30  shadow-2xl" />
          <span className="text-2xl  text-white cursor-pointer">
            Virtual Clasess
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
