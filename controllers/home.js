/* General/Home route*/
require("dotenv").config();
const express = require("express");
const router = express.Router();
const { isAdmin, authorize, isActive } = require("../middleware/auth");

router.get("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.json({ message: "Logout Successful" });
});

module.exports = router;
