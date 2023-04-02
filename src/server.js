import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebroute from "./route/web";
import initAPIRoute from "../src/route/api";
const swaggerJDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 8079; //backup code

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app); // confige view

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node JS API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:9090/",
      },
    ],
  },
  // apis: ["./server.js"],
  apis: ["./api.js"],
};
const swaggerSpec = swaggerJDoc(options);
app.use("/api_docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// initWebroute(app); // confige route
// app.get('/', (req, res) => {
//     res.render('test/index.ejs')
// })
app.use((req, res) => {
  return res.render("popup.ejs");
});
initAPIRoute(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
