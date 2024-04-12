import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Opinion } from "../Models/opinion.model.js";


const userOpinion = asyncHandler(async (req, res) => {
    const {opinion, institute} = req.body;
    console.log(opinion, "     ", institute)
    const member = req.user
    const username = member.username
    console.log(username);
    if(!(institute && opinion)){
        throw new ApiError(400, "All fields are necessary")
    }

    const alredyOpinion = await Opinion.findOne({username})

    if(alredyOpinion){
        throw new ApiError(401, "Your Opinion already exists")
    }

    if(!username){
        throw new ApiError(404, "User not logged in")
    }

    const image = member.image

    const opinionInstance = await Opinion.create({
        username, 
        institute,
        opinion,
        image
    })

    if(!opinionInstance){
        throw new ApiError(500, "Error while creating new Opinion")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {opinionInstance},
            "Opinion saved successfully"
        )
    )
})

const getAllOpinion = asyncHandler(async(req, res) => {
    const allOpinion = await Opinion.find({})

    if(!allOpinion){
        throw new ApiError(500, "all Opinion cant be fetched")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {allOpinion},
            "All Opinion fetched Successfully"
        )
    )
})

const deleteOpinion = asyncHandler(async(req, res) =>{
    const {username} = req.body

    if(!username){
        throw new ApiError(404, "Username not provided")
    }

    await Opinion.findOneAndDelete({username})

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Opinion deleted successfully")
    )
})

export {
    userOpinion,
    getAllOpinion,
    deleteOpinion
}