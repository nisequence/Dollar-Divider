const router = require("express").Router();
const Household = require("../models/household.model");

const serverError = (res, error) => {
  console.log("Server-side error");
  return res.status(500).json({
    Error: error.message,
  });
};

//? POST Route for Creation
router.post("/new", async (req, res) => {
  try {
    const { householdName, maxNum } = req.body;

    const household = new Household({
      name: householdName,
      participantIDs: [`${req.user._id}`],
      participantNames: [`${req.user.firstName}`],
      participantPercents: ["100"],
      participantMaxNum: maxNum,
      bannedUsers: [],
      admin_id: req.user._id,
    });

    const newHousehold = await household.save();

    res.status(200).json({
      message: `You are now the admin of a household!`,
      newHousehold,
    });
  } catch (err) {
    serverError(res, err);
  }
});

//? GET Route for Admin
router.get("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;

    //* Locating the specific household item by ID
    const getHousehold = await Household.findOne({ _id: id });

    //* First, eliminate the possibility that we couldn't find the HH
    if (getHousehold === undefined || getHousehold === null) {
      res.status(404).json({
        message: "No household found.",
      });
      //* Second, check if user has access
    } else if (getHousehold.admin_id != req.user._id) {
      res.status(401).json({
        message: "You are not the admin!",
      });
      //* If HH exists and user is admin, then we should have a successful request
    } else {
      res.status(200).json({
        msg: `Household was found!`,
        getHousehold,
      });
    }
  } catch (err) {
    errorResponse(res, err);
  }
});

//? GET Route for User that Belongs
router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userID = req.user._id;

    //* Locating the specific household item by ID
    const getHousehold = await Household.findOne({ _id: id });

    //* First, eliminate the possibility that we couldn't find the HH
    if (getHousehold === undefined || getHousehold === null) {
      res.status(404).json({
        message: "No household found.",
      });
      //* Second, check if user has access
    } else if (getHousehold.participantIDs.includes(userID)) {
      let { name, participantIDs, participantNames } = getHousehold;

      res.status(200).json({
        msg: `Household was found!`,
        name,
        participantIDs,
        participantNames,
        participantPercents,
      });
      //* If HH exists and user does not belong, then we should deny access
    } else {
      res.status(401).json({
        message: "You are not in this household!",
      });
    }
  } catch (err) {
    errorResponse(res, err);
  }
});

//? PATCH Route for Joining
router.patch("/join/:id", async (req, res) => {
  try {
    //* object destructuring the HH token and the req.user._id
    const { id } = req.params;
    const householdToken = { id };
    const userID = req.user._id;

    const findHousehold = await Household.findOne({ _id: id });

    if (!findHousehold) {
      //* if household cannot be found with the input token (id)
      return res.status(400).json({
        message: "Household not found!",
      });
    }

    if (findHousehold.bannedUsers.includes(userID)) {
      //* if the user making the request is banned from the household
      return res.status(401).json({
        message: "Sorry, you're banned!",
      });
    }

    //* We have proven that the ID can find the household, so save this as our filter
    const filter = { _id: id };

    //* Pull out the household existing user IDs
    let updateArray = findHousehold.participantIDs;
    let updateNames = findHousehold.participantNames;

    if (updateArray.includes(userID)) {
      return res.status(406).json({
        message: "Sorry, you're already here!",
      });
    } else if (updateArray.length >= findHousehold.participantMaxNum) {
      // if the max number is reached or exceeded, send error
      return res.status(409).json({
        message: "Sorry, max users reached!",
      });
    } else {
      // as long as the user is not banned, is not already in the household, and there is room in the household, we can push the user to the participant array
      updateArray.push(userID);
      updateNames.push(req.user.firstName);
    }

    //* Track how many users are now in the household
    let numOfUsers = updateArray.length;

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

    let newInfo = {
      participantIDs: updateArray,
      participantNames: updateNames,
      participantPercents: breakdownArray
    };

    //* Only allow the db item to be changed if the info is new
    // (not sure why it wouldn't be by this point in the try)
    const returnOption = { new: true };

    //* returnOptions allows us to view the updated document
    const updatedHousehold = await Household.findOneAndUpdate(
      filter,
      newInfo,
      returnOption
    );

    //* Check if this was successful and send response accordingly
    updatedHousehold
      ? // if the household did get updated (user was added)
        res.status(200).json({
          message: `Welcome to the household!`,
          updatedHousehold,
        })
      : // if the household did not get updated for any reason that previous errors did not catch
        res.status(404).json({
          message: `Nothing to see here!`,
        });
  } catch (err) {
    serverError(res, err);
  }
});

module.exports = router;
