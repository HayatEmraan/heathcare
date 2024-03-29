import { unlink } from "fs";
import multer from "multer";
import cloudinary from "cloudinary";
import { cloudImage } from "../config";
import appError from "../errors/appError";

cloudinary.v2.config({
  cloud_name: cloudImage.cloudName,
  api_key: cloudImage.apiKey,
  api_secret: cloudImage.apiSecret,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });

export const uploadCloud = async (filePath: string) => {
  const result = await cloudinary.v2.uploader.upload(
    filePath,
    { upload_preset: cloudImage.uploadPreset },
    (error, result) => {
      if (error) {
        throw new appError("Image uploading failed", 500);
      }
      return result;
    }
  );

  await remove(filePath);
  return result;
};

export const remove = async (path: string) => {
  unlink(path, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("file deleted successfully");
  });
};
