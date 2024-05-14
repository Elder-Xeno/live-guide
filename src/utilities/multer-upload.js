const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../../config/s3-config');

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        key: function (req, file, cb) {
            console.log('Uploading file:', file.originalname);
            cb(null, `${Date.now().toString()}_${file.originalname}`);
        }
    })
});

module.exports = upload;