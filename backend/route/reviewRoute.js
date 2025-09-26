import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createReview, getReview } from "../controller/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/createreview", isAuth, createReview);

reviewRouter.get("/getreview", isAuth, getReview);

export default reviewRouter;
