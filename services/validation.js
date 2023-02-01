//ERROR HANDLING and VALIDATION

const { check, body, validationResult } = require("express-validator");
const { getUserByUserNumber } = require("./userWithRole");

const userWithRoleSignupValidator = () => {
  return [
    //Check that email isn't taken
    check("userNumber")
      .custom(async (value) => {
        let adminExist = await getUserByUserNumber(value);
        console.log("Exists? ", adminExist);
        if (adminExist[0] !== false) {
          console.log("The User already exists");
          return Promise.reject();
        }
      })
      .withMessage("UserNumber is taken! If it belongs to you, please login!"),

    //First name and lastname is not null and is between 4-10 characters
    body("firstname", "First Name is required")
      .trim()
      .notEmpty()
      .isLength({ min: 3 }),
    body("lastname", "Last Name is required")
      .trim()
      .notEmpty()
      .isLength({ min: 3 }),
    body("role", "Role is required").trim().notEmpty().isLength({ min: 3 }),
    body("hall", "Hall is required").trim().notEmpty().isLength({ min: 3 }),
    //Email validation
    body("userNumber", "User Number is required").trim().notEmpty(),

    //Password validation
    body("password", "Password is required").trim().notEmpty(),
    body("confirmPassword", "Please enter your password again")
      .trim()
      .notEmpty(),
    check("confirmPassword")
      .custom((value, { req }) => {
        console.log("From Validator req body ", req.body);
        const { password } = req.body;
        if (value === password) {
          console.log(
            "Passwords are the same.. Validation passed",
            value === password
          );
          return true;
        } else {
          console.log(
            "Passwords must be the same.. Validation test failed",
            value === password
          );
          return Promise.reject(); //return false or return Promise.reject() would both work since this isn't an async function
        }
      })
      .withMessage("Passwords must be the same"),
    body("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .withMessage(
        "Password must be atleast 8 characters long and a combination of at least one upper and lower case letter and one number."
      ),
  ];
};

const loginValidator = (req, res, next) => {
  const { userNumber, password } = req.body;
  if (!(userNumber && password)) {
    return res
      .status(400)
      .json({ error: "Please Login with valid userNumber and password" });
  } else {
    console.log("Details from Login form", req.body);
    next();
  }
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  // errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userWithRoleSignupValidator,
  validate,
  loginValidator,
};
