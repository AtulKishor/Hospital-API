// patient schema is here all patient have these fields.

import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    addharNumber:{
        type: Number,
        required: true,
    },
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report',
        }
    ]
}, {
    timestamps: true
});

export const patientModel = mongoose.model('Patient', patientSchema);
