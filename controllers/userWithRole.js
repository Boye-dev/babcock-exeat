require("dotenv").config();
const express = require("express");
const router = express.Router();

// Auth Middleware
const { authorize, isAdmin, isActive } = require("../middleware/auth");
const {
  createUserWithRole,

  authenticateUserWithRole,
} = require("../services/userWithRole");
const { translateError } = require("../services/mongo_helper");
const {
  userWithRoleSignupValidator,
  validate,
  loginValidator,
} = require("../services/validation");

const UserWithRole = require("../models/userWithRole");

//An admin (The Default Admin) must be logged in before any new admin can be created.
router.post(
  "/signup",
  isAdmin,
  isActive,
  userWithRoleSignupValidator(),
  validate,
  async (req, res) => {
    console.log("signing up");
    try {
      console.log("Signup User");
      console.log("The req body ", req.body);

      const { firstname, lastname, userNumber, password, role, hall } =
        req.body;

      let check = await createUserWithRole({
        firstname,
        lastname,
        userNumber,
        password,
        role,
        hall,
      });
      console.log(`${role} creation `, check);
      if (check[0] !== false) {
        let admin = check[1];
        console.log(`The ${role} `, admin);
        res.json({ message: `New ${role} Signup successful `, status: "OK" });
      } else {
        return res.status(400).json({
          error: "Something went wrong.",
          actualError: check[1],
          status: "NOT OK",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Something went wrong",
        actualError: translateError(error),
        status: "NOT OK",
      });
    }
  }
);

router.post("/login", loginValidator, async (req, res) => {
  try {
    const { userNumber, password } = req.body;
    let userExists = await authenticateUserWithRole(userNumber, password);
    console.log("The User Exists ", userExists);

    if (userExists[0] == true) {
      userExists = userExists[1];

      //Create token
      const token = userExists.token;
      //Save token in a cookie and send back to the frontend
      res.cookie("authToken", token, {
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24, //Cookie expires after 24hours of being logged in.. 1000 milliseconds * 60seconds * 60minutes *24 hours
        httpOnly: true,
      });

      const { _id, firstname, lastname, userNumber, role, hall } = userExists;

      let user = {
        _id,
        firstname,
        lastname,
        userNumber,
        role,
        hall,
      };

      console.log("The logged in user ", user);
      res
        .status(200)
        .json({ message: "User Login successful", status: "OK", user });
    } else {
      return res.status(400).json({
        error: "Something went wrong",
        actualError: userExists[1],
        status: "NOT OK",
      });
    }
  } catch (error) {
    //Catch block isn't needed as the Else block would handle the error if it isn't already handled by our middlewares
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
});

// Edit Admin Details

module.exports = router;
//vendor,product,amount,quantity,status
