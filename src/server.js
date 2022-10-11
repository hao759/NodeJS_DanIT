import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebroute from "./route/web";
import initAPIRoute from "../src/route/api";

require("dotenv").config();
const app = express();
const port = process.env.PORT || 8079; //backup code

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app); // confige view

initWebroute(app); // confige route
// app.get('/', (req, res) => {
//     res.render('test/index.ejs')
// })
app.use((req,res)=>{
  return res.render('404.ejs')
})
initAPIRoute(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
