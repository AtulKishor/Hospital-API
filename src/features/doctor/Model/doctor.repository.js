// Doctor repository file here all Doctor database functions are handled.
// Imports
import ApplicationError from '../../../errors/applicationError.js'
import handleDatabaseError from "../../../errors/databaseError.js";
import { doctorModel } from "../Schema/doctor.schema.js";

// DoctorRepository class
export default class DoctorRepository{
    // Doctor signup
    async signUp(doctor)
    {
        try {
            const savedDoctor = await doctorModel.create(doctor);
            const doctorWithoutPassword = {...savedDoctor.toObject()};
            delete doctorWithoutPassword.password;
            return doctorWithoutPassword;
        } catch (error) {
            handleDatabaseError(error);
        }
    }

    async findByName(name)
    {
        try {
            return await doctorModel.findOne({name});
        } catch (error) {
            handleDatabaseError(error);
        }
    }

    // Find Doctor by email
    async findByEmail(email)
    {
        try {
            const doctor = await doctorModel.findOne({email});
            if(!doctor)
            {
                throw new ApplicationError("No Doctor found by this email.", 400);
            }
            return doctor;
        } catch (error) {
            handleDatabaseError(error);
        }
    }
}