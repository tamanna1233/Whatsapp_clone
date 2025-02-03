import multer from 'multer';
/* This code snippet is setting up a configuration for handling file uploads using the `multer`
middleware in a Node.js application. Here's a breakdown of what it does: */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/temp`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
export const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
});

/* The code snippet you provided is setting up a configuration for handling file uploads using the
`multer` middleware in a Node.js application. Specifically, the `filestorgage` constant is defining
a new instance of `multer.diskStorage` with custom configurations for storing uploaded files. */
const filestorgage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/files`);
    },
    filename: function (req, file, cb) {
        console.log('on');
        cb(null, `${Date.now()}${file.originalname}`);
    },
});
export const uploadFile = multer({ storage: filestorgage, limits: { fieldSize: 5 * 1024 * 1024 } });
