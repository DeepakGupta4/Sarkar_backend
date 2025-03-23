const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModal.js");
const router = express.Router();

const SECRET_KEY = "secretkey";

// Hardcoded Admin Credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Only Allow Hardcoded Admin Login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ userId: "admin123", role: "admin" }, SECRET_KEY, { expiresIn: "1d" });

      return res.json({
        message: "Admin login successful",
        user: { name: "Admin", email, role: "admin" },
        token,
      });
    }

    // ❌ Block Other Users
    return res.status(403).json({ message: "Access denied! Only admin can login." });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

