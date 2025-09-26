import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import sendMail from "../config/sendEmail.js";
export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(name, email, password, role);
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already Exists!" });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid Email!" });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter Strong Password!" });
    }

    // Hash password
    let hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role
    });

    // Generate token
    let token = await genToken(user._id);

    // ❌ Wrong: req.cookie → ✅ Correct: res.cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `signup error ${error}` });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doest not Exists!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid Email!" });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect  Password!" });
    }

    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `login error ${error}` });
  }
};

export const logOut = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({ message: "logout sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: `logout error ${error}` });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found " });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    (user.resetOtp = otp),
      (user.otpExpires = Date.now() + 5 * 60 * 1000),
      (user.isOtpVerified = false);

    await user.save();

    await sendMail(email, otp);
    return res.status(200).json({ message: "OTP Send Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `send otp  error ${error}` });
  }
};

export const verifyOTp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // user find karo
    const user = await User.findOne({ email });

    if (
      !user ||
      user.resetOtp !== otp || // OTP match karna zaroori
      !user.otpExpires ||
      user.otpExpires < Date.now() // expire check
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP valid -> reset fields
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();

    return res.status(200).json({ message: "OTP Verified Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `otp error ${error.message}` });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // user find karo
    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP Verification is Required" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false; // reset otpVerified flag

    await user.save();

    return res.status(200).json({ message: "Reset Password Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `reset password error: ${error.message}` });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        role
      });
    }

    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `google sigunp error: ${error.message}` });
  }
};
