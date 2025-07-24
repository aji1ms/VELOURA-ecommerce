const multer = require('multer');
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const fileUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        //Stream upload to claudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });  
                //convertion of file buffer to stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            }); 
        };

        //stream upload function
        const result = await streamUpload(req.file.buffer);

        //uploaded file image url 
        res.json({ imageUrl: result.secure_url });

    } catch (error) {
        console.log("Error in fileupload: ", error);
        res.status(500).send("server error");
    }
}

module.exports = {
    fileUpload,
}