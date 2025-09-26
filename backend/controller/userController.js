import { uploadOnCloudinary } from "../config/cloudinary.js";
import User from "../model/userModel.js";
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate("enrolledCourses");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `get Cuurent error ${error}` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { description, name } = req.body;
    let photoUrl;

    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }

    const updateData = { name, description };
    if (photoUrl) updateData.photoUrl = photoUrl; // sirf tab update karo jab file mili ho

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `profile update error: ${error.message}` });
  }
};
