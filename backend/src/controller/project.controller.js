import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Project } from "../Models/project.model.js"

const handleProject = asyncHandler(async (req, res) => {
    const {title, mentor, description} = req.body
    const {link} = req.body
    const member = req.user.username
    const image = req.user.image

    if(!(title && mentor && description)){
        throw new ApiError(400, "All fields are necessary")
    }

    const alreadyProject = await Project.findOne({title})

    if(alreadyProject){
        throw new ApiError(401, `Project with ${alreadyProject} exists`)
    }

    if(!member){
        throw new ApiError(400, "User is not logged in")
    }

    let mentorImageLocalPath;
    if(req.files && Array.isArray(req.files.mentorImage) && req.files.mentorImage.length > 0){
        mentorImageLocalPath = req.files.mentorImage[0].path;
    }

    
    // let memberImageLocalPath;
    // if(req.files && Array.isArray(req.files.memberImage) && req.files.memberImage.length > 0){
    //     memberImageLocalPath = req.files.memberImage[0].path;
    // }

    const mentorImage = await uploadOnCloudinary(mentorImageLocalPath)
    //const memberImage = uploadOnCloudinary(memberImageLocalPath)

    if(!mentorImage){
        throw new ApiError(400, "Error while iploading image on cloudinary")
    }

    // if(!memberImage){
    //     throw new ApiError(400, "Error while iploading image on cloudinary")
    // }

    const project = Project.create({
        title,
        mentor,
        member,
        description,
        mentorImage : mentorImage?.url || "",
        memberImage : image,
        link
    })

    if(!project){
        throw new ApiError(500, "Error while creating new Project")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {project},
            "Project added successfully"
        )
    )
})

const getAllProject = asyncHandler(async(req, res) => {
    const allProject = await Project.find({})

    if(!allProject){
        throw new ApiError(500, "Couldn't fetch all Journals")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {allProject},
            "All Projects fetched successfully"
        )
    )
})

const deleteProject = asyncHandler(async(req,res) => {

    const {title} = req.body;

    if(!title){
        throw new ApiError(404, "title for deletion not provided")
    }

    await Project.findOneAndDelete({title})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Project deleted successfully"
        )
    )
})

const getApproval = asyncHandler(async(req, res) => {
    const {title} = req.body;

    if(!title){
        throw new ApiError(404, "Title should be provided")
    }

    const project = await Project.findOneAndUpdate(
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

    if(!project){
        throw new ApiError(500, "Error while approving project at server")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            project,
            "Project Approved successfully"
        )
    )
})

export {
    handleProject,
    getAllProject,
    deleteProject,
    getApproval
}