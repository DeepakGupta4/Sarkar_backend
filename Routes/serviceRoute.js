const express = require("express");
const { body, validationResult } = require("express-validator"); // ✅ Input validation
const Service = require("../Model/servicModal.js");

const router = express.Router();

// ✅ Get All Services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "Server error. Could not fetch services." });
  }
});

// ✅ Get a Single Service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: "Invalid service ID" });
  }
});

// ✅ Add New Service
router.post(
  "/add",
  [
    body("name").notEmpty().withMessage("Service name is required"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a non-negative number"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, price, description, icon = "🛠️" } = req.body;
      const newService = new Service({ name, price, description, icon });
      await newService.save();

      res.status(201).json({ message: "Service added successfully!", service: newService });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// ✅ Delete Service by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    res.json({ message: "Service deleted successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Invalid service ID" });
  }
});

// ✅ Update Service by ID
router.put(
  "/update/:id",
  [
    body("name").optional().notEmpty().withMessage("Service name cannot be empty"),
    body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a valid number"),
    body("description").optional().notEmpty().withMessage("Description cannot be empty"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, price, description, icon } = req.body;
      const updatedService = await Service.findByIdAndUpdate(
        req.params.id,
        { name, price, description, icon },
        { new: true }
      );

      if (!updatedService) return res.status(404).json({ error: "Service not found" });

      res.json({ message: "Service updated successfully!", service: updatedService });
    } catch (error) {
      res.status(400).json({ error: "Invalid service ID" });
    }
  }
);

module.exports = router;
