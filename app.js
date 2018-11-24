import express from "express";
import db from "./db/db";
import mysql from "mysql";
import databaseInfo from "./database";
import getTransations from "./services/read-mysql";
import createTransaction from "./services/create-mysql";
import updateTransaction from "./services/update-mysql";

let todayDate = new Date();

const app = express();
//Get all investments based on optional date
app.get("/carta/investments", (req, res) => {
  if (!req.query.date || new Date(req.query.date) > todayDate) {
    getTransations(res,todayDate);
    
  } else {
    getTransations(res,req.query.date);
  }
});

//Create an investment based on optional date
app.post("/carta/investments",(req,res)=>{
  createTransaction(res,req.query.date,req.query.company,req.query.quantity,req.query.cost);
})

app.put("/carta/investments/:id",(req,res)=>{
  updateTransaction(res,req.params.id,parseInt(req.query.quantity),parseInt(req.query.cost));
})
//Update an investment
app.put("/carta/investments")
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
