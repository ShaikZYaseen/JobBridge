import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js";
import { Application } from "../models/application.models.js";
import { Job } from "../models/job.models.js";



 const applyJob = asyncHandler(async (req, res) => {

    const userId = req.user._id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json(new apiError(400,"Job id is required"));
        };

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json(new apiError(400,"You have already applied for this job"));
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json(new apiError(404,"Job not found"));
        }
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json(new apiResponse(200,"Job applied successfully"));
   
});


 const getAppliedJobs = asyncHandler(async (req,res) => {

    const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });

        if(!application){
            return res.status(404).json(new apiError(404,"No Applicants"));
        };

        return res.status(200).json(new apiResponse(200,application));
   
})


 const getApplicants = asyncHandler(async (req,res) => {

    const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json(new apiError(404,"Job not found"));
        };

        return res.status(200).json(new apiResponse(200,job));
    
})


const updateStatus =asyncHandler(async (req,res) => {

    const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json(new apiError(400,"status is required"));
        };

        const application = await Application.findOne({_id:applicationId});

        if(!application){
            return res.status(404).json(new apiError(404,"Application not found"));
        };

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json(new apiResponse(200,"Status updated successfully"));

})



export {applyJob,getApplicants,getAppliedJobs,updateStatus
}