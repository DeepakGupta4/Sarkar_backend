const express = require("express");
const Job = require("../Model/jobModal.js");
const router = express.Router();

// Add Job
router.post("/add", async (req, res) => {
    try {
      const { jobTitle, company, location, salary, description, documents, price, applicationLink } = req.body;
  
      // Check if the same job already exists (only by jobTitle and company)
      const existingJob = await Job.findOne({ jobTitle, company });
  
      if (existingJob) {
        return res.status(400).json({ message: "Job already registered with the same title and company" });
      }
  
      // Ensure absolute URL for the application link
      const formattedApplicationLink = applicationLink.startsWith("http") ? applicationLink : `https://${applicationLink}`;
  
      // Save the new job
      const newJob = new Job({
        jobTitle,
        company,
        location,
        salary,
        description,
        documents,
        price,
        applicationLink: formattedApplicationLink, // ✅ Fixed variable name
      });
  
      await newJob.save();
      res.status(201).json({ message: "Job added successfully", job: newJob });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Get All Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Job
router.put("/update/:id", async (req, res) => {
  try {
    const { jobTitle, company, location, applicationLink } = req.body;

    // Check if job with the same title, company, and location already exists (excluding current job)
    const existingJob = await Job.findOne({
      jobTitle, company, location, _id: { $ne: req.params.id }
    });

    if (existingJob) {
      return res.status(400).json({ message: "Job already registered with the same details" });
    }

    // Update job including application link
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job updated successfully", job: updatedJob });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Job
router.delete("/delete/:id", async (req, res) => {
    try {
      const job = await Job.findByIdAndDelete(req.params.id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json({ message: "Job deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
