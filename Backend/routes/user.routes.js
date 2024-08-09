import { Router } from "express";
import { upload } from "../middlewares/multer.js";
const userRouter = Router();


 //importing controllers
 import { registerUser } from "../controllers/user.controllers.js";

 userRouter
 .route("/signup")
 .post(upload.single('avatar'),registerUser)



 export default userRouter;