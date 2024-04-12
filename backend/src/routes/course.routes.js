import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { addCourse, deleteCourse, getAllCourse } from "../controller/course.controller.js";

const courseRouter = Router();

courseRouter.route("/get-all-course").post(getAllCourse)

// secured routes

courseRouter.route("/delete-course").post(jwtVerify, deleteCourse)

courseRouter.route("/add-course").post(
    jwtVerify,
    upload.fields([
        {
            name : "syllabus",
            maxCount : 1
        }
    ]),
    addCourse
)

export default courseRouter