import axios from "axios";
import React, { useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice.js";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function EditProfile() {
  const { userData } = useSelector((state) => state.user);
  const [name, setName] = useState(userData.name || "");

  const [description, setDesciption] = useState(userData.description || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  let navigate = useNavigate();
  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("photoUrl", photoUrl);
      formData.append("description", description);

      const result = await axios.post(
        serverUrl + "/api/user/profile",
        formData,
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setLoading(false);
      navigate("/");
      toast.success("Profile Updated");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
        <div className="w-[45px] h-[35px] hover:bg-[#a8e8a8] flex items-center justify-center rounded-lg absolute top-[5%]">
          <IoReturnUpBackOutline
            className="absolute top-[5%] left-[14%] w-[28px] h-[28px] cursor-pointer"
            onClick={() => navigate("/profile")}
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Edit Profile
        </h2>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col items-center text-center">
            {userData?.photoUrl ? (
              <img
                src={userData?.photoUrl}
                className="w-24 h-24 rounded-full object-cover border-2 border-[#675959] "
              />
            ) : (
              <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] boreder-2 bg-[#8de35b] border-white">
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700"
            >
              {" "}
              Select Avatar
            </label>
            <input
              id="iamge"
              type="file"
              className="w-full px-4 py-2 border rounded-md text-sm cursor-pointer"
              placeholder="PhotoUrl"
              name="photoUrl"
              accept="image/*"
              onChange={(e) => setPhotoUrl(e.target.files[0])}
            />
          </div>

          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              {" "}
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border rounded-md text-sm cursor-pointer"
              placeholder={userData.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700"> Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md text-sm cursor-pointer"
              placeholder={userData.email}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="dec" className="text-sm font-medium text-gray-700">
              {" "}
              Bio
            </label>
            <textarea
              id="dec"
              rows={3}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none "
              placeholder="Tell us about yourself"
              value={description}
              onChange={(e) => setDesciption(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-[#4b426f] active:bg-[#1c4ded] cursor-pointer text-white py-2 rounded-md font-medium trasition"
            disabled={loading}
            onClick={handleEditProfile}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
