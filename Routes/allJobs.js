const express = require("express");
const router = express.Router();
const Job = require("../Model/jobModal");
const Service = require("../Model/servicModal");

router.get("/status", async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalServices = await Service.countDocuments();

    res.json({ totalJobs, totalServices });
  } catch (error) {
    console.error("❌ Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

router.delete("/jobs/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
});


module.exports = router;
