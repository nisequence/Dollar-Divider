const router = require("express").Router();
const FinAccount = require("../models/finAccount.model");
const User = require("../models/user.model");
const Household = require("../models/household.model");
const Budget = require("../models/budget.model");
const Bills = require("../models/bill.model");
const Transaction = require("../models/transaction.model");
//* Do we want a get all for household? that information will be private?


const serverError = (res, error) => {
    console.log("Server-side error");
    return res.status(500).json({
      Error: error.message,
    });
  };



//? Post "/add"
router.post("/add", async (req, res) => {
    try {
      //const {id} = req.params;
  
      const { name, balance, minBalance, allocations, available, ownerID } = req.body;

        const finAccount = new FinAccount({
          name: name,
          balance: balance,
          minBalance: minBalance,
          allocations: allocations,
          available: available,
          ownerID: ownerID,
        });
  
        const newFinAccount = await finAccount.save();
  
        return res.status(200).json({
          message: `You have created a new financial account!`,
          newFinAccount,
        });
     
    } catch (err) {
      serverError(res, err);
    }
  });

//? GET ALL PERSONAL ACCOUNTS ROUTE "/mine"
//* Successful on Postman

router.get("/mine", async (req, res) => {
    try {
      const id = req.user._id;
  
      const getAllUserFinAccounts = await FinAccount.find({ownerID: id});
  
      getAllUserFinAccounts
        ? res.status(200).json({
            message: "All financial accounts from user collection",
            getAllUserFinAccounts,
          })
        : res.status(404).json({
            message: `No financial accounts found.`,
          });
    } catch (err) {
      errorResponse(res, err);
    }
  });

//? Patch "/edit/:id"
//* Are these by id?

router.patch("/edit/:id", async (req, res) => {
    try {
      // pull value from parameter (id)
      const { id } = req.params;
      // pull info from body
      const info = req.body;
  
      const returnOption = { new: true };
  
      //* findOneAndUpdate(query/filter, document, options)
      const UpdatedFinAccount = await FinAccount.findOneAndUpdate(
        { _id: id },
        info,
        returnOption
      );
  
      res.status(200).json({
        message: `${UpdatedFinAccount.name} account has been updated successfully`,
        UpdatedFinAccount,
      });
    } catch (err) {
      errorResponse(res, err);
    }
  });
  
//? Delete "/delete/:id"

router.delete("/delete/:id", async (req, res) => {
    try {
      //* Pull transaction id from params
      const { id } = req.params;
  
      //* Find and confirm the user has access to the transaction
      const deletedFinAccount = await FinAccount.findOneAndDelete({ _id: id });
  
      res.status(200).json({
        message: "Financial account was successfully deleted!", deletedFinAccount
      });
      res.status(404).json({
        message: "Access to or existence of this financial account was not located",
      });
    } catch (err) {
      serverError(res, err);
    }
  });


module.exports = router;