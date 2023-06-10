const router = require("express").Router();
const Budget = require("../models/budget.model");
const User = require("../models/user.model");
const Household = require("../models/household.model");

const serverError = (res, error) => {
  console.log("Server-side error");
  return res.status(500).json({
    Error: error.message,
  });
};

//? POST Route for Creation
// (id in URL refers to either personal or household id; dependant on base var)
router.post("/add/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "vs", req.user._id);
    const { category, amount, base } = req.body;

    if (base == "personal") {
      //* Before assigning budget to this user, confirm user ID is correct & findable
      const findUser = await User.findOne({ _id: req.user._id });

      if (!findUser) {
        // If user is not findable
        return res.status(404).json({
          message: "User not found!",
        });
      }

      //* As long as it's a good request, add the new budget to the user
      const budget = new Budget({
        budgetCat: category,
        budgetAmt: amount,
        remainingAmt: amount,
        budgetBase: req.user._id,
        ownerID: req.user._id,
      });

      const newBudget = await budget.save();

      return res.status(200).json({
        message: `You are now the owner of a brand-new budget!`,
        newBudget,
      });
    } else if (base == "household") {
      //* Attempt to find the HH based on given ID
      const findHousehold = await Household.findOne({ _id: id });

      if (!findHousehold) {
        // if household cannot be found with the input token (id)
        return res.status(404).json({
          message: "Household not found!",
        });
      } else if (req.user._id != findHousehold.admin_id) {
        // if user is not the admin
        return res.status(401).json({
          message: "Sorry, you're not the admin!",
        });
      }

      //* As long as it's a good request, add the new budget to the HH
      const budget = new Budget({
        budgetCat: category,
        budgetAmt: amount,
        remainingAmt: amount,
        budgetBase: id,
        ownerID: req.user._id,
      });

      const newBudget = await budget.save();

      return res.status(200).json({
        message: `Your household is now the owner of a brand-new budget!`,
        newBudget,
      });
    } else {
      return res.status(400).json({
        message: `Must select personal or household as base`,
      });
    }
  } catch (err) {
    serverError(res, err);
  }
});

//? PATCH Route for household budgets only (changing assigned user)
router.patch("/edit/:id", async (req, res) => {
  try {
    //* Destructuring the budget ID from params, also grab user & body info
    const { id } = req.params;
    const userID = req.user._id;
    let { assigneeID } = req.body;

    //* First check the database for the budget
    const findBudget = await Budget.findOne({ _id: id });
    //* Second we will check if the assigneeID pertains to a correct user
    //! Bug info below
    /* 
    ! Beware of known bug in which server error states:
    "Error": "Cast to ObjectId failed for value at path \"_id\" for model \"User\""
    ! This is caused by anything other than an exactly valid user ID placed in the assigneeID spot of the req.body
    //* Solution: consider a drop-down menu on client side so that the admin can select one of the household user IDs?
    */
    const findUser = await User.findOne({ _id: assigneeID });

    if (!findBudget) {
      // if not found
      res.status(404).json({
        message: `No budget found.`,
      });
    } else if (userID != findBudget.ownerID) {
      // if the budget exists, but doesn't belong to the requesting user
      return res.status(401).json({
        message: "Sorry, you're not authorized!",
      });
    } else if (findBudget.budgetBase == findBudget.ownerID) {
      // if the budget belongs to the user, but it is only a personal budget, not a HH budget
      return res.status(403).json({
        message: "Sorry, assignees are only for household budgets!",
      });
    } else if (!findUser) {
      // if the budget belongs to a household, but the potential assigned user doesn't exist
      return res.status(404).json({
        message: `No user found.`,
      });
    }

    //* Confirm that the household exists and if it does, check to see if the potential assigned user currently lives in this household
    const householdID = findBudget.budgetBase;
    const findHousehold = await Household.findOne({ _id: householdID });
    if (!findHousehold) {
      return res.status(404).json({
        message: `No household found.`,
      });
    } else if (findHousehold.participantIDs.includes(assigneeID)) {
      // success! the user lives here
      const filter = { _id: id };
      const newInfo = { assignedUser: assigneeID };
      const returnOption = { new: true };

      // communicate with the database about what we are updating
      const updatedBudget = await Budget.findOneAndUpdate(
        filter,
        newInfo,
        returnOption
      );

      //* Send response to client based on successful update
      updatedBudget
        ? res.status(200).json({
            message: "Successfully assigned user to budget!",
          })
        : res.status(520).json({
            message: "Unable to update budget. Please try again later.",
          });
    } else {
      // if the assigneeID cannot be found within the household participant ID list
      return res.status(403).json({
        message:
          "Sorry, the user you selected doesn't belong to this household yet!",
      });
    }
  } catch (err) {
    serverError(res, err);
  }
});

//? DELETE Route to delete budget if admin
router.delete("/:id", async (req, res) => {
  try {
    //* Pull budget id from params
    const { id } = req.params;
    const userID = req.user._id;

    //* Find and confirm the user has access to the budget
    const deleteBudget = await Budget.deleteOne({ _id: id, ownerID: userID });

    deleteBudget.deletedCount === 1
      ? res.status(200).json({
          message: "Budget was successfully deleted!",
        })
      : res.status(404).json({
          message: "Access to or existence of this budget was not located",
        });
  } catch (err) {
    serverError(res, err);
  }
});

module.exports = router;
