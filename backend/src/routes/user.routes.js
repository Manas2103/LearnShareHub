import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { deleteUser, getAllUsers, getCurrentUser, loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
import { jwtVerify } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name : "image",
            maxCount : 1
        }
    ]),
    registerUser
)

router.route("/get-all-users").post(getAllUsers)

router.route("/login").post(loginUser)

// secured routes

router.route("/delete-user").get(jwtVerify, deleteUser)
router.route("/logout").post(jwtVerify, logoutUser)
router.route("/get-current-user").post(jwtVerify, getCurrentUser)

export default router