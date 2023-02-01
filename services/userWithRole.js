require("dotenv").config();
const UserWithRole = require("../models/userWithRole");
const { translateError } = require("./mongo_helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* Generate Password Salt and hash */
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(13);
  console.log("The salt generated ", salt);
  return await bcrypt.hash(password, salt);
};

/* Create new Admin */
const createUserWithRole = async ({
  firstname,
  lastname,
  userNumber,
  password,
  role,
  hall,
}) => {
  try {
    let userWithRole = new UserWithRole({
      firstname,
      lastname,
      userNumber,
      password: await encryptPassword(password),
      role,
      hall,
    });

    console.log("The User Created ", userWithRole);

    //Create a  token
    const token = jwt.sign(
      {
        id: userWithRole._id,
        role: userWithRole.role,
        hall: userWithRole.hall,
        userNumber: userWithRole.userNumber,
      },
      process.env.JWT_SECRET
    );

    userWithRole.token = token;

    if (await userWithRole.save()) {
      return [true, userWithRole];
    }
  } catch (error) {
    console.log(error);
    return [false, translateError(error)];
  }
};

/* Authenticate Admin */
const authenticateUserWithRole = async (userNumber, password) => {
  const userWithRole = await UserWithRole.findOne({ userNumber });

  if (userWithRole && (await bcrypt.compare(password, userWithRole.password))) {
    return [true, userWithRole];
  } else {
    return [false, "Incorrect userName/password"];
  }
};

/* Return admin with specified id */
const getUserById = async (id) => {
  try {
    const user = await UserWithRole.findById(id);
    if (user !== null) {
      return [true, user];
    } else {
      return [false, "User doesn't exist. It is null and/or has been deleted."];
    }
  } catch (error) {
    console.log(translateError(error));
    return [false, translateError(error)];
  }
};
const getUserByUserNumber = async (email) => {
  const user = await UserWithRole.findOne({ userNumber });

  if (user !== null) {
    return [true, user];
  } else {
    return [false, "User with that userNumber doesn't exist"];
  }
};
/* Get the current url */
//NB: NODE_ENV specifies the environment in which an application is running

module.exports = {
  createUserWithRole,
  encryptPassword,
  authenticateUserWithRole,
  getUserById,
  getUserByUserNumber,
};
