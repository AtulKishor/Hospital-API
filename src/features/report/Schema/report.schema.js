// Report schema Report should have these fields.
import mongoose from "mongoose";

export const reportSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.ObjectId,
        required:  true,
        ref: 'Doctor'
    },
    patient: {
        type: mongoose.Schema.ObjectId,
        required:  true,
        ref: 'Patient'
    },
    patientAadharNumber:{
      type:Number,
      ref: 'Patient',
     },
    status:{
      type: String, 
      enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'], 
      required: true
    },
    date:{
      type: Date,
      default: Date.now
    }
  },{
    timestamps: true
  });

// Report Model
export const reportModel = mongoose.model('Report', reportSchema);