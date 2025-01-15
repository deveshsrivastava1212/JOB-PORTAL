//import package
import express from "express"
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
//import files
import connectDB from "./config/db.js";
//import methods
import testRouter from "./routes/testRouter.js"
import authRouter from "./routes/authRouter.js"
import errorMiddelware from "./middelwares/errorMiddelware.js";

//Dot ENV Config
dotenv.config()

//Mongodb Connection
connectDB();

//App
const app = express();

//middelware
app.use(express.json());
app.use(cors())
app.use(morgan())

//Router
app.use("/api/v1/test", testRouter);
app.use("/api/v1/auth", authRouter);

//validation middelware
app.use(errorMiddelware);

const port = process.env.PORT
//Listen
app.listen(port, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${port}`)
    console.log(`URL : http://localhost:${port}`)
})