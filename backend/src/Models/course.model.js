import mongoose, {Schema, trusted} from "mongoose"

const courseSchema = new Schema({
    courseId : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    courseName : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    instructor : {
        type : String, 
        required : true
    },
    venue : {
        type : String,
        required : trusted
    },
    date : {
        type : Date,
        required : true
    },
    syllabus : { // cloudinary link
        type : String
    },
    assistant : {
        type : String
    }
})

export const Course = mongoose.model("Course", courseSchema)