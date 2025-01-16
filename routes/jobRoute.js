import express from "express";
import userAuth from "../middelwares/authMiddelware.js";
import { createJobController, deleteJobController, getAllJobController, updateJobController } from "../controllers/jobController.js";

const router = express.Router();

//Create job ||POST
router.post('/create-job', userAuth, createJobController)

//Get Jobs || GET
router.get('/get-jobs', userAuth, getAllJobController);

//Update Jobs || PUT || PATCH
router.patch("/update-job/:id", userAuth, updateJobController)

//Delete Jobs || DELETE
router.delete('/delete-job/:id', userAuth, deleteJobController)

export default router;