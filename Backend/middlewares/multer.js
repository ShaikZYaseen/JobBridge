import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

// Convert `import.meta.url` to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure directory exists or create it if not
const uploadDir = path.join(__dirname, '../temp');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Save files to ./temp
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original file name
    }
});

export const upload = multer({ 
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // Limit file size to 10 MB
    },
    fileFilter: function (req, file, cb) {
        // Allowed file types
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    }
});
