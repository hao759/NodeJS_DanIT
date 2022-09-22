import express from "express";

const configViewEngine = (app) => {
  app.use(express.static("src/public")); // cho truy cap public
  app.set("view engine", "ejs");
  app.set("views", "src/view");
};

export default configViewEngine;
