import Course from "../model/courseModel.js";
import Review from "../model/reviewModel.js";

export const createReview = async (req, res) => {
  try {
    const { rating, comment, courseId } = req.body;
    const userId = req.userId;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json({ message: "Course is not found" });
    }

    const alreadyReviewd = await Review.findOne({
      course: courseId,
      user: userId
    });
    if (alreadyReviewd) {
      return res
        .status(400)
        .json({ message: "you have already reviewed this course" });
    }

    const review = new Review({
      course: courseId,
      user: userId,
      rating,
      comment
    });

    await review.save();

    await course.reviews.push(review._id);
    await course.save();

    return res.status(201).json(review);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to create review  error ${error}` });
  }
};

export const getReview = async (req, res) => {
  try {
    const review = await Review.find({})
      .populate("course user")
      .sort({ reviewedAt: -1 });
    return res.status(201).json(review);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to get review  error ${error}` });
  }
};
