import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

//configure the cloudinary

// import {v2 as cloudinary} from 'cloudinary';
          
// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_SECRET 
//   });

//import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dptzi4pda', 
  api_key: '188163962262784', 
  api_secret: 'PWl1lONGe52W57D53rYQ5n_g6ek' 
});

//import {v2 as cloudinary} from 'cloudinary';
          
// cloudinary.config({ 
//   cloud_name: 'dptzi4pda', 
//   api_key: '188163962262784', 
//   api_secret: 'PWl1lONGe52W57D53rYQ5n_g6ek' 
// });

// cloudinary.config({ 
//     cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`, 
//     api_key: `${process.env.CLOUDINARY_API_KEY}`, 
//     api_secret: `${process.env.CLOUDINARY_SECRET}` 
//   });
  

const uploadOnCloudinary = async (localfilepath)=>{
    try {
        if(!localfilepath) return null;
        //upload file on cloudinary
        console.log("Local : ", localfilepath);
        const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type : "auto"
        })
        //file uploaded successfully
        console.log("File uploaded ", response.url);
        fs.unlinkSync(localfilepath)
        return response
    } catch (error) {
        console.log("ERROR : ", error)
        //fs.unlinkSync(localfilepath)//delete from local server
    }
}

export {uploadOnCloudinary};