const multer = require("multer");
const path =require("path")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // generate the public name, removing problematic characters
    const originalName = encodeURIComponent(
      path.parse(file.originalname).name
    ).replace(/[^a-zA-Z0-9]/g, "");
    const timestamp = Date.now();
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, originalName + "_" + timestamp + extension);
  },
});

 const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mb
});



module.exports = { upload };
