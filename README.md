# COVID-19 Hospital REST API

## Overview
This API is designed for doctors at a hospital allocated by the government for testing, quarantining, and ensuring the well-being of COVID-19 patients. It supports two types of users: Doctors and Patients. Doctors can register and log in to the system, register patients, and create patient reports.

## Features
- **Doctors**
  - Register and log in to receive a JWT token.
  - Register a new patient or retrieve existing patient information using their phone number.
  - After a checkup, doctors can create a report for the patient.
  - Log out to invalidate the JWT token.

- **Patients**
  - View reports by their IDs.
  - View reports of all patients.

- **Reports**
  - Patient reports include information about the doctor who created the report, the status of the patient (e.g., Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit), and the date of the report.

## Routes
- **Doctors**
  - `POST /doctors/register` - Register a new doctor account with username and password.
  - `POST /doctors/login` - Log in as a doctor to receive a JWT token.
  - `GET /doctors/logout` - Log out as a doctor (requires JWT).

- **Patients**
  - `POST /patients/register` - Register a new patient (requires JWT).
  - `POST /patients/:id/create_report` - Create a report for a patient (requires JWT).
  - `GET /patients/:id/all_reports` - List all reports of a patient from oldest to latest.

- **Reports**
  - `GET /reports/:status` - List all reports filtered by a specific status.

## Setup and Installation
1. **Clone the repository**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Environment variables**
   - Create a `.env` file in the root directory with the following variables:
     ```
     PORT=3000
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```

4. **Start the server**
    ```bash
    npm start
    ```

## Logging
- This application uses `winston` for logging. Log files are saved in the `logs.txt`.

## Swagger Documentation
- The API documentation is available at `/api-docs` when the server is running.

## Tools
- bcrypt
- dotenv
- express
- jsonwebtoken
- mongoose
- swagger-ui-express
- winston