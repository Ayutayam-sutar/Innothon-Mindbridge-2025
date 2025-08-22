// models/Consultation.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsultationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user', // Links this request to a specific user
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorSpecialty: {
    type: String,
    required: true,
  },
  requestedDate: {
    type: Date,
    required: true,
  },
  notes: { // Any extra message the user wants to add
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Canceled'],
    default: 'Pending',
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('consultation', ConsultationSchema);