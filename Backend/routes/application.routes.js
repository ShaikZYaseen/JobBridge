import { Router } from "express";
const applicationRouter = Router();

//importing controllers
import { verifyJWT } from "../middlewares/auth.js";
import { applyJob,getApplicants,getAppliedJobs,updateStatus } from "../controllers/application.controllers.js";


applicationRouter.route("/apply/:id").get(verifyJWT, applyJob);
applicationRouter.route("/get").get(verifyJWT, getAppliedJobs);
applicationRouter.route("/:id/applicants").get(verifyJWT, getApplicants);
applicationRouter.route("/status/:id/update").post(verifyJWT, updateStatus);



export default applicationRouter;