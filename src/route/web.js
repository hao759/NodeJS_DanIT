import express from "express";
import homeController from "../controller/homeController";
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "/public"));
  },
  filename: function (req, file, cb) {
    cb(null, "-1" + file.originalname);
  },
  zzz: function (req, file, cb) {
    cb(null, req);
  },
});
const upload = multer({ storage });
let router = express.Router(); //bik dday la route

const initWebroute = (app) => {
  router.get("/", homeController.getHomepage);
  router.post("/create-new-user", homeController.createNewUser);
  router.get("/detail/user/:userID", homeController.getDetailpage);
  router.post("/deleteUser", homeController.deleteUser);
  router.get("/editUser/:userID", homeController.editUser); //id sai ??
  router.post("/Update-user", homeController.updateUser);

  router.post("/getdetailimg", upload.single("Fileenek"), (req, res) => {
    console.log("===========");

    console.log(req);
    console.log(req.file);
    return res.json({
      res: req.body,
    });
  });

  router.post("/testSendMail", homeController.testSendMail);

  // router.get("/uploadFile", homeController.getUploadFilePage);E:\Code\VisualCode\Node\node-js-basic-hoidanit\src\public\-DuocTonGia.png
  // router.post("/upload-profile-pic", homeController.handleUploadFile);

  router.get("/about", (req, res) => {
    res.send(`I'm Eric!`);
  });

  return app.use("/", router);
  //phair co tien tố abc ví /abc/about
};

export default initWebroute;
//module.export = initWebroute;
