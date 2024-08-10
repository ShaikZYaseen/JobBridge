import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js";
import { Company } from "../models/company.models.js";

const registerCompany = asyncHandler(async(req,res)=>{
    const {companyName} = req.body;
    if(!companyName){
        throw new apiError(400,"Company name is required!")
    }

    let company = await Company.findOne({ name: companyName });
        if (company) {
           throw new apiError(400,"Company with this name already exists!")
        };
        company = await Company.create({
            name: companyName,
            userId: req.user._id
        });

        return res.status(200)
        .json(   
        new apiResponse(200,company))

})




const getCompany = asyncHandler(async (req, res) => {
        const userId = req.user._id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json(new apiError(400,"Companies not found.."))
              
        }
        return res.status(200).json(new apiResponse(200,companies))
           
    
})



 const getCompanyById = asyncHandler(async (req, res) => {
    
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json(new apiError(400,"Company not found"))
                
        }
        return res.status(200).json(new apiResponse(200,company))
           
    } )


 const updateCompany = asyncHandler(async (req, res) => {
            const { name, description, website, location } = req.body;
     
            const file = req.file.path;
            console.log(file)
            // idhar cloudinary ayega
            const response =await uploadOnCloudinary(file);
            console.log(response.secure_url)
            const logo = response.secure_url;
        
            const updateData = { name, description, website, location, logo };
    
            const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

    
            if (!company) {
                return res.status(404).json(new apiError(400,"Company not found"))
            }

            return res.status(200).json(new apiResponse(200,"'Company information updated."))
               
    
        })
    


export {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany
}