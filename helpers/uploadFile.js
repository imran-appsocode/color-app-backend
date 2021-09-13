const multer = require("multer");
const randomstring = require("randomstring");

const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
        cb(null, true);
    } else {
        cb("Please upload only csv file.", false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        // console.log(file.originalname);
        cb(null, `${randomstring.generate(7)}-${file.originalname}`);
    },
});

var uploadFile = multer({ storage: storage });
module.exports = uploadFile;