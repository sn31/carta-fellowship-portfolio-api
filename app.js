import express from "express";
import db from "./db/db";
import mysql from 'mysql';
import databaseInfo from './database';

//Connect to database
let connection = mysql.createConnection(databaseInfo);
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

let todayDate = new Date();

const app = express();
//Get all investments based on optional date
app.get("/carta/investments", (req, res) => {
  if (!req.query.date || new Date(req.query.date) > todayDate) {
    res.status(200).send({
      success: "true",
      message: "portfolio retrieved successfully",
      date: todayDate, //don't need to show this
      portfolios: db
    });
  } else {
    res.status(200).send({
      success: "true",
      message: "portfolio retrieved successfully",
      date: req.query.date, //don't need to show this
      portfolios: db
    });
  }
});

//Create an investment based on optional date
// app.post()

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
