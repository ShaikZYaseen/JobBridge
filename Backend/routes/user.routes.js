import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.js";
const userRouter = Router();


 //importing controllers
 import { registerUser,loginUser,logoutUser,changeCurrentPassword,getCurrentUser,updateAccountDetails,updateUserAvatar,updateProfile } from "../controllers/user.controllers.js";


 userRouter
 .route("/signup")
 .post(upload.single('file'),registerUser)
 
 userRouter
 .route("/login")
 .post(loginUser)

 userRouter
 .route("/logout")
 .post(verifyJWT,logoutUser)

 userRouter
 .route("/changepassword")
 .post(verifyJWT,changeCurrentPassword)

 userRouter
 .route("/me")
 .get(verifyJWT,getCurrentUser)

 userRouter
 .route("/update")
 .post(verifyJWT,updateAccountDetails)

 userRouter
 .route("/avatar")
 .post(verifyJWT,updateUserAvatar)

 userRouter
 .route("/profile")
 .post(verifyJWT,upload.single('resume'),updateProfile)


 export default userRouter;