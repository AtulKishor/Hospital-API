// 1. Import express.
import express from 'express';
import DoctorController from '../Controller/doctor.controller.js';
import jwtAuth from '../../../middlewares/jwt.middleware.js';

// 2. Initialize Express router.
const doctorRouter = express.Router();

// Contoller object to access controller functions.
const doctorController = new DoctorController();

// All the paths to controller methods.
// Authentication Routes

// Register a new Doctor account.
doctorRouter.post('/register', (req,res,next)=>{
    doctorController.signUp(req,res,next);
})

// Log in as a Doctor.
doctorRouter.post('/login', (req,res,next)=>{
    doctorController.signIn(req,res,next);
})

// Log out as a Doctor.
doctorRouter.get('/logout', jwtAuth, (req,res,next)=>{
    doctorController.logout(req,res,next);
})

// Exporting Router
export default doctorRouter;