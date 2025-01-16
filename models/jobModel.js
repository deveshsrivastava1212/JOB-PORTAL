import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company name is required"]
    },
    position: {
        type: String,
        required: [true, 'Job position is required']
    },
    status: {
        type: String,
        enum: ['Pending', 'Reject', 'Interview'],
        default: 'Pending'
    },
    workType: {
        type: String,
        enum: ['Full-Time', 'Part-Time', 'Internship', 'Contract'],
        default: 'Full-Time'
    },
    workLocation: {
        type: String,
        required: [true, 'Location is required'],
        default: 'Delhi'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true }
);

export default mongoose.model('Job', jobSchema);