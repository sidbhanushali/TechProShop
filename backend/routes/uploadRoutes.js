import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    //add uploads file from root dir
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      //null for the error
      null, //change uploaded file name to filename-DATENOW().fileExt
      //node.js path module to get the extension of the file
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
//create a custom function to check the file type (filter for .png upload files only
function checkFileType(file, cb) {
  //test the possible file types against the filetype of the upload object
  const filetypes = /jpg|jpeg|png/;
  //.test()returns BOOL
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // mimetype is where .jpeg = img/jpeg
  //.test()returns BOOL
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

//this is what gets passed into our route
const upload = multer({
  //pass in the created storage object and create a custom function to check the file type (filter for .png upload files only)
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

//upload object has .single method so we only want 1 image at a time per upload
router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
