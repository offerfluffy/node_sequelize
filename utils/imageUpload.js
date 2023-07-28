const CONSTANS = require("../constant");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(CONSTANS.FILES_PATH, "images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const imageUpload = multer({ storage: storage });

module.exports = imageUpload;
