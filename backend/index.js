import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// routes
import authRouter from "./route/authRoute.js";
import userRouter from "./route/userRoute.js";
import courseRouter from "./route/courseRoute.js";
import paymentRouter from "./route/paymentRoute.js";
import reviewRouter from "./route/reviewRoute.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://lms-frontend-7j5c.onrender.com",
    credentials: true
  })
);

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/order", paymentRouter);
app.use("/api/review", reviewRouter);

// Start server
app.listen(port, () => {
  connectDb();
  console.log(`🚀 LMS running on port ${port}`);
});
