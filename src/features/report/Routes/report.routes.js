// 1. Import express.
import express from 'express';
import ReportController from '../Controller/report.controller.js';

// 2. Initialize Express router.
const reportRouter = express.Router();

const reportController = new ReportController();

// All the paths to controller methods.
reportRouter.get('/:status', (req,res,next)=>{
    reportController.getReportsByStatus(req,res,next);
});

// Exporting Router
export default reportRouter;
