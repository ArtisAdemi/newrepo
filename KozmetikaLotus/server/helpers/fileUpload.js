const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Import UUID library
const env = process.env.NODE_ENV || "development";

// Define the checkFileType function
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Construct the correct path by moving up one directory from 'server' and then into 'client/public/uploads'
    if (env !== "test") {
      const uploadPath = path.join(__dirname, "../build/uploads");
      cb(null, uploadPath);
    } else {
      const uploadPath = path.join(__dirname, "../../client/public/uploads");
      cb(null, uploadPath);
    }
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${file.originalname}-${uuidv4()}`; // Generate a unique identifier for the file
    cb(null, uniqueFileName + path.extname(file.originalname)); // Append the unique identifier to the file name
  },
});

// Initialize upload for multiple files
const upload = multer({
  storage: storage,
  limits: { fileSize: 7000000 }, // Limit file size
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("uploadedFiles", 10); // Adjust to accept multiple files, e.g., up to 5 images

// Middleware function to handle multiple file uploads
const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      if (!req.files || req.files.length === 0) {
        // If no files are uploaded, proceed without error
        req.uploadedFiles = [];
        next();
      } else {
        // If files are uploaded, proceed as usual
        req.uploadedFiles = req.files;
        next();
      }
    }
  });
};

module.exports = handleFileUpload;
