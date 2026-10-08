const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanPhone = String(phone || "").trim();
    const cleanPassword = String(password || "");

    if (!cleanName || !cleanEmail || !cleanPhone || !cleanPassword) {
      return res.status(400).json({
        success: false,
        message: "All registration fields are required"
      });
    }

    if (cleanPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters"
      });
    }

    const [existingUsers] = await pool.query(
      `
      SELECT id, email, phone
      FROM users
      WHERE LOWER(email) = LOWER(?) OR phone = ?
      LIMIT 1
      `,
      [cleanEmail, cleanPhone]
    );

    if (existingUsers.length > 0) {
      if (
        String(existingUsers[0].email).toLowerCase() === cleanEmail
      ) {
        return res.status(409).json({
          success: false,
          message: "This email is already registered. Please login."
        });
      }

      return res.status(409).json({
        success: false,
        message: "This phone number is already registered. Please login."
      });
    }

    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    const [result] = await pool.query(
      `
      INSERT INTO users
        (name, email, password, phone, role)
      VALUES
        (?, ?, ?, ?, 'customer')
      `,
      [cleanName, cleanEmail, hashedPassword, cleanPhone]
    );

    const [users] = await pool.query(
      `
      SELECT id, name, email, phone, role, created_at
      FROM users
      WHERE id = ?
      `,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: users[0]
    });
  } catch (error) {
    console.error("Register error:", error.message);

    res.status(500).json({
      success: false,
      message: "Registration failed"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const loginValue = String(emailOrPhone || "").trim();
    const cleanPassword = String(password || "");

    if (!loginValue || !cleanPassword) {
      return res.status(400).json({
        success: false,
        message: "Email/phone and password are required"
      });
    }

    const [users] = await pool.query(
      `
      SELECT id, name, email, phone, password, role
      FROM users
      WHERE LOWER(email) = LOWER(?) OR phone = ?
      LIMIT 1
      `,
      [loginValue, loginValue]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Account not found. Please register first."
      });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(
      cleanPassword,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email/phone or password"
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
});

module.exports = router;