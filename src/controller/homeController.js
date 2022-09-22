import pool from "../configs/connectDB";


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
  return res.render("../view/update.ejs", { dataUser: user });
};
let updateUser = async (req, res) => {
  let [user] = await pool.execute(
    "UPDATE `user` SET `firstName`=?,`lastName`=?,`email`=?,`address`=? WHERE id=?",
    [req.body.firstName, req.body.lastName, req.body.email, req.body.address,req.body.ID]
  );
  return res.redirect("/");
};

module.exports = {
  getHomepage,
  getDetailpage,
  createNewUser,
  deleteUser,
  editUser,
  updateUser,
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
