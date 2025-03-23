const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  description: { type: String, required: true },
  documents: { type: [String], required: true },
  price: { type: Number, required: true },
  applicationLink: { type: String, required: false } // ✅ New field for redirect link
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
