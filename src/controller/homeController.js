import pool from "../configs/connectDB";
const multer = require("multer");
require('dotenv').config()
import nodemailer from "nodemailer"

let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM user ");
  return res.render("index.ejs", { dataUser: rows });
  console.log("check row", rows);
};

let getDetailpage = async (req, res) => {
  let id = req.params.userID; //phai la userID
  console.log(req.params);
  let user = await pool.execute("SELECT * FROM user  where id=?", [id]);
  return res.send(JSON.stringify(user[0]));
};

let createNewUser = async (req, res) => {
  console.log("lastName : ", req.body.lastName);
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "INSERT INTO `user`(`firstName`, `lastName`, `email`, `address`) VALUES (?,?,?,?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  await pool.execute("DELETE FROM `user` WHERE id=?", [req.body.userID]);
  return res.redirect("/");
};

let editUser = async (req, res) => {
  console.log("id");
  let id = req.params.userID;
  let [user] = await pool.execute("SELECT * FROM user  where id=?", [id]);
  return res.render("update.ejs", { dataUser: user });
};
let updateUser = async (req, res) => {
  let [user] = await pool.execute(
    "UPDATE `user` SET `firstName`=?,`lastName`=?,`email`=?,`address`=? WHERE id=?",
    [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.address,
      req.body.ID,
    ]
  );
  return res.redirect("/");
};

const upload = multer().single("profile_pic"); // 'profile_pic' is the name of our file input field in the HTML form

let getUploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

// let handleUploadFile = async (req, res) => {
//   upload(req, res, function (err) {
//     // req.file contains information of uploaded file
//     // req.body contains information of text fields, if there were any

//     if (req.fileValidationError) {
//       return res.send(req.fileValidationError);
//     } else if (!req.file) {
//       return res.send("Please select an image to upload");
//     } else if (err instanceof multer.MulterError) {
//       return res.send(err);
//     } else if (err) {
//       return res.send(err);
//     }

//     // Display uploaded image for user validation
//     res.send(
//       `You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`
//     );
//   });
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },

//   // By default, multer removes file extensions so let's add them back
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const imageFilter = function (req, file, cb) {
//   // Accept images only
//   if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//     req.fileValidationError = "Only image files are allowed!";
//     return cb(new Error("Only image files are allowed!"), false);
//   }
//   cb(null, true);
// };
// exports.imageFilter = imageFilter;










let testSendMail= async(req,res)=>{
  // let testAccount = await nodemailer.createTestAccount();
  let reciveEmail=req.body.reciveEmail;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "qhao74155@gmail.com", // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: reciveEmail,// "bar@example.com, baz@example.com", 
    subject: "Hello ✔", // Subject line
    text: "Hello world?DDaay la text", // plain text body
    html: "<b>Hello world? \n Ê thứ 7 html nek</b>", // html body
  });
}



module.exports = {
  getHomepage,
  getDetailpage,
  createNewUser,
  deleteUser,
  editUser,
  updateUser,
  getUploadFilePage,


  testSendMail
  // handleUploadFile,
};
// export default getHomepage;

// let data = [];
// connection.query("SELECT * FROM `user` ", function (err, results, fields) {
//   console.log(results); // results contains rows returned by server
//   results.map((row) => {
//     data.push({
//       id: row.id,
//       email: row.email,
//       address: row.address,
//       firstName: row.firstName,
//       lastName: row.lastName,
//     });
//   });
//
// });
