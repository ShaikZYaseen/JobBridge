import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import { User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new apiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    console.log(req.body)

    const {fullName, email, username, password,role } = req.body


    if (
        !fullName || !email || !username || !password || !role
    ) {
        throw new json(apiError(400, "Enter all the fields!"))
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new apiError(409, "User with email or username already exists")
    }



    const avatarLocalPath = req.file.path;

    

    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new apiError(400, "Avatar file is required");
    }
   

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        email, 
        password,
        username: username.toLowerCase(),
        role: role.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new apiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new apiResponse(200, createdUser, "User registered Successfully")
    )

} )

const loginUser = asyncHandler(async (req, res) =>{

    const {email, password} = req.body;

    if (!password && !email) {
        throw new apiError(400, "email or password is required")
    }
    

    const user = await User.findOne({email})

    if (!user) {
        throw new apiError(404, "User does not exist");
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new apiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new apiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new apiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new apiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new apiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new apiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new apiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new apiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new apiResponse(200, {}, "Password changed successfully"))
})


const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new apiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new apiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new apiResponse(200, user, "Account details updated successfully"))
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar file is missing");
    }

    // Fetch the current user data to get the existing avatar URL
    const user = await User.findById(req.user?._id).select("avatar");

    // Extract the public ID from the current avatar URL to delete the old image
    if (user && user.avatar) {
        const publicId = user.avatar.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId); // Delete old avatar from Cloudinary
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new apiError(400, "Error while uploading avatar");
    }

    // Update user with the new avatar URL
    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(new apiResponse(200, updatedUser, "Avatar image updated successfully"));
});




const updateProfile = asyncHandler(async(req,res)=>{

    const { fullname, email, bio, skills } = req.body;
        
    const file = req.file.path;


    const cloudResponse =await uploadOnCloudinary(file);



    let skillsArray;
    if(skills){
        skillsArray = skills.split(",");
    }
    const userId = req.user._id; 
    let user = await User.findById(userId);

    if (!user) {
        return res.status(400).json(new apiError(400,"User not found"));
    }

    if(fullname) user.fullName = fullname
    if(email) user.email = email
    if(bio) user.profile.bio = bio
    if(skills) user.profile.skills = skillsArray
  
    if(cloudResponse){
        user.profile.resume = cloudResponse.url 
        user.profile.resumeOriginalName = file.originalname 
    }


    await user.save();

    user = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profile: user.profile
    }

    return res.status(200).json(new apiResponse(200,"Profile updated successfully"));



})










export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateProfile
}