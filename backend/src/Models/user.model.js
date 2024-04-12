import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique: true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    image : {
        type : String,
        required : true
    },
    faculty : {
        type : Boolean,
        required : true,
    },
    institute :{
        type : String
    },
    descourse : {
        type : String,
        default : "N/A"
    },
    researchArea : {
        type : String,
        default : "N/A"
    }
},
{
    timestamps : true
})

// password encryption

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 8)
    next()
})

// password checking method

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// generate access tokens

userSchema.methods.generateToken = function(){
    //sign creates access tokens.

    return jwt.sign(
        //payload
        {
            _id : this._id,
            email : this.email,
            username : this.username
            
        },
        //Access token secret, it is given directly
        process.env.ACCESS_TOKEN_SECRET,
        //expiry, given inside the object
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }

    )

}



export const User = mongoose.model("User", userSchema)