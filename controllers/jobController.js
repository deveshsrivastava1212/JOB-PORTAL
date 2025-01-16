import jobSchema from "../models/jobModel.js";
import mongoose from "mongoose";
//Create job Controller
export const createJobController = async (req, res, next) => {
    const { company, position } = req.body;
    if (!company || !position)
        next("Please Provide all Fields")
    req.body.createdBy = req.user.userId
    const job = await jobSchema.create(req.body);
    res.status(201).json({ job })
}

//Get All Jobs Controller
export const getAllJobController = async (req, res, next) => {
    const jobs = await jobSchema.find({ createdBy: req.user.userId })
    res.status(200).json({
        totalJob: jobs.length,
        jobs
    })
}

//Update Job COntroller
export const updateJobController = async (req, res, next) => {
    const { id } = req.params;
    const { company, position } = req.body
    if (!company || !position)
        next("Please Provide All Fields")
    //Find Job
    const job = await jobSchema.findOne({ _id: id })
    if (!job)
        next(`No Job Found with this id ${id}`)
    if (!req.user.userId === job.createdBy.toString()) {
        next("You're not Authorized to update this job")
        return;
    }
    const updateJob = await jobSchema.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ updateJob })
}

//Delete Job Controller
export const deleteJobController = async (req, res, next) => {
    const { id } = req.params;
    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next("Invalid Job ID provided");
    }
    const job = await jobSchema.findOne({ _id: id })
    if (!job)
        next(`No Job Found with this id ${id}`)
    if (req.user.userId !== job.createdBy.toString()) {
        next("You're not Authorized to delete this job")
        return;
    }
    await job.deleteOne();
    res.status(200).json({ message: "Job Successfully Deleted" })
}
