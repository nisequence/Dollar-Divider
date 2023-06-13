const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT;
const requireValidation = require("../middleware/validate-session");

const serverError = (res, error) => {
  console.log("Server-side error");
  return res.status(500).json({
    Error: error.message,
  });
};

//? POST Route for Register
router.post("/register", async (req, res) => {
  try {
    //* Take the info from the request body and match it to the schema keys
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 11),
      householdID: null,
      //* householdID MUST be null in leu of any actual ID - undefined will delete the key/value pair altogether, creating an issue for other routes 
    });

    //* Save the new user with this info to our database
    const newUser = await user.save();

    //* Provide the user a token to use
    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: "3 days",
    });

    //* Give them a positive response as long as no errors have occurred
    return res.status(200).json({
      user: newUser,
      message: "New user created!",
      token,
    });
  } catch (err) {
    serverError(res, err);
  }
});

//? POST Route for login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) throw new Error("Credentials do not match!");

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error("Credentials do not match!");

    //4. After verified, provide a jwt token
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "3 days" });

    //5. response status returned
    return res.status(200).json({
      message: "Login successful!",
      user,
      token,
    });
  } catch (err) {
    serverError(res, err);
  }
});

//? GET Route for Own Info
router.get("/find", requireValidation, async (req, res) => {
  try {
    const id = req.user._id;

    const findUser = await User.findOne({_id: id})

    findUser?
    res.status(200).json({
        message: "Found!",
        findUser
    })
    : res.status(404).json({
        message: "Not found!"
    })
  } catch (err) {
    serverError(res, err);
  }
})

//? PATCH Route to Leave Household
router.get("/abandon", requireValidation, async (req, res) => {
  try {
    const id = req.user._id
    const filter = {_id: id}

    const newInfo = {householdID: null}

    const returnOption = {new: true};

    //! Not finished

  } catch (err) {
    serverError(res, err);
  }
})

//? PATCH Route to Edit Profile
router.get("/adjust", requireValidation, async (req, res) => {
  try {
    //* Save the user's id and create the filter
    const id = req.user._id
    const filter = {_id: id}

    //* Pull update-able info from the req.body
    const {firstName, lastName, email, password} = req.body;
    const newInfo = {firstName, lastName, email, password};

    const returnOption = {new: true};

    //* Attempt to update the corresponding user item in the database
    const updateUser = await User.findOneAndUpdate(filter, newInfo, returnOption);

    if (!updateUser) {
      //* Unable to update user in the database
      return res.status(404).json({
        message: "Error in updating user profile. Please log out & back in.",
      })
    }

    //* Locate the household that the user is part of to update their name there
    const findHousehold = await Household.findOne({_id: req.user.householdID});

    if (!findHousehold) {
      //* User does not have a household to update
      return res.status(200).json({
        message: "Profile successfully updated!",
      })
    }

    //* Need to correct user's first name in the household
    for (x = 0; x < findHousehold.participantIDs.length; x++) {
      if (id == findHousehold.participantIDs[x]) {
        // Splice will locate the name at the same index where this user's id was found, remove that single name, and replace it in the same position with the user's new firstName
        findHousehold.participantNames.splice(x, 1, firstName);

        return res.status(200).json({
          message: "Profile and household successfully updated!",
        })
      } else {
        return res.status(404).json({
          message: "User not found within household...",
        })
      }
    }

  } catch (err) {
    serverError(res, err);
  }
})

module.exports = router;
