import mongoose from "mongoose"

const journalSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    webLink : {
        type : String
    },
    approved : {
        type : Boolean,
        default : false
    }
})

export const Journal = mongoose.model("Journal", journalSchema)