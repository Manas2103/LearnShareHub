import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path : "./.env"
})

connectDB()
.then(()=>{
    app.on('error', (error) => {
        console.log("ERROR :", error);
        throw error
    })
    app.listen(process.env.PORT, () => {
        console.log(`Server started on Port : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("Error in mongoDB connection: ", error);
})