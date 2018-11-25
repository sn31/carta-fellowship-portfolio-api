/*eslint-disable class-methods-use-this*/
import { getAllTransactions } from "../services/read-mysql";
import { getTransactions } from "../services/read-mysql";
import createTransaction from "../services/create-mysql";
import updateTransaction from "../services/update-mysql";

let todayDate = new Date();
class InvestmentsController {
  getAllInvestments(req, res) {
    if (!req.query.date || new Date(req.query.date) > todayDate) {
      getTransactions(res, todayDate, req.query.update_date);
    } else {
      getTransactions(res, req.query.date, req.query.update_date);
    }
  }
  getAllTransactions(req, res) {
    if (!req.query.date || new Date(req.query.date) > todayDate) {
      getAllTransactions(res, todayDate);
    } else {
      getAllTransactions(res, req.query.date);
    }
  }
  createInvestment(req, res) {
    createTransaction(
      res,
      req.query.date,
      req.query.company,
      req.query.quantity,
      req.query.cost
    );
  }

  updateInvestment(req, res) {
    updateTransaction(
      res,
      req.params.id,
      parseInt(req.query.quantity),
      parseInt(req.query.cost)
    );
  }
}

const investmentController = new InvestmentsController();
export default investmentController;
