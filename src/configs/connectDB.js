// get the client
// const mysql = require('mysql2');
import mysql from 'mysql2/promise'

// create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'nodejsbasic'
// });

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbasic'
});



export default pool;

// simple query

// connection.query(
//   'SELECT * FROM `user` ',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     let row =results.map((row)=>row.id);
//     console.log(row); 
    
//   }
// );