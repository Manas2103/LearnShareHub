import jwt from "jsonwebtoken"
import { User } from "../Models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"

const jwtVerify = asyncHandler(async (req, _, next)=> {
    try {
        const token = req.cookies?.jwtToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            throw new ApiError(401, "unauthorised request")
        }
    
        const decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        console.log(decodedInfo);
    
        const user = await User.findById(decodedInfo._id).select("-password")
    
        if(!user){
            throw new ApiError(401, "Invalid access token")
        }

        console.log(user)
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid access token")
    }
})

export {jwtVerify}