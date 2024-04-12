import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Course } from "../Models/course.model.js"

const addCourse = asyncHandler(async (req, res) => {
    const isFaculty = req.user?.faculty

    if(!isFaculty){
        throw new ApiError(404, "You have to be faculty to access this option")
    }

    const {courseId, courseName, instructor, venue, date, assistant} = req.body

    console.log(courseId, courseName, instructor, venue, date, assistant);

    if(!(courseId && courseName &&  instructor && venue && date && assistant)){
        throw new ApiError(401, "All fields are conpulsary")
    }

    let syllabusLocal;
    if(req.files && Array.isArray(req.files.syllabus) && req.files.syllabus.length > 0){
        syllabusLocal = req.files.syllabus[0].path;
    }

    console.log(syllabusLocal);

    const syllabus = await uploadOnCloudinary(syllabusLocal)

    if(!syllabus){
        throw new ApiError(401, "Something went wrong while uploading file on cloudinary")
    }

    const course = await Course.create({
        courseId,
        courseName,
        instructor,
        venue,
        date,
        syllabus : syllabus.url,
        assistant
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {course},
            "Course added successfully"
        )
    )
})

const getAllCourse = asyncHandler(async(req, res) => {
    const allCourse = await Course.find({})

    if(!allCourse){
        throw new ApiError(500, "Couldn't fetch all Journals")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {allCourse},
            "All course fetched successfully"
        )
    )
})

const deleteCourse = asyncHandler(async(req,res) => {

    const isFaculty = req.user?.faculty

    if(!isFaculty){
        throw new ApiError(400, "You have to be faculty to delete course")
    }

    const {courseId} = req.body;

    if(!courseId){
        throw new ApiError(404, "title for deletion not provided")
    }

    await Course.findOneAndDelete({courseId})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Course deleted successfully"
        )
    )
})

export {addCourse,getAllCourse, deleteCourse}