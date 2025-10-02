import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createReview,getCourseReviews,getReview } from "../controller/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/createreview", isAuth, createReview);

reviewRouter.get("/getreview", isAuth, getReview);

// ✅ new route: get reviews only for one course
reviewRouter.get("/course/:courseId", getCourseReviews);

export default reviewRouter;
