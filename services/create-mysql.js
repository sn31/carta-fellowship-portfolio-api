import mysql from "mysql";
import databaseInfo from "../database";

let connect = mysql.createPool(databaseInfo);

export default function createTransaction(res, date, company, quantity, cost) {
  var insert_R =
    "INSERT INTO transactions(date,company,quantity,cost) VALUE(?,?,?,?)";
  connect.getConnection(function(err, connection) {
    connection.query(insert_R, [date, company, quantity, cost], function(
      err,
      investment
    ) {
      if (err) throw err;
      else {
        return res.status(201).send({
          success: "true",
          message: "Transaction added successfully",
          investment
        });
      }
    });
    connection.release();
  });
}
