import express from "express";
import homeController from "../controller/homeController";

//import getHomepage  from '../controller/homeController';

let router = express.Router(); //bik dday la route

const initWebroute = (app) => {
  router.get("/", homeController.getHomepage);
  router.post("/create-new-user", homeController.createNewUser);
  router.get("/detail/user/:userID", homeController.getDetailpage);
  router.get("/about", (req, res) => {
    res.send(`I'm Eric!`);
  });

  return app.use("/", router);
  //phair co tien tố abc ví /abc/about
};

export default initWebroute;
//module.export = initWebroute;
