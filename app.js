import express from "express";
import db from "./db/db";
import mysql from "mysql";
import databaseInfo from "./database";

//Connect to database
let connect = mysql.createPool(databaseInfo);

function getTransations(res,date) {
  let read_R = `SELECT*FROM transactions WHERE date <= '${date}'`;
  connect.getConnection(function(err, connection) {
    connection.query(read_R, function(err, data) {
      if (err) throw err;
      else {
        let dataHash = {};
        data.map((transaction)=>{
          if (!dataHash.hasOwnProperty(transaction["company"]))
          {
            dataHash[transaction["company"]] = {"quantity":transaction["quantity"],"cost":transaction["cost"]};
          }
          else
          {
            dataHash[transaction["company"]]["quantity"] += transaction["quantity"];
            dataHash[transaction["company"]]["cost"] += transaction["cost"]; 
          }
        });

        res.status(200).send({
          success: "true",
          message: "portfolio retrieved successfully",
          portfolios: dataHash
        });
      }
    });
    connection.release();
  });
}

function createTransaction(date,company,quantity,cost){
  var insert_R = "INSERT INTO transactions(date,company,quantity,cost) VALUE(?,?,?,?)";
  connect.getConnection(function(err,connection){
    connection.query(insert_R,[date,company,quantity,cost], function(err,res){
      if (err) throw err;
      else {
        console.log('Transaction added successfully');
      }
    });
    connection.release();
  });
}

let todayDate = new Date();

const app = express();
//Get all investments based on optional date
app.get("/carta/investments", (req, res) => {
  if (!req.query.date || new Date(req.query.date) > todayDate) {
    console.log(todayDate);
    getTransations(res,todayDate);
    
  } else {
    getTransations(res,req.query.date);
  }
});

//Create an investment based on optional date
// app.post()

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
