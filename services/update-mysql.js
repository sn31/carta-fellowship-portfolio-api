import mysql from 'mysql';
import databaseInfo from '../database';

let connect = mysql.createPool(databaseInfo);

export default function updateTransaction(res,id,newQuantity,newCost){
    let update_R = "UPDATE transactions SET `quantity` = ?,`cost` = ? WHERE `id` = ?";
    connect.getConnection(function(err,connection){
        connection.query(update_R,[newQuantity,newCost,id],function(err,transaction){
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