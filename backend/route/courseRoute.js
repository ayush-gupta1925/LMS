import express from "express";
import {
  createCourse,
  createLectures,
  editCourse,
  editLecture,
  getCourseById,
  getCourseLecture,
  getCreatorById,
  getCreatorCourses,
  getPublishedCourses,
  removeCourse,
  removeLecture
} from "../controller/courseController.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import { SearchWithAI } from "../controller/searchController.js";

const courseRouter = express.Router();

courseRouter.post("/create", isAuth, createCourse);

courseRouter.get("/getpublished", isAuth, getPublishedCourses);
courseRouter.get("/getcreator", isAuth, getCreatorCourses);
courseRouter.post(
  "/editcourse/:courseId",
  isAuth,
  upload.single("thumbnail"),
  editCourse
);
courseRouter.get("/getcourse/:courseId", isAuth, getCourseById);
courseRouter.delete("/remove/:courseId", isAuth, removeCourse);

// lectures routes

courseRouter.post("/createlecture/:courseId", isAuth, createLectures);

courseRouter.get("/courselecture/:courseId", isAuth, getCourseLecture);

courseRouter.post(
  "/editlecture/:lectureId",
  isAuth,
  upload.single("videoUrl"),
  editLecture
);

courseRouter.delete("/removelecture/:lectureId", isAuth, removeLecture);

courseRouter.post("/creator", isAuth, getCreatorById);

// for seach
courseRouter.post("/search", SearchWithAI);

export default courseRouter;
