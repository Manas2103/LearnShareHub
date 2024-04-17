import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {User} from "../Models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const generateAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        //console.log(user)
        const accessToken = user.generateToken()
        console.log("This is access token : ",accessToken)
        await user.save({validateBeforeSave : false})

        return accessToken;
    } catch (error) {
        console.log("Access token didn't generated, ERROR : ",error)
        throw new ApiError(500, "Something went wrong while genrating acesstoken")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password, faculty, institute, descourse, researchArea} = req.body

    console.log(username, " ", email, " ", password);

    if(!(username && password && email && institute && descourse && researchArea)){
        throw new ApiError(400, "All fields are necessary")
    }

    const ifUserExists = await User.findOne({
        $or : [{username}, {email}]
    })

    if(ifUserExists){
        throw new ApiError(409, "User with email or username already exists")
    }



    // Image local path from multer
    const imageLocalPath = req.files?.image[0]?.path;

    //console.log(imageLocalPath)

    if(!imageLocalPath){
        throw new ApiError(400, "Image is required, local path incorrect")
    }

    const image = await uploadOnCloudinary(imageLocalPath)

    if(!image){
        throw new ApiError(400, "Image is required, upload on cloudinary failed")
    }

    const user = await User.create({
        username : username.toLowerCase(),
        email,
        password,
        image : image.url,
        faculty,
        institute,
        descourse,
        researchArea
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

const loginUser = asyncHandler(async (req, res, next)=> {
    try {
        const {email, password} = req.body
    
        //console.log(email, " ", password);
    
        if(!email){
            throw new ApiError(400, "email is required")
        }
    
        if(!password){
            throw new ApiError(400, "password is required")
        }
    
        const user = await User.findOne({email})
    
        if(!user){
            throw new ApiError(404, "User not found")
        }
    
        //check password
    
        const isPassValid = await user.isPasswordCorrect(password)
    
        if(!isPassValid){
            throw new ApiError(401, "Password is incorrect")
        }
    
        //create access tokens
    
        //console.log(user._id);
    
        const accessToken = await generateAccessToken(user._id)
    
        const loggedInUser = await User.findById(user._id).select("-password")
    
    
    
        //cookies
    
        const option = {
            httpOnly : true,
            secure : true
        }
    
        return res
        .status(200)
        .cookie("jwtToken", accessToken, option)
        .json(
            new ApiResponse(
                200,
                {
                    user : loggedInUser, accessToken
                },
                "User logged in successfully"
            )
        )
    } catch (error) {
        next(error)
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user._id



    //console.log("req users file",req.userId)

    // await User.findByIdAndDelete(
    //     userId,
    //     {
    //         new: true
    //     }
    // )

    const option = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("jwtToken", option)
    .json(
        new ApiResponse(
            200,
            {},
            "User loggedOut succesfully"
        )
    )


})

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({})
    
        if(!users){
            throw new ApiError(500, "All Users cannot be fetched")
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                users,
                "All Users fetched successfully"
            )
        )
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

const deleteUser = asyncHandler(async(req, res) => {
    const userId = req.user?._id

    await User.findByIdAndDelete(
        userId
    )

    const option = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("jwtToken", option)
    .json(
        new ApiResponse(
            200,
            {},
            "User loggedOut succesfully"
        )
    )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            "current User fetched succesfully"
        )
    )
})

const getApprovalUser = asyncHandler(async(req, res) => {
    if(!(req.user?.email === "pkroynitp@gmail.com")){
        throw new ApiError(403, "You need to be admin")
    }
    const {username} = req.body;

    if(!username){
        throw new ApiError(404, "Username should be provided")
    }

    const user = await User.findOneAndUpdate(
        {username},
        {
            $set : {
                approved : true
            }
        },
        {
            new : true
        }
    );

    if(!user){
        throw new ApiError(500, "Error while approving User at server")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "User Approved successfully"
        )
    )
})


const deleteUserOnDemand = asyncHandler(async(req,res) => {

    const {username} = req.body;

    if(!username){
        throw new ApiError(404, "title for deletion not provided")
    }

    try {
        await User.findOneAndDelete({username})
    
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "User deleted successfully"
            )
        )
    } catch (error) {
        console.log(error)
    }
})


export {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    deleteUser,
    getCurrentUser,
    getApprovalUser,
    deleteUserOnDemand
}