//import
import express from "express"
import dotenv from "dotenv";

//Dot ENV Config
dotenv.config()

//App
const app = express();

//Router
app.get('/', (req, res) => {
    res.send("<h1>Welcome to JOB PORTAL</h1>")
})

const port = process.env.PORT
//Listen
app.listen(port, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${port}`)
    console.log(`URL : http://localhost:${port}`)
})