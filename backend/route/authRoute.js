import express from "express";
import {
  googleAuth,
  Login,
  logOut,
  resetPassword,
  sendOtp,
  signUp,
  verifyOTp
} from "../controller/authController.js";

const authRouter = express.Router();
authRouter.post("/signup", signUp);
authRouter.post("/login", Login);
authRouter.post("/sendotp", sendOtp);
authRouter.post("/verifyotp", verifyOTp);
authRouter.post("/resetpassword", resetPassword);
authRouter.get("/logout", logOut);

authRouter.post("/googleauth", googleAuth);

export default authRouter;
