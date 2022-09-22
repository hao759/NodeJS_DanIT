import express from "express";
import ApiController from '../controller/ApiController'
let router = express.Router(); //bik dday la route

const initAPRoute = (app) => {
  router.get("/users", ApiController.getAllUser);
  router.post("/createNewUser", ApiController.createNewUser);

  return app.use("/api/v1/", router);
  //phair co tien tố abc ví /abc/about
};

export default initAPRoute;
//module.export = initWebroute;
