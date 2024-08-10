import { Router } from "express";
const jobRouter = Router();

//importing controllers
import { verifyJWT } from "../middlewares/auth.js";
import { postJob,getAdminJobs,getAllJobs,getJobById } from "../controllers/job.controllers.js";


jobRouter.route("/post").post(verifyJWT, postJob);
jobRouter.route("/get").get(verifyJWT, getAllJobs);
jobRouter.route("/getadminjobs").get(verifyJWT, getAdminJobs);
jobRouter.route("/get/:id").get(verifyJWT, getJobById);


export default jobRouter;