import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.js";

//importing controllers
import { registerCompany,getCompany,getCompanyById,updateCompany } from "../controllers/company.controllers.js";

const companyRouter = Router();

companyRouter
.route("/register")
.post(verifyJWT,registerCompany)

companyRouter
.route("/get")
.get(verifyJWT,getCompany)


companyRouter
.route("/get/:id")
.get(verifyJWT,getCompanyById)

companyRouter
.route("/update/:id")
.put(verifyJWT,upload.single('logo'),updateCompany)



  export default companyRouter
