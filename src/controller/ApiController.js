import pool from "../configs/connectDB";

let getAllUser = async(req,res)=>{

    const [rows, fields] = await pool.execute("SELECT * FROM user ");

    return res.status(200).json({
        message: 'ok',
        data : rows
    })
}

let createNewUser = async(req,res)=>{
    let { firstName, lastName, email, address } = req.body;
    await pool.execute(
        "INSERT INTO `user`(`firstName`, `lastName`, `email`, `address`) VALUES (?,?,?,?)",
        [firstName, lastName, email, address]
      );

    return res.status(222).json({
        message: 'ok'
        
    })
}

module.exports={
    getAllUser,createNewUser
}