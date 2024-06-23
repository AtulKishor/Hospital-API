// Imports
import handleDatabaseError from "../../../errors/databaseError.js";
import {reportModel} from '../Schema/report.schema.js';

export default class ReportRepository{
    // get reports by status
    async getReportsByStatus(status)
    {
        try {
            return await reportModel.find({ status }).select('-updatedAt -createdAt -__v')
            .populate('createdBy','name').populate('patient','name');
        } catch (error) {
            handleDatabaseError(error);
        }
    }    
}