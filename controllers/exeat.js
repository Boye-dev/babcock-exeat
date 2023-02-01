require("dotenv").config();
const express = require("express");
const router = express.Router();
const { isStudent, authorize, isAdmin } = require("../middleware/auth");
const Exeat = require("../models/exeat");
const jwt = require("jsonwebtoken");
const { getUserById } = require("../services/userWithRole");

router.post("/apply", isStudent, async (req, res) => {
  const { departDate, returnDate, type, address, reason, host } = req.body;
  const token =
    req.headers["x-access-token"] ||
    req.headers.authorization ||
    req.cookies.authToken;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("THE DECODED ", decoded);
    req.user = decoded;
    const user = await getUserById(req.user.id);
    console.log("The User", user);
    if (user[0] !== false) {
      const exeat = new Exeat({
        departDate,
        returnDate,
        type,
        address,
        reason,
        host,
        student: user[1],
      });

      try {
        const savedExeat = await exeat.save();
        res.status(201).json({
          success: true,
          data: savedExeat,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    } else {
      return res.status(400).json({
        error: "User does not exist",
        actualError: user[1],
        status: "NOT OK",
      });
    }
  } catch (error) {
    console.log("Invalid Token ", error);
  }
});

router.get("/admin-exeats", isAdmin, async (req, res) => {
  const token =
    req.headers["x-access-token"] ||
    req.headers.authorization ||
    req.cookies.authToken;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("THE DECODED ", decoded);
    req.user = decoded;
    try {
      const adminHall = req.user.hall;

      const exeats = await Exeat.find({
        "student.hall": adminHall,
      });

      res.json({
        success: true,
        exeats: exeats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve exeats",
        error: error.message,
      });
    }
  } catch (error) {
    console.log("Invalid Token ", error);
  }
});
router.get("/exeats", isAdmin, async (req, res) => {
  try {
    const exeats = await Exeat.find({});
    res.json(exeats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/exeats/:id/status", async (req, res) => {
  const token =
    req.headers["x-access-token"] ||
    req.headers.authorization ||
    req.cookies.authToken;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("THE DECODED ", decoded);
    req.user = decoded;
    try {
      const exeatId = req.params.id;
      const adminHall = req.user.hall;
      const exeat = await Exeat.findById(exeatId);

      if (!exeat) {
        return res.status(404).json({ msg: "Exeat not found" });
      }

      if (adminHall !== exeat.student.hall) {
        return res.status(403).json({ msg: "Access Denied" });
      }

      exeat.status = req.body.status;
      await exeat.save();

      return res.json({ msg: "Status updated successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server error" });
    }
  } catch (error) {
    console.log("Invalid Token ", error);
  }
});

router.get("/exeats/:status", isAdmin, async (req, res) => {
  const token =
    req.headers["x-access-token"] ||
    req.headers.authorization ||
    req.cookies.authToken;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("THE DECODED ", decoded);
    req.user = decoded;
    try {
      const adminHall = req.user.hall;
      const status = req.params.status;
      const exeats = await Exeat.find({ status: status });
      const filteredExeats = exeats.filter((exeat) => {
        return exeat.student.hall === adminHall;
      });
      res.json(filteredExeats);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } catch (error) {
    console.log("Invalid Token ", error);
  }
});

router.get("/exeat/:id", async (req, res) => {
  try {
    const exeat = await Exeat.findById(req.params.id);
    if (!exeat) return res.status(404).send("Exeat not found");
    console.log(exeat);
    res.send(exeat);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/student/exeat", isStudent, async (req, res) => {
  const token =
    req.headers["x-access-token"] ||
    req.headers.authorization ||
    req.cookies.authToken;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("THE DECODED ", decoded);
    req.user = decoded;
    try {
      const exeats = await Exeat.find({
        "student.userNumber": req.user.userNumber,
      });
      if (!exeats)
        return res.status(404).send("No exeats found for this student");
      res.send(exeats);
    } catch (error) {
      res.status(500).send("Server error: " + error);
    }
  } catch (error) {
    console.log("Invalid Token ", error);
  }
});
module.exports = router;
