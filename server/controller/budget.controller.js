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
        budgetBase: req.user._id,
        ownerID: req.user._id,
      });

      const newBudget = await budget.save();

      res.status(200).json({
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
        budgetBase: id,
        ownerID: req.user._id,
      });

      const newBudget = await budget.save();

      res.status(200).json({
        message: `Your household is now the owner of a brand-new budget!`,
        newBudget,
      });
    } else {
      res.status(400).json({
        message: `Must select personal or household as base`,
      });
    }
  } catch (err) {
    serverError(res, err);
  }
});

module.exports = router;
