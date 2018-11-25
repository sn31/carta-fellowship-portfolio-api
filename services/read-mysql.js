import mysql from "mysql";
import databaseInfo from "../database";

let connect = mysql.createPool(databaseInfo);

export default function getTransations(res, date) {
  let read_R = `SELECT*FROM transactions WHERE date <= '${date}'`;
  connect.getConnection(function(err, connection) {
    connection.query(read_R, function(err, data) {
      if (err) throw err;
      else {
        let dataHash = {};
        data.map(transaction => {
          if (!dataHash.hasOwnProperty(transaction["company"])) {
            dataHash[transaction["company"]] = {
              quantity: transaction["quantity"],
              cost: transaction["cost"]
            };
          } else {
            dataHash[transaction["company"]]["quantity"] +=
              transaction["quantity"];
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
