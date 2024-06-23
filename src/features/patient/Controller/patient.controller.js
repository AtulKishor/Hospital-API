// Controller file of the patient which becomes mediator between routes and model file here.
// Imports
import PatientRepository from '../Model/patient.repository.js';
import ApplicationError from "../../../errors/applicationError.js";

// PatientController class
export default class PatientController{
  
  // Constructor to initialize PatientRepository to class object.
  constructor()
  {
      this.patientRepository = new PatientRepository();
  }
  
  async registerPatient(req, res, next) {
    try 
    {
      const { name, phone, addharNumber, city, } = req.body
      // Validate input data
      if (!name || !phone || !addharNumber || !city) {
        throw new ApplicationError('Missing required fields.' , 400);
      }

      // Check if the Aadhar number has exactly 12 digits
      if (addharNumber.toString().length !== 12) {
        throw new ApplicationError('Aadhar number must be exactly 12 digits.' ,400);
      }
      // Check if the Phone number has exactly 10 digits
      if (phone.toString().length !== 10) {
        throw new ApplicationError('Phone number must be exactly 10 digits.' ,400);
      }

      // Check if a patient with the provided Phone number already exists
      const existingPatient = await this.patientRepository.findByPhone(phone);

      if (existingPatient) {
        return res.status(201).json({
          success: true,
          Patient: existingPatient,
          message: "A patient already exists with this Aadhar Register"
        });
      }

      // Create the new patient
      const newPatient = {
        name,
        phone,
        city,
        addharNumber
      };
      const savedPatient = await this.patientRepository.signUp(newPatient);
      if(!savedPatient)
      {
        throw new ApplicationError("New Patient cannot be added. Something went wrong.", 400);
      }
      // Sending resonse.
      return res.status(201).json({
          success: true,
          Patient: savedPatient,
          message: "New Patient added successfully."
      });
    } catch (error) 
    {
      next(error);
    }
  }

  async createPatientReport(req, res, next) {
    try {
      // Extract the patient's ID from the URL parameters
      const patientId = req.params.id;

      // Check if the patient exists
      const patient = await this.patientRepository.findById(patientId);
      if(!patient){
        throw new ApplicationError(`No patient found by id: ${patientId}`, 404);
      }
      
      // Extract report details from the request body
      const { status } = req.body;
      if(!status){
        throw new ApplicationError( 'Please enter a status field (Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit)', 400);
      }
      
      const doctorId =  req.doctorId;

      const reportData = {
        createdBy: doctorId,
        patient: patientId,
        patientAadharNumber: patient.addharNumber, 
        status
      };

      const report = await this.patientRepository.createReport(reportData, patientId, doctorId);
      if(!report){
        return res.status(400).json({
            success: false,
            message: "Report can't be created. Something went wrong."
        });
      }

      res.status(201).json({
        success: true, 
        message: 'Patient report created successfully', 
        report
      });
    }
    catch (error) {
      next(error);
    }
  }

  async getAllReports(req, res, next) {
    const patientId = req.params.id;
    try {
      // Find all reports for the specified patient, ordered by date
      const reports = await this.patientRepository.getAllReports(patientId);
      if (reports.length === 0) {
        // No reports found for the specified patient
        res.status(404).json({
          success: false,  
          message: `No reports found for patient with ID: ${patientId}` 
        });
        } else {
        // Reports found for the specified patient
        res.status(200).json({
          success: true, 
          message: `All Reports of Patient with id -  ${patientId}`,
          reports: reports
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
