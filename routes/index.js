import express from "express";
import investmentController from "../portfolioControllers/investments";

const router = express.Router();

router.get("/carta/investments",investmentController.getAllInvestments);
router.post("/carta/investments",investmentController.createInvestment);
router.put("/carta/investments/:id",investmentController.updateInvestment);

export default router;