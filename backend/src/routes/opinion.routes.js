import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { deleteOpinion, getAllOpinion, userOpinion } from "../controller/opinion.controller.js";


const opinionRouter = Router();

opinionRouter.route("/get-all-opinion").post(getAllOpinion)

//secured routes

opinionRouter.route("/delete-opinion").post(jwtVerify, deleteOpinion)
opinionRouter.route("/add-opinion").post(jwtVerify, userOpinion)

export default opinionRouter