// Imports
import ApplicationError from "../../../errors/applicationError.js";
import handleDatabaseError from "../../../errors/databaseError.js";
import {reportModel} from '../../report/Schema/report.schema.js';
import {doctorModel} from '../../doctor/Schema/doctor.schema.js';
import {patientModel} from '../Schema/patient.schema.js';

export default class PatientRepository{
    // Doctor signup
    async signUp(patient)
    {
        try {
            return await patientModel.create(patient);
        } catch (error) {
            handleDatabaseError(error);
        }
    }

    async findByPhone(phone)
    {
        try {
            return await patientModel.findOne({phone});
        } catch (error) {
            handleDatabaseError(error);
        }
    }

    // Find Patient by id
    async findById(id)
    {
        try {
            const patient = await patientModel.findById(id);
            if(!patient)
            {
                throw new ApplicationError("No patient found by this id.", 400);
            }
            return patient;
        } catch (error) {
            handleDatabaseError(error);
        }
    }

    // Create report
    async createReport(reportData, patientId, doctorId)
    {
        try {
            const report = await reportModel.create(reportData);
            await patientModel.findByIdAndUpdate(patientId,{$push: {reports: report._id}});
            await doctorModel.findByIdAndUpdate(doctorId,{$addToSet: {patients: patientId}});
            
            return report;
        } catch (error) {
            handleDatabaseError(error);
        }
    }

    // get all reports
    async getAllReports(id){
        try{
            return await reportModel.find({ patient: id })
            .select('-updatedAt -createdAt -__v').sort({ date: 1 })
            .populate('createdBy','name').populate('patient','name');
        } catch (error) {
            handleDatabaseError(error);
        }
    }

}