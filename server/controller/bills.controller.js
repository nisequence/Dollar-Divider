const router = require("express").Router();
const Bill = require("../models/bill.model");
const User = require("../models/user.model");
const Household = require("../models/household.model");
const Budget = require("../models/budget.model");
const Transaction = require("../models/transaction.model");
const serverError = (res, error) => {
  console.log("Server-side error");
  return res.status(500).json({
    Error: error.message,
  });
};
//? POST BILL ("/add")
router.post("/add", async (req, res) => {
  try {
    //const {id} = req.params;
    const { title, merchant, amount, active,  dueDate, recurring, category, base, autoPay} = req.body;

    if (base == "personal") {
      // make sure ID is correct & findable
      const findUser = await User.findOne({ _id: req.user._id });

      if (!findUser) {
        // if user is not findable
        return res.status(404).json({
          message: "User not found!",
        });
      }
      // If user works add new transaction

      const bill = new Bill({
        title: title,
        merchant: merchant,
        amount: amount,
        active: active,
        dueDate: dueDate,
        recurring: recurring,
        category: category,
        base: req.user._id,
        autoPay: autoPay
      });

      const newBill = await bill.save();

      return res.status(200).json({
        message: `You have created a new bill!`,
        newBill,
      });
    } else if (base == "household") {
      // get household ID
      const findHousehold = await Household.findOne({
        _id: req.user.householdID,
      });

      if (!findHousehold) {
        // if household can't be found
        return res.status(404).json({
          message: "Household not found!",
        });
      }

      // if works add new transaction to household
      const bill = new Bill({
        title: title,
        merchant: merchant,
        amount: amount,
        active: active,
        dueDate: dueDate,
        recurring: recurring,
        // Not sure if category needs to be required yet.
        category: category,
        base: req.user._id,
      });

      const newBill = await bill.save();

      return res.status(200).json({
        message: `Your household has a new bill!`,
        newBill,
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
//? GET ONE BILL ROUTE ("/find/:id")
router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const getBill = await Bill.findOne({ _id: id });

    getBill
      ? res.status(200).json({
          message: `${getBill.category} bill was found!`,
          getBill,
        })
      : res.status(404).json({
          message: "No bill found.",
        });
  } catch (err) {
    errorResponse(res, err);
  }
});
//? GET ALL PERSONAL ROUTER ("/mine/:id")
router.get("/mine/:id", async (req, res) => {
  try {
    getAllUserBills = await Bill.find();

    getAllUserBills
      ? res.status(200).json({
          message: "All bills from user collection",
          getAllUserBills,
        })
      : res.status(404).json({
          message: `No bills found.`,
        });
  } catch (err) {
    errorResponse(res, err);
  }
});
//? GET ALL HOUSEHOLD BILLS ROUTE ("/household/:id")
router.get("/household/:id", async (req, res) => {
  try {
    getAllHouseholdBills = await Bill.find();

    getAllHouseholdBills
      ? res.status(200).json({
          message: "All bills from household collection",
          getAllHouseholdBills,
        })
      : res.status(404).json({
          message: `No bills found.`,
        });
  } catch (err) {
    errorResponse(res, err);
  }
});
//? GET BILL BY DUE DATE ROUTE ("/dueDate/:dueDate")

router.get("/dueDate/:dueDate", async (req, res) => {
  try {
    const { date } = req.params;

    const getDate = await Transaction.find({ date: date });

    getDate.length > 0
      ? res.status(200).json({
          getDate,
        })
      : res.status(404).json({
          message: "No transactions found for this date.",
        });
  } catch (err) {
    errorResponse(res, err);
  }
});
//? GET BILL BY CATEGORY ROUTE ("")

//? EDIT BILL ROUTE ("/edit/:id")
router.patch("/edit/:id", async (req, res) => {
  try {
    // pull value from parameter (id)
    const { id } = req.params;
    // pull info from body
    const info = req.body;

    const returnOption = { new: true };

    //* findOneAndUpdate(query/filter, document, options)
    const UpdateBill = await Bills.findOneAndUpdate(
      { _id: id },
      info,
      returnOption
    );

    res.status(200).json({
      message: `${UpdateBill.category} transaction has been updated successfully`,
      UpdateBill,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//? DELETE BILL ROUTE ("")
router.delete("/delete/:id", async (req, res) => {
    try {
      //* Pull transaction id from params
      const { id } = req.params;
  
      //* Find and confirm the user has access to the transaction
      const deletedBill = await Bills.findOneAndDelete({ _id: id });
  
      res.status(200).json({
        message: "Bill was successfully deleted!",
      });
      res.status(404).json({
        message: "Bill was not located",
      });
    } catch (err) {
      serverError(res, err);
    }
  });






module.exports = router;