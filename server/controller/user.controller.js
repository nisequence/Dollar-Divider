const router = require("express").Router();
const User = require("../models/user.model");
const Household = require("../models/household.model");
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

    const findUser = await User.findOne({ _id: id });

    findUser
      ? res.status(200).json({
          message: "Found!",
          findUser,
        })
      : res.status(404).json({
          message: "Not found!",
        });
  } catch (err) {
    serverError(res, err);
  }
});

//? PATCH Route to Leave Household
//! Currently debugging
router.patch("/abandon", requireValidation, async (req, res) => {
  try {
    //* Pull the user's info from the req
    const id = req.user._id;
    const householdID = req.user.householdID;

    //* Constants to update both the User and Household objects in the db
    const userFilter = { _id: id };
    const householdFilter = { _id: householdID };
    const userNewInfo = { householdID: null };
    const returnOption = { new: true };

    //* Check if the user has a household
    if (householdID == null) {
      return res.status(404).json({
        message: "Household not found within user profile!",
      });
    }

    //* Attempt to find the HH based on given ID
    const findHousehold = await Household.findOne({ _id: householdID });

    //* Confirm that the household is findable
    if (!findHousehold) {
      return res.status(404).json({
        message: "Household not found in database!",
      });
    }

    let updateIDs = findHousehold.participantIDs;
    let updateNames = findHousehold.participantNames;
    let removal = false;

    for (x = 0; x < updateIDs.length; x++) {
      // look for the user in the participants and remove them from the ID and Names arrays
      if (id == updateIDs[x]) {
        updateIDs.splice(x, 1);
        updateNames.splice(x, 1);
        removal = true;
      }
    }

    if ((removal = false)) {
      return res.status(400).json({
        message: "Unable to remove user from household",
      });
    }
    //* Track how many users are now in the household
    let numOfUsers = updateIDs.length;

    //* Split 100% of costs between users, then round that number to the nearest whole
    let breakdownPercent = 100 / numOfUsers;
    breakdownPercent = Math.round(breakdownPercent);

    //* In the event that these numbers will now not = 100 when added, determine an amount that one user (admin) will take to even things out
    let disparity = 100 - breakdownPercent * numOfUsers;
    disparity = disparity + breakdownPercent;

    //* Use an array to track the percentage inputs in the order that the user IDs are listed
    let breakdownArray = [];

    //* In the case that disparity is not needed (numbers are completely even)
    if (disparity === 0) {
      for (x = 0; x < numOfUsers; x++) {
        // every user will pay exactly the same
        breakdownArray.push(breakdownPercent);
      }
      //* In the case that disparity IS needed...
    } else {
      //push the disparity to the admin
      breakdownArray.push(disparity);
      for (x = 1; x < numOfUsers; x++) {
        // starting with one should skip the admin?
        breakdownArray.push(breakdownPercent);
      }
    }

    //*Update HH
    const householdNewInfo = {
      participantIDs: updateIDs,
      participantNames: updateNames,
      participantPercents: breakdownArray,
    };
    console.log(householdNewInfo);

    //* findOneAndUpdate(query/filter, document, options)
    const updatedHousehold = await Household.findOneAndUpdate(
      householdFilter,
      householdNewInfo,
      returnOption
    );
    console.log(updatedHousehold);

    if (updatedHousehold == false) {
      return res.status(400).json({
        message:
          "Something went wrong when trying to remove you from the household!",
      });
    }
    //* Remove household from user profile

    const updateUser = await User.findOneAndUpdate(
      userFilter,
      userNewInfo,
      returnOption
    );

    updateUser
      ? res.status(200).json({
          message: `User was successfully removed from the household!`,
          updateUser,
        })
      : res.status(404).json({
          message: `User data unable to be updated.`,
        });
  } catch (err) {
    serverError(res, err);
  }
});

//! Currently debugging
//? PATCH Route to Edit Profile
router.patch("/adjust", requireValidation, async (req, res) => {
  try {
    //* Save the user's id and create the filter
    const id = req.user._id;
    const filter = { _id: id };

    //* Pull update-able info from the req.body
    const { firstName, lastName, email, password } = req.body;
    const newInfo = { firstName, lastName, email, password };

    const returnOption = { new: true };

    //* Attempt to update the corresponding user item in the database
    const updateUser = await User.findOneAndUpdate(
      filter,
      newInfo,
      returnOption
    );

    if (!updateUser) {
      //* Unable to update user in the database
      return res.status(404).json({
        message: "Error in updating user profile. Please log out & back in.",
      });
    }

    //* Check to see if user has a household to update
    if (req.user.householdID == null) {
      // User does not have a household to update
      return res.status(200).json({
        message: "Profile successfully updated!",
      });
    }

    //* Now that we know they have a household, locate the household that the user is part of to update their name there
    const findHousehold = await Household.findOne({
      _id: req.user.householdID,
    });

    //* Need to correct user's first name in the household
    for (x = 0; x <= findHousehold.participantIDs.length; x++) {
      if (id == findHousehold.participantIDs[x]) {
        // Splice will locate the name at the same index where this user's id was found, remove that single name, and replace it in the same position with the user's new firstName
        findHousehold.participantNames.splice(x, 1, firstName);

        return res.status(200).json({
          message: "Profile and household successfully updated!",
        });
      } else {
        return res.status(404).json({
          message: "User not found within household...",
        });
      }
    }
  } catch (err) {
    serverError(res, err);
  }
});

module.exports = router;
