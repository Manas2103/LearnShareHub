import mongoose, {Schema} from "mongoose";

const opinionShema = new Schema({
    username : {
        type : String,
        required : true
    },
    institute : {
        type : String,
        required : true
    },
    opinion : {
        type : String,
        required : true
    },
    image : {
        type : String,
    }
})


export const Opinion = mongoose.model("Opinion", opinionShema)