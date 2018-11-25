import mysql from 'mysql';
import databaseInfo from '../database';

let updateDate = new Date();
let connect = mysql.createPool(databaseInfo);

export default function updateTransaction(res,id,company,newQuantity,newCost){
    let update_R = "INSERT INTO updates(transaction_id,company,update_date,new_quantity,new_cost) VALUE(?,?,?,?,?)";
    connect.getConnection(function(err,connection){
        connection.query(update_R,[id,company,updateDate,newQuantity,newCost],function(err,transaction){
            if (err) throw err;
            else
            {
                return res.status(200).send({
                    success:"true",
                    message:"Transaction has been updated",
                    transaction
                });
            }
        });
        connection.release();
    })
}