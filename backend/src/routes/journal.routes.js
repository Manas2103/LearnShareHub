import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { deleteJournal, getAllJournals, getApprovalJournal, userJournal } from "../controller/journal.controller.js";

const journalRouter = Router();
journalRouter.route("/get-all-journal").post(getAllJournals)


//secured routes 

journalRouter.route("/delete-journal").post(jwtVerify, deleteJournal)

journalRouter.route("/approve-journal").post(jwtVerify, getApprovalJournal)

journalRouter.route("/add-journal").post(
    jwtVerify,
    userJournal
    )


export default journalRouter;