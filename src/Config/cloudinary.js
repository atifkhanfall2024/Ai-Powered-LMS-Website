/*const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const UploadCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // delete local file after successful upload
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err.message);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return null;
  }
};

module.exports = UploadCloudinary;*/
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

// ✅ Uploads buffer (no file system used)
const UploadCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) return null;

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error.message);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );

      // Pipe the buffer to the stream
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err.message);
    return null;
  }
};

module.exports = UploadCloudinary;

