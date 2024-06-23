// Importing env
import {} from './env.js';

// Modules Imported
import express from 'express';
import swagger from 'swagger-ui-express';
import apiDocs from './swagger.json' assert {type: 'json'};

// Routers Imported
import doctorRouter from './src/features/doctor/Routes/doctor.routes.js';
import patientRouter from './src/features/patient/Routes/patient.routes.js';
import reportRouter from './src/features/report/Routes/report.routes.js';

// Middlewares
import { errorHandlerMiddleware } from './src/middlewares/error-handler.middleware.js';
import { connectUsingMongoose } from './config/mongooseConfig.js';

// Server Created
const app = express();
const PORT = process.env.PORT || 8000;

// Json parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api-docs', swagger.serve, swagger.setup(apiDocs));

// Routes related to all features
app.use('/doctors', doctorRouter);
app.use('/patients', patientRouter);
app.use('/reports', reportRouter);

// Default route
app.get('/', (req,res)=>{
    res.status(200).send("Welcome to the COVID-19 Hospital REST-API's");
});

// Error handler
app.use(errorHandlerMiddleware);

// 404 Route middelware handles 404 requests
// app.use((req,res)=>{
//     res.status(404).send("API not found please give valid API.");
// });

// Server is listening here
app.listen(PORT, ()=>{
    console.log(`Server is listening on: localhost:${PORT}`);
    connectUsingMongoose();
});