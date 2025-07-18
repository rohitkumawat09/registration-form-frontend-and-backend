import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 30,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    default:"",
    // match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    // required: true,
    default:"",
    // match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'],
  },
  dob: {
    type: Date,
    // required: true,
    default:"",
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
  parentName: {
    type: String,
    // required: true,
    default:"",
  },
  parentPhone: {
    type: String,
    // required: true,
    default:"",
    // match: [/^\d{10}$/, 'Parent phone number must be exactly 10 digits'],
  },
  localAddress: {
    type: String,
    required: true,
    default:"",
  },
  permanentAddress: {
    type: String,
    required: true,
    default:"",
  },
  occupation: {
    type: String,
    required: true,
    enum: ['Student', 'Working Professional'],
  },
  qualification: {
    type: String,
    default:"",
  },
  year: {
    type: String,
    default:"",
  },
  college: {
    type: String,
    default:"",
  },
  designation: {
    type: String,
    default:"",
  },
  company: {
    type: String,
    default:"",
  },
  course: {
    type: String,
    // required: true,
    default:"",
  },
  source: {
    type: String,
    // required: true,
    default:"",
  },
  friendName: {
    type: String,
    default:"",
  },

  aadhaarFront: {
    type: String, 
    required: true,
  },
  aadhaarBack: {
    type: String, 
    required: true,
  },
  agreed: {
    type: Boolean,
    required: true,
  }
}, {timestamps: true} );

export default mongoose.model("Form", formSchema);