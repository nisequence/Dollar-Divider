const router = require("express").Router();
const Household = require("../models/household.model");
const User = require("../models/user.model");

const serverError = (res, error) => {
  console.log("Server-side error");
  return res.status(500).json({
    Error: error.message,
  });
};

function breakdownPercents(totalUsers) {
  //* Split 100% of costs between users, then round that number to the nearest whole
  let breakdownPercent = 100 / totalUsers;
  breakdownPercent = Math.round(breakdownPercent);

  //* In the event that these numbers will now not = 100 when added, determine an amount that one user (admin) will take to even things out
  let disparity = 100 - breakdownPercent * totalUsers;
  disparity = disparity + breakdownPercent;

  //* Use an array to track the percentage inputs in the order that the user IDs are listed
  let breakdownArray = [];

  //* In the case that disparity is not needed (numbers are completely even)
  if (disparity === 0) {
    for (x = 0; x < totalUsers; x++) {
      // every user will pay exactly the same
      breakdownArray.push(breakdownPercent);
    }
    //* In the case that disparity IS needed...
  } else {
    //push the disparity to the admin
    breakdownArray.push(disparity);
    for (x = 1; x < totalUsers; x++) {
      // starting with one should skip the admin
      breakdownArray.push(breakdownPercent);
    }
  }
  return breakdownArray;
}

async function addUserToHousehold(userID, HhID) {
  try {
    const filter = { _id: userID };
    const newInfo = { householdID: HhID };
    const returnOption = { new: true };

    const updateUserProfile = await User.findOneAndUpdate(
      filter,
      newInfo,
      returnOption
    );

    if (!updateUserProfile)
      return res.status(520).json({
        message: "Unable to update user profile. Please try again later.",
      });
  } catch (err) {
    serverError(res, err);
  }
}

//? POST Route for Creation
router.post("/new", async (req, res) => {
  try {
    const { householdName, maxNum } = req.body;

    //! I'd like to add in a confirmation that the user doesn't already have a household first

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

    addUserToHousehold(req.user._id, newHousehold._id);

    return res.status(200).json({
      message: `You are now the admin of a household!`,
      newHousehold,
    });
  } catch (err) {
    serverError(res, err);
  }
});

//? GET Route for User Status (admin / member / solo user)
router.get("/role", async (req, res) => {
  try {
    //* Pulling the household and user IDs via request validation
    const id = req.user.householdID;
    const userID = req.user._id;

    //* Find a household using the household ID
    const findHousehold = await Household.findOne({ _id: id });

    //* Check the user's status
    if (!findHousehold) {
      // The user may not have a valid household ID. That is OK. We will call them a "solo" user.
      return res.status(200).json({
        message: "Solo",
      });
    } else if (findHousehold.admin_id == userID) {
      // The user may be the admin. We will return the message "Admin" to the client.
      return res.status(200).json({
        message: "Admin",
      });
    } else {
      // The user may have a valid household, but not be the admin. We will call them a "member" user.
      return res.status(200).json({
        message: "Member",
      });
    }
  } catch (err) {
    serverError(res, err);
  }
});

//? GET Route for Household Info - Admin
router.get("/admin", async (req, res) => {
  try {
    const id = req.user.householdID;

    //* Locating the specific household item by ID
    const getHousehold = await Household.findOne({ _id: id });

    //* First, eliminate the possibility that we couldn't find the HH
    if (getHousehold === undefined || getHousehold === null) {
      return res.status(404).json({
        message: "No household found.",
      });
      //* Second, check if user has access
    } else if (getHousehold.admin_id != req.user._id) {
      return res.status(401).json({
        message: "You are not the admin!",
      });
      //* If HH exists and user is admin, then we should have a successful request
    } else {
      return res.status(200).json({
        msg: `Household was found!`,
        getHousehold,
      });
    }
  } catch (err) {
    serverError(res, err);
  }
});

//? GET Route for Household Info - Member
router.get("/member", async (req, res) => {
  try {
    const id = req.user.householdID;
    const userID = req.user._id;

    //* Locating the specific household item by ID
    const getHousehold = await Household.findOne({ _id: id });

    //* First, eliminate the possibility that we couldn't find the HH
    if (getHousehold === undefined || getHousehold === null) {
      return res.status(404).json({
        message: "No household found.",
      });
      //* Second, check if user has access
    } else if (getHousehold.participantIDs.includes(userID)) {
      let { name, participantIDs, participantNames, participantPercents } = getHousehold;

      return res.status(200).json({
        msg: `Household was found!`,
        name,
        participantIDs,
        participantNames,
        participantPercents,
      });
      //* If HH exists and user does not belong, then we should deny access
    } else {
      return res.status(401).json({
        message: "You are not in this household!",
      });
    }
  } catch (err) {
    serverError(res, err);
  }
});

//? PATCH Route for Admin to update percentages
router.patch("/tweak", async (req, res) => {
  try {
    //* object destructuring the HH id and the req.user._id
    const id = req.user.householdID;
    const userID = req.user._id;
    let { newBreakdown } = req.body;

    //* attempt to find the HH based on given ID
    const findHousehold = await Household.findOne({ _id: id });

    if (!findHousehold) {
      //* if household cannot be found with the input token (id)
      return res.status(400).json({
        message: "Household not found!",
      });
    } else if (userID != findHousehold.admin_id) {
      //* if user is not the admin
      return res.status(401).json({
        message: "Sorry, you're not the admin!",
      });
    } else if (newBreakdown.length !== findHousehold.participantIDs.length) {
      //* if the user does not have %'s to match the # of participants
      return res.status(411).json({
        message:
          "Lengths do not match! Must have the same number of percentages as user. If you do not want a user to contribute, please use '0'.",
      });
    }

    //* Now to determine if the % breakdown is valid
    let total = 0;
    let each;
    for (x = 0; x < newBreakdown.length; x++) {
      // add each one to the total
      each = Number(newBreakdown[x]);
      total = total + each;
    }

    //* Confirm that the total strictly equals 100
    if (total !== 100) {
      return res.status(422).json({
        message:
          "Semantic error, %'s do not add to 100 or letters/symbols were included.",
      });
    }

    //* We have proven that the ID can find the household, so save this as our filter
    const filter = { _id: id };

    //* Format the array so the db knows how to accept it
    let newInfo = { participantPercents: newBreakdown };

    //* Confirm we are only sending new info through
    const returnOption = { new: true };

    //* findOneAndUpdate(query/filter, document, options)
    const updatedHousehold = await Household.findOneAndUpdate(
      filter,
      newInfo,
      returnOption
    );

    //* Respond to client based on successful update
    updatedHousehold
      ? res.status(200).json({
          message: `Household percents were successfully updated!`,
          updatedHousehold,
        })
      : res.status(404).json({
          message: `No household found.`,
        });
  } catch (err) {
    serverError(res, err);
  }
});

//? PATCH Route for Admin to update name / change participantMaxNum / ban users
router.patch("/edit", async (req, res) => {
  try {
    //* object destructuring the HH id and the req.user._id
    const id = req.user.householdID;
    const userID = req.user._id;
    const { householdName, maxNum, banUser } = req.body;

    //* attempt to find the HH based on given ID
    const findHousehold = await Household.findOne({ _id: id });

    if (!findHousehold) {
      //* if household cannot be found with the input token (id)
      return res.status(400).json({
        message: "Household not found!",
      });
    } else if (userID != findHousehold.admin_id) {
      //* if user is not the admin
      return res.status(401).json({
        message: "Sorry, you're not the admin!",
      });
    } else if (findHousehold.bannedUsers.includes(banUser)) {
      //* if admin has already banned this user
      return res.status(410).json({
        message: "You have already banned this user!",
      });
    } else if (banUser !== null || banUser !== undefined) {
      //* if the admin is sending a user to ban
      for (x = 0; x < findHousehold.participantIDs.length; x++) {
        // look for the user in the participants and remove them from the ID and Names arrays
        if (banUser == findHousehold.participantIDs[x]) {
          findHousehold.participantIDs.splice(x, 1);
          findHousehold.participantNames.splice(x, 1);
        }
      }
      //* Regardless of whether banned user lives in HH or not, as long as value is not null or undefined and isn't already in the array, add to banned array
      findHousehold.bannedUsers.push(banUser);
    }

    //* We have proven that the ID can find the household, so save this as our filter
    const filter = { _id: id };

    //* Track how many users are now in the household
    let numOfUsers = findHousehold.participantIDs.length;

    //* Update the percentages based on how many users there are
    let breakdownArray = breakdownPercents(numOfUsers);

    //* Track any possible new info we are updating to send to the database
    let newInfo = {
      name: householdName,
      participantIDs: findHousehold.participantIDs,
      participantNames: findHousehold.participantNames,
      participantPercents: breakdownArray,
      participantMaxNum: maxNum,
      bannedUsers: findHousehold.bannedUsers,
    };

    //* Confirm we are only sending new info through
    const returnOption = { new: true };

    //* findOneAndUpdate(query/filter, document, options)
    const updatedHousehold = await Household.findOneAndUpdate(
      filter,
      newInfo,
      returnOption
    );

    //* Respond to client based on successful update
    updatedHousehold
      ? res.status(200).json({
          message: `Household info was successfully updated!`,
          updatedHousehold,
        })
      : res.status(404).json({
          message: `No household found.`,
        });
  } catch (err) {
    serverError(res, err);
  }
});

//? PATCH Route for Joining
router.patch("/join/:id", async (req, res) => {
  try {
    //* object destructuring the HH id and the req.user._id
    const { id } = req.params;
    const userID = req.user._id;

    //* Confirm that the user doesn't already have a household first - start by finding the user
    const user = await User.findOne({ _id: userID });
    if (!user) throw new Error("Invalid token!");

    if (user.householdID != null) {
      // the user already has a householdID
      return res.status(403).json({
        message:
          "Sorry, you must leave your current household before joining a new one!",
      });
    } else if (!user.householdID) {
    }

    //* attempt to find the HH based on given ID
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
      updateArray.push(req.user._id);
      updateNames.push(req.user.firstName);
    }

    //* Track how many users are now in the household
    let numOfUsers = updateArray.length;

    //* Update the percentages based on how many users there are
    let breakdownArray = breakdownPercents(numOfUsers);

    let newInfo = {
      participantIDs: updateArray,
      participantNames: updateNames,
      participantPercents: breakdownArray,
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

    if (updatedHousehold) addUserToHousehold(userID, id);

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

//? DELETE Route for Admin to Remove Household
router.delete("/admin/remove", async (req, res) => {
  try {
    //* Pull user and household IDs
    const userID = req.user._id;
    const id = req.user.householdID;

    //* Delete the household if the id's both match (user is admin)
    const deleteHousehold = await Household.deleteOne({
      _id: id,
      admin_id: userID,
    });

    deleteHousehold.deletedCount === 1
      ? res.status(200).json({
          message: "Household deleted.",
        })
      : res.status(404).json({
          message: "Deletion unsuccessful.",
        });
  } catch (err) {
    serverError(res, err);
  }
});

module.exports = router;
