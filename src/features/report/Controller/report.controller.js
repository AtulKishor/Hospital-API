// Imports
import ReportRepository from '../Model/report.repository.js';

// reportController class
export default class ReportController{
  
  // Constructor to initialize reportRepository to class object.
  constructor()
  {
      this.reportRepository = new ReportRepository();
  }
  
  
  async getReportsByStatus(req, res, next) {
    
    try {
      const status = req.params.status;
      // Find all reports with the specified status
      const reports = await this.reportRepository.getReportsByStatus(status);

      if (reports.length === 0) {
        res.status(404).json({
          success: false,  
          message: `No reports found with status: ${status}` 
        });
      } else {
        res.status(200).json({
          success: true, 
          message: `List of all the reports with ${status}`,
          reports: reports,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}