import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const [step, setStep] = useState(1); // ✅ typo fix
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/sendotp",
        { email },
        { withCredentials: true }
      );

      setLoading(false);
      setStep(2);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const verifyOTp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/verifyotp",
        { email, otp },
        { withCredentials: true }
      );

      setLoading(false);
      setStep(3);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (newPassword != conPassword) {
        return toast.error("Password is not Match");
      }

      const result = await axios.post(
        serverUrl + "/api/auth/resetpassword",
        { email, password: newPassword },
        { withCredentials: true }
      );

      setLoading(false);
      navigate("/login");
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Step 1: Ask Email */}
      {step === 1 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Forgot Password
          </h2>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Your Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2   focus:ring-black "
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            className="mt-6 w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 cursor-pointer"
            disabled={loading}
            onClick={sendOtp}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
          </button>

          <div
            className="text-sm text-center mt-4 cursor-pointer "
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}

      {/* Step 2: Verify OTP */}
      {step === 2 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Enter OTP
          </h2>

          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700"
          >
            please enter the 4-digit code send to your email
          </label>

          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mt-[9px]"
          />
          <button
            onClick={verifyOTp}
            className="mt-6 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "  Verify OTP"}
          </button>

          <div
            className="text-sm text-center mt-4 cursor-pointer "
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}

      {/* Step 3: Reset Password */}
      {step === 3 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset Password
          </h2>

          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Enter New Password
          </label>

          <input
            type="password"
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="*****"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          <label
            htmlFor="confirmpassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>

          <input
            type="password"
            id="confirmpassword"
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
            placeholder="*****"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={resetPassword}
            className="mt-6 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              " Reset Password"
            )}
          </button>

          <div
            className="text-sm text-center mt-4 cursor-pointer "
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
