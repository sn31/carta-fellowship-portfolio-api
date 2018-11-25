/*eslint-disable class-methods-use-this*/

import getTransations from "../services/read-mysql";
import createTransaction from "../services/create-mysql";
import updateTransaction from "../services/update-mysql";

let todayDate = new Date();
class InvestmentsController {
  getAllInvestments(req, res) {
    if (!req.query.date || new Date(req.query.date) > todayDate) {
      getTransations(res, todayDate);
    } else {
      getTransations(res, req.query.date);
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
