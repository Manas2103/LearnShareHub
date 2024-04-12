import mongoose from "mongoose";

const DB_NAME = "deepLearn"

const connectDB = async () => {
    try {
        const conn =await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB connnected succesfully DB Host :", conn.connection.host);
    } catch (error) {
        console.log("MongoDB connection failed :", error);
        process.exit(1)
    }
}

export default connectDB;