// Controller file of the Doctors which becomes mediator between routes and model file here.
// Imports
import bcrypt from 'bcrypt';
import ApplicationError from "../../../errors/applicationError.js";
import DoctorRepository from "../Model/doctor.repository.js";
import jwt from 'jsonwebtoken';

// DoctorController class
export default class DoctorController{
    
    // Constructor to initialize DoctorRepository to class object.
    constructor()
    {
        this.doctorRepository = new DoctorRepository();
    }

    // Register a new Doctor account.
    async signUp(req,res,next){
        try {
            const {name,email,password,gender} = req.body;
            // Validate input data
            if (!name || !password ) {
              throw new ApplicationError('Missing required fields.' , 400);
            }

            // Check if a doctor with the same name already exists
            if (await this.doctorRepository.findByName(name)) {
              throw new ApplicationError('A Doctor already exists by that name', 400);
            }

            // Hashing The password for security.
            const hashedPassword = await bcrypt.hash(password, 12);
            if(!hashedPassword)
            {
              throw new ApplicationError("Having issue in hashing the password", 400);
            }
            // Creating Doctor object.
            const doctor = {name,email,password: hashedPassword,gender};
            // Calling signUp function in repository.
            const newDoctor = await this.doctorRepository.signUp(doctor);
            if(!newDoctor)
            {
                throw new ApplicationError("New Doctor cannot added something went wrong.", 400);
            }
            // Sending response.
            return res.status(201).json({
                success: true,
                Doctor: newDoctor,
                message: "New Doctor added successfully."
            });
        } catch (error) {
            next(error);
        }
    }

    // Log in as a Doctor.
    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
    
            // Check for missing email or password.
            if (!email) {
                throw new ApplicationError("Please enter email", 400);
            } else if (!password) {
                throw new ApplicationError("Please enter password", 400);
            }
    
            // Find Doctor by email.
            const doctor = await this.doctorRepository.findByEmail(email);
            if (!doctor) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Credentials(Email don't exist)"
                });
            }
    
            // Compare password with hashed password.
            const passwordMatch = await bcrypt.compare(password, doctor.password);
    
            if (passwordMatch) {
                // Create a token with Doctor information
                const token = jwt.sign(
                    { doctorId: doctor._id, email: doctor.email },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: '1h' }
                );
    
                // Send token in response upon successful login.
                return res.status(200).json({
                    success: true,
                    message: "Doctor sign-in successful",
                    token: token
                });
            } else {
                // Invalid password.
                return res.status(400).json({
                    success: false,
                    message: "Invalid Credentials(Invalid password)"
                });
            }
        } catch (error) {
            // Handle any unexpected error.
            next(error);
        }
    }

    // Log out as a Doctor.
    logout(req, res, next) {
        res.send(200).json({
            success: true,
            message: "Doctor sign-out successful"
        })
    }
}