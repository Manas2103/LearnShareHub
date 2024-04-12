import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Journal } from "../Models/journal.model.js"

const userJournal  = asyncHandler(async (req, res) => {
    const {title, webLink} = req.body

    if(!title){
        throw new ApiError(400, "Please enter the title")
    }

    if(!webLink){
        throw new ApiError(400, "Please enter the Web Link")
    }

    const alreadyJournal = await Journal.findOne({title})

    if(alreadyJournal){
        throw new ApiError(401, `Journal with ${title} exists`)
    }

    // let pdfLocalPath;
    // if(req.files && Array.isArray(req.files.webLink) && req.files.webLink.length > 0){
    //     pdfLocalPath = req.files.webLink[0].path;
    // }

    // const uploadedFile = await uploadOnCloudinary(pdfLocalPath)

    // if(!uploadedFile){
    //     throw new ApiError(400, "Something went wrong while uploading to cloudinary")
    // }

    const journal = await Journal.create({
        title,
        webLink
    })

    if(!journal){
        throw new ApiError(500, "Error while creating new Journal")
    }


    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {journal},
            "journal loaded successfully"
        )
    )
})

const getAllJournals = asyncHandler(async(req, res) => {
    const allJournals = await Journal.find({})

    if(!allJournals){
        throw new ApiError(500, "Couldn't fetch all Journals")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {allJournals},
            "All Journals fetched successfully"
        )
    )
}) 

const deleteJournal = asyncHandler(async(req, res) => {
    const {title} = req.body;

    if(!title){
        throw new ApiError(404, "title for deletion not provided")
    }

    const deletedJournal = await Journal.findOneAndDelete({title})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Journal deleted successfully"
        )
    )
})

const getApprovalJournal = asyncHandler(async(req, res) => {
    const {title} = req.body;

    if(!title){
        throw new ApiError(404, "Title should be provided")
    }

    const journal = await Journal.findOneAndUpdate(
        {title},
        {
            $set : {
                approved : true
            }
        },
        {
            new : true
        }
    );

    if(!journal){
        throw new ApiError(500, "Error while approving Journal at server")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            journal,
            "Journal Approved successfully"
        )
    )
})


export {
    userJournal,
    getAllJournals,
    deleteJournal,
    getApprovalJournal
}