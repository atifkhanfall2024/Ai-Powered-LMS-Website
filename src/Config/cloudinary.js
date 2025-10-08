const cloudinary = require("cloudinary").v2;
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

module.exports = UploadCloudinary;
