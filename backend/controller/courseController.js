import { uploadOnCloudinary } from "../config/cloudinary.js";
import Course from "../model/courseModel.js";
import Lecture from "../model/lectureModel.js";
import User from "../model/userModel.js";

export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "title or Categroy is required" });
    }
    const course = await Course.create({
      title,
      category,
      creator: req.userId
    });

    return res.status(201).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Create Course error: ${error.message}` });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate(
      "lectures reviews"
    );

    if (!courses) {
      return res.status(400).json({ message: "Courses Not Found" });
    }
    return res.status(201).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to find isPublished error: ${error.message}` });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(400).json({ message: "Courses Not Found" });
    }
    return res.status(201).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: `failed to find Creator Courses error: ${error.message}`
      });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      title,
      subTitle,
      description,
      category,
      level,
      isPublished,
      price
    } = req.body;
    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Courses is Not Found" });
    }
    const updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      isPublished,
      price,
      thumbnail
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true
    });

    return res.status(201).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to edit Courses error: ${error.message}` });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course is not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: `failed to get  Courses by id error: ${error.message}`
      });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course is not found" });
    }
    course = await Course.findByIdAndDelete(courseId, { new: true });

    return res.status(200).json({ message: "Course Removed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to delete course error: ${error.message}` });
  }
};

// lectures Controllers
export const createLectures = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;
    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "lecture title is required" });
    }
    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
    }
    await course.populate("lectures");
    await course.save();
    //  videoUrl,isPreviewFree

    return res.status(201).json(lecture, course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to create lecture error: ${error.message}` });
  }
};
export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(404).json({ message: "course is not found" });
    }

    const course = await Course.findById(courseId)
      .populate("lectures")
      .populate({
        path: "reviews",
        populate: {
          path: "user", // agar aapko review ke saath user ka detail bhi chahiye
          select: "name email"
        }
      })
      .populate("creator");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({
      message: `failed to get course lecture error: ${error.message}`
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { isPreviewFree, lectureTitle } = req.body;
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(400).json({ message: "lecture   is not found" });
    }

    let videoUrl;
    if (req.file) {
      videoUrl = await uploadOnCloudinary(req.file.path);
      lecture.videoUrl = videoUrl;
    }

    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }

    if (typeof isPreviewFree !== "undefined") {
      lecture.isPreviewFree =
        isPreviewFree === "true" || isPreviewFree === true;
    }

    await lecture.save();

    return res.status(200).json(lecture);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to edit lecture error: ${error.message}` });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(400).json({ message: "lecture   is not found" });
    }
    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({ message: "Lecures Removed Successfully ! " });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to remove lecture error: ${error.message}` });
  }
};

// get creator

export const getCreatorById = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User is not Found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to get creator error: ${error.message}` });
  }
};
