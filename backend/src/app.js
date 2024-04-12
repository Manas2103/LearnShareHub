import express,{urlencoded} from "express"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
    //and many more options explore the docs
}));



app.use(express.json({limit: '16kb'}));

app.use(urlencoded({extended:true, limit: '16kb'}))

app.use(cookieParser())


//import Routers

import userRouter from "./routes/user.routes.js"
import projectRouter from "./routes/project.routes.js";
import opinionRouter from "./routes/opinion.routes.js";
import journalRouter from "./routes/journal.routes.js";
import courseRouter from "./routes/course.routes.js";

app.use("/api/v1/users", userRouter)
app.use("/api/v1/project", projectRouter)
app.use("/api/v1/opinion", opinionRouter)
app.use("/api/v1/journal", journalRouter)
app.use("/api/v1/course", courseRouter)

export {app}