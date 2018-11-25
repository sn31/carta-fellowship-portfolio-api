import express from "express";
import investmentController from "../portfolioControllers/investments";

const router = express.Router();

router.get("/carta/investments",investmentController.getAllInvestments);
router.get("/carta/investments/transactions",investmentController.getAllTransactions);
router.post("/carta/investments",investmentController.createInvestment);
router.put("/carta/investments/:id",investmentController.updateInvestment);

export default router;