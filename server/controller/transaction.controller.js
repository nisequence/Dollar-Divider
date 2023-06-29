const router = require("express").Router();
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const Household = require("../models/household.model");
const Budget = require("../models/budget.model");
const Bills = require("../models/bill.model");

const serverError = (res, error) => {
  console.log("Server-side error");
  return res.status(500).json({
    Error: error.message,
  });
};

//? POST ROUTE "/add"
//* Successful on Postman MR
router.post("/add", async (req, res) => {
  try {
    const {
      month,
      day,
      desc,
      merchant,
      amount,
      checkNum,
      finAccount,
      type,
      category,
      base,
    } = req.body;


    let newAmount;
    if (type == "expense") {
      newAmount = -Math.abs(amount);
    } else {
      newAmount = amount
    }
    console.log(newAmount);


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
      const transaction = new Transaction({
        month: month,
        day: day,
        desc: desc,
        merchant: merchant,
        amount: newAmount,
        checkNum: checkNum,
        finAccount: finAccount,
        type: type,
        category: category,
        base: req.user._id,
        ownerID: req.user_id,
      });

      const newTransaction = await transaction.save();

      return res.status(200).json({
        message: `You have created a new transaction!`,
        newTransaction,
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
      const transaction = new Transaction({
        month: month,
        day: day,
        desc: desc,
        merchant: merchant,
        amount: amount,
        checkNum: checkNum,
        finAccount: req.user._id,
        type: type,
        category: category,
        base: req.user.householdID,
        ownerID: req.user._id,
      });

      const newTransaction = await transaction.save();

      return res.status(200).json({
        message: `Your household has a new transaction!`,
        newTransaction,
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
//? GET ALL HOUSEHOLD ROUTE "/household"

router.get("/household", async (req, res) => {
  try {
    const id = req.user.householdID;

    const getAllHouseholdTrans = await Transaction.find({ base: id });

    getAllHouseholdTrans
      ? res.status(200).json({
          message: "All transaction from household collection",
          getAllHouseholdTrans,
        })
      : res.status(404).json({
          message: `No transactions found.`,
        });
  } catch (err) {
    errorResponse(res, err);
  }
});

//? GET ALL PERSONAL ROUTE "/mine"
//* Successful on Postman

router.get("/mine", async (req, res) => {
  try {
    const id = req.user._id;

    const getAllUserTrans = await Transaction.find({ base: id });

    getAllUserTrans
      ? res.status(200).json({
          message: "All transaction from user collection",
          getAllUserTrans,
        })
      : res.status(404).json({
          message: `No transactions found.`,
        });
  } catch (err) {
    errorResponse(res, err);
  }
});
//? GET BY DATE ROUTE "/date/:date"
//* Successful in postman

router.get("/date/:month/:day", async (req, res) => {
  try {
    const { month, day } = req.params;

    const getDate = await Transaction.find({ month: month, day: day });

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
//? GET BY CATEGORY ROUTE "/category/:category"
//* Successful on Postman

router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const getCategories = await Transaction.find({ category: category });

    getCategories.length > 0
      ? res.status(200).json({
          getCategories,
        })
      : res.status(404).json({
          message: "No category found.",
        });
  } catch (err) {
    errorResponse(res, err);
  }
});

//? GET BY DATE AND CATEGORY ROUTER ("/dateAndCategory/:date/:category")

router.get("/dateAndCategory/:month/:day/:category", async (req, res) => {
  try {
    const { month, day, category } = req.params;

    const getDateAndCategory = await Transaction.find(
      { month: month, day: day },
      { category: category }
    );

    getDateAndCategory.length > 0
      ? res.status(200).json({
          getDateAndCategory,
        })
      : res.status(404).json({
          message: "No Date under Category found.",
        });
  } catch (err) {
    errorResponse(res, err);
  }
});

//? GET ONE ROUTE "/find/:id"
//* Successful on Postman

router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const getTransaction = await Transaction.findOne({ _id: id });

    getTransaction
      ? res.status(200).json({
          message: `${getTransaction.category} transaction was found!`,
          getTransaction,
        })
      : res.status(404).json({
          message: "No transaction found.",
        });
  } catch (err) {
    errorResponse(res, err);
  }
});

//? PATCH ROUTE "/edit/:id"
//* Working on Postman MR

router.patch("/edit/:id", async (req, res) => {
  try {
    // pull value from parameter (id)
    const { id } = req.params;
    // pull info from body
    const info = req.body;

    const returnOption = { new: true };

    //* findOneAndUpdate(query/filter, document, options)
    const UpdatedTransaction = await Transaction.findOneAndUpdate(
      { _id: id },
      info,
      returnOption
    );

    res.status(200).json({
      message: `${UpdatedTransaction.category} transaction has been updated successfully`,
      UpdatedTransaction,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//? DELETE ROUTE "/delete/:id"
//* Successful on Postman
router.delete("/delete/:id", async (req, res) => {
  try {
    //* Pull transaction id from params
    const { id } = req.params;
    const userID = req.user._id;

    //* Find and confirm the user has access to the transaction
    const deleteTransaction = await Transaction.deleteOne({ _id: id, ownerID: userID });

    deleteBudget.deletedCount === 1
    res.status(200).json({
      message: "Transaction was successfully deleted!",
    });
    res.status(404).json({
      message: "Access to or existence of this transaction was not located",
    });
  } catch (err) {
    serverError(res, err);
  }
});

module.exports = router;
