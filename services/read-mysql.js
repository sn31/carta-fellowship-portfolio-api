import mysql from "mysql";
import databaseInfo from "../database";

let connect = mysql.createPool(databaseInfo);

export function getTransactions(res, date, update_date) {
  let get_updates = `SELECT * FROM updates WHERE update_date <= '${update_date}'`;
  let read_R = `SELECT*FROM transactions WHERE date <= '${date}'`;

  connect.getConnection(function(err, connection) {
    let updateHash = {};
    connection.query(get_updates, function(err, dataU) {
      dataU.map(update => {
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
        data.map(transaction => {
          if (!dataHash.hasOwnProperty(transaction["company"])) {
            if (updateHash.hasOwnProperty(transaction["id"]) === true) {
              dataHash[transaction["company"]] = {
                quantity: updateHash[transaction["id"]]["new_quantity"],
                cost: updateHash[transaction["id"]]["new_cost"]
              };
            } else {
              dataHash[transaction["company"]] = {
                quantity: transaction["quantity"],
                cost: transaction["cost"]
              };
            }
          } else {
            if (updateHash.hasOwnProperty(transaction["id"]) === true) {
              dataHash[transaction["company"]]["quantity"] +=
                updateHash[transaction["id"]]["new_quantity"];
              dataHash[transaction["company"]]["cost"] +=
                updateHash[transaction["id"]]["new_cost"];
            } else {
              dataHash[transaction["company"]]["quantity"] +=
                transaction["quantity"];
              dataHash[transaction["company"]]["cost"] += transaction["cost"];
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

export function getAllTransactions(res, date) {
  let read_R = `SELECT*FROM transactions WHERE date <= '${date}'`;

  connect.getConnection(function(err, connection) {
    connection.query(read_R, function(err, data) {
      if (err) {
        return res.status(400).send({
          success: "false",
          err
        });
      } else {
        console.log(data);
        res.status(200).send({
          success: "true",
          message: "all transactions retrieved successfully",
          portfolios: data
        });
      }
    });
    connection.release();
  });
}
