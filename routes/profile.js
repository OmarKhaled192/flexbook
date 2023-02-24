const express = require("express");
const router = express.Router();
const validator = require("../middlewares/userRegisterValidatorMW"); // note here
const multer = require("multer");
const path = require("path");

//---------------render profile main page---------------
router.get("/profile/:id",(req, res) => {
  setTimeout(() => {
    req.flash("PageTitle", "profile");
    res.status(200).render("pages/setProfileImages", {
      PageTitle: req.flash("PageTitle"),
      pathPersonIm: req.flash("pathPersonIm"),
      pathbackIm: req.flash("pathbackIm"),
    });
  }, 0);
});

// check file type
function checkFileType(file, cb) {
  // allowed ext
  const filetypes = /jpg|jpeg|png/;
  // check extention
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime types
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error : Images Only!");
  }
}

//--------------start upload back image------------
const storageBack = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/upload/backImages"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, "-")}_${file.originalname}`
    );
  },
});

const uploadBack = multer({
  storage: storageBack,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.post(
  "/upload_back_image",
  uploadBack.single("backImage"),
  (req, res) => {
    console.log("The filename is " + res.req.file.filename);
    req.flash("pathbackIm", `../upload/backImages/${res.req.file.filename}`);
    res.status(200).redirect("back");
  }
);

//--------------start upload person image-----------
const storagePersons = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/upload/personImages"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, "-")}_${file.originalname}`
    );
  },
});

const uploadPersons = multer({
  storage: storagePersons,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.post(
  "/upload_person_image",
  uploadPersons.single("personImage"),
  (req, res) => {
    console.log("The filename is " + res.req.file.filename);
    req.flash("pathPersonIm", `../upload/personImages/${res.req.file.filename}`);
    res.status(200).redirect("back");
  }
);


module.exports = router;
