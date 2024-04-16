import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    mentor : {
        type : String,
        required : true,
    },
    member:{
        type : String,
        required : true
    },
    description : {
        type : String,
        trim : true,
        required : true
    },
    mentorImage : {
        type : String,
    },
    memberImage : {
        type : String,
    },
    approved : {
        type : Boolean,
        default : false
    },
    link:{
        type : String,
        default : "",
    }
})

export const Project = mongoose.model("Project", projectSchema)