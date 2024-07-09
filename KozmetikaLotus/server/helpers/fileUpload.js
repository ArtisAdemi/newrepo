const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import UUID library

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
        cb('Error: Images Only!');
    }
}

// Set storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Construct the correct path by moving up one directory from 'server' and then into 'client/public/uploads'
        const uploadPath = path.join(__dirname, '../../client/public/uploads');
        cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
        const uniqueFileName = uuidv4(); // Generate a unique identifier for the file
        cb(null, uniqueFileName + path.extname(file.originalname)); // Append the unique identifier to the file name
    }
});

// Initialize upload for multiple files
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array('uploadedFiles', 5); // Adjust to accept multiple files, e.g., up to 5 images

// Middleware function to handle multiple file uploads
const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      if (req.files.length === 0) {
        res.status(400).json({ error: 'No files selected!' });
      } else {
        // If you need to do something with the uploaded files, you can access them as req.files
        req.uploadedFiles = req.files;
        next();
      }
    }
  });
};

module.exports = handleFileUpload;
