import express from 'express';
import PatientController from '../Controller/patient.controller.js';
import jwtAuth from '../../../middlewares/jwt.middleware.js';
import loggerMiddleware from '../../../middlewares/logger.middleware.js';

// Initialize Express router.
const patientRouter = express.Router();
// Contoller object to access controller functions.
const patientController = new PatientController();

// 1. doctor can registers patient
patientRouter.post('/register', jwtAuth, loggerMiddleware, (req,res,next)=>{
    patientController.registerPatient(req,res,next)
});
// 2. doctor can create report of patient
patientRouter.post('/:id/create_report', jwtAuth, loggerMiddleware, (req,res,next)=>{
    patientController.createPatientReport(req,res,next)
});

patientRouter.get('/:id/all_reports', (req,res,next)=>{
    patientController.getAllReports(req,res,next)
});

export default patientRouter;