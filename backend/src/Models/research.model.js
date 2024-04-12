import mongoose from "mongoose"

const researchSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    image : {
        type : String,
    },
    description : {
        type : String,
        trim : true
    },
})

export const Research = mongoose.model("Research", researchSchema)