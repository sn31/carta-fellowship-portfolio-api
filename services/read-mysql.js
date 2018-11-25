import mysql from "mysql";
import databaseInfo from "../database";

let connect = mysql.createPool(databaseInfo);

export default function getTransations(res, date, update_date) {
  let get_updates = `SELECT * FROM updates WHERE update_date <= '${update_date}'`;
  let read_R = `SELECT*FROM transactions WHERE date <= '${date}'`;
  connect.getConnection(function(err, connection) {
    let updateHash = {};
    connection.query(get_updates, function(err, data) {
      console.log(data);
      data.map(update => {
        updateHash[update["transaction_id"]] = {
          id: update["id"],
          new_quantity: update["new_quantity"],
          new_cost: update["new_cost"]
        };
      });
    });

    connection.query(read_R, function(err, data) {
      if (err) throw err;
      else {
        let dataHash = {};
        console.log(updateHash);
        data.map(transaction => {
          for (var update in updateHash) {
            if (!dataHash.hasOwnProperty(transaction["company"])) {
              dataHash[transaction["company"]] = {
                quantity: updateHash[update]["new_quantity"],
                cost: updateHash[update]["new_cost"]
              };
            } else {
              if (update !== transaction["id"]) {
                dataHash[transaction["company"]]["quantity"] +=
                  transaction["quantity"];
                dataHash[transaction["company"]]["cost"] += transaction["cost"];
              } else {
                dataHash[transaction["company"]]["quantity"] +=
                  updateHash[update]["new_quantity"];
                dataHash[transaction["company"]]["cost"] +=
                  updateHash[update]["new_cost"];
              }
            }
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
