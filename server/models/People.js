import mongoose from 'mongoose';

const PeopleSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  empId: {
    type: String,
    unique: true,
  },
  nameWithInitials: {
    type: String,
    required: true,
  },
  prefferedName: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  designation: {
    type: String,
  },
  empType: {
    type: String,
  },
  joinedDate: {
    type: Date,
  },
  experience: {
    type: String,
  },
  salary: {
    type: Number,
  },
  personalNotes: {
    type: String,
  },
});

export default mongoose.model('People', PeopleSchema);
