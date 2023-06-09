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
      return (
          res.status(406).json({
              message: "Sorry, you're already here!",
          })
      )
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

    let newInfo = {participantIDs: updateArray, participantNames: updateNames}

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

//? GET Route for Testing
router.get("/hello-world", (req, res) => {
  res.send("Hello world");
});

module.exports = router;
