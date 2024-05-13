const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../../config/s3-config');

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '_' + file.originalname)
        }
    })
});

module.exports = upload;