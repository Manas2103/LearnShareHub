import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { deleteProject, getAllProject, getApproval, handleProject } from "../controller/project.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const projectRouter = Router();

projectRouter.route("/get-all-project").post(getAllProject)

//secured routes
projectRouter.route("/delete-project").post(jwtVerify, deleteProject)

projectRouter.route("/approve-project").post(jwtVerify, getApproval)

projectRouter.route("/add-project").post(
    jwtVerify,
    upload.fields([
        {
            name : "mentorImage",
            maxCount : 1
        },
        {
            name : "memberImage",
            maxCount : 1
        }
    ]),
    handleProject
)

export default projectRouter