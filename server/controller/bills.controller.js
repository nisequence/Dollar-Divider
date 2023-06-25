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

const nextMonth = (currentMonth) => {
  if (currentMonth == "January") {
    return "February";
  } else if (currentMonth == "February") {
    return "March";
  } else if (currentMonth == "March") {
    return "April";
  } else if (currentMonth == "April") {
    return "May";
  } else if (currentMonth == "May") {
    return "June";
  } else if (currentMonth == "June") {
    return "July";
  } else if (currentMonth == "July") {
    return "August";
  } else if (currentMonth == "August") {
    return "September";
  } else if (currentMonth == "September") {
    return "October";
  } else if (currentMonth == "October") {
    return "November";
  } else if (currentMonth == "November") {
    return "December";
  } else if (currentMonth == "December") {
    return "January";
  }
};
//? POST BILL ("/add")
router.post("/add", async (req, res) => {
  try {
    //const {id} = req.params;
    const {
      title,
      amount,
      dueMonth,
      dueDay,
      autoPay,
      recurring,
      category,
      base,
    } = req.body;

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
        amount: amount,
        paid: false,
        dueMonth: dueMonth,
        dueDay: dueDay,
        autoPay: autoPay,
        recurring: recurring,
        category: category,
        base: req.user._id,
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
      } else if (req.user._id != findHousehold.admin_id) {
        // if user is not the admin
        return res.status(401).json({
          message: "Sorry, you're not the admin!",
        });
      }

      // if works add new transaction to household
      const bill = new Bill({
        title: title,
        amount: amount,
        paid: false,
        dueMonth: dueMonth,
        dueDay: dueDay,
        autoPay: autoPay,
        recurring: recurring,
        category: category,
        base: req.user.householdID,
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
//? GET ALL PERSONAL ROUTER ("/mine")
router.get("/mine", async (req, res) => {
  try {
    const id = req.user._id;

    const getAllBills = await Bill.find({ base: id });

    getAllBills
      ? res.status(200).json({
          message: "All bills from user collection",
          getAllBills,
        })
      : res.status(404).json({
          message: `No bills found.`,
        });
  } catch (err) {
    errorResponse(res, err);
  }
});
//? GET ALL HOUSEHOLD BILLS ROUTE ("/household")
router.get("/household", async (req, res) => {
  try {
    const id = req.user.householdID;

    const getAllBills = await Bill.find({ base: id });

    getAllBills
      ? res.status(200).json({
          message: "All bills from household collection",
          getAllBills,
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
    const { dueDate } = req.params;

    const getDueDate = await Bill.find({
      dueDate: dueDate,
      base: req.user._id,
    });

    getDueDate.length > 0
      ? res.status(200).json({
          message: "Here is your bill",
          getDueDate,
        })
      : res.status(404).json({
          message: "No bills found for this date.",
        });
  } catch (err) {
    errorResponse(res, err);
  }
});

//? GET BILL BY DATE AND CATEGORY ROUTER ("/dateAndCategory/:dueDate/:category")

router.get("/dateAndCategory/:dueDate/:category", async (req, res) => {
  try {
    const { dueDate, category } = req.params;

    const getDueDateAndCategory = await Bill.find(
      { dueDate: dueDate },
      { category: category }
    );

    getDueDateAndCategory.length > 0
      ? res.status(200).json({
          getDueDateAndCategory,
        })
      : res.status(404).json({
          message: "No Due Date under Category found.",
        });
  } catch (err) {
    errorResponse(res, err);
  }
});
//? GET BILL BY CATEGORY ROUTE "/category/:category"

router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const getBillCategory = await Bill.find({ category: category });

    getBillCategory.length > 0
      ? res.status(200).json({
          getBillCategory,
        })
      : res.status(404).json({
          message: "No category found.",
        });
  } catch (err) {
    errorResponse(res, err);
  }
});

//? MARK BILL AS PAID ("/pay/:id")
router.patch("/pay/:id", async (req, res) => {
  try {
    // pull value from parameter (id)
    const { id } = req.params;
    // pull info from body
    const { paid } = req.body;
    const info = { paid: paid };

    const findBill = await Bill.findOne({ _id: id });
    if (!findBill) {
      // if not found
      res.status(404).json({
        message: `No budget found.`,
      });
    }
    const returnOption = { new: true };

    //* findOneAndUpdate(query/filter, document, options)
    const updatedBill = await Bill.findOneAndUpdate(
      { _id: id },
      info,
      returnOption
    );

    console.log(updatedBill);

    if (findBill.recurring === true && paid == true) {
      //* If this bill is supposed to happen again, create a new one for the next month
      const newBill = new Bill({
        title: updatedBill.title,
        amount: updatedBill.amount,
        paid: false,
        dueMonth: nextMonth(updatedBill.dueMonth),
        dueDay: updatedBill.dueDay,
        autoPay: updatedBill.autoPay,
        recurring: updatedBill.recurring,
        category: updatedBill.category,
        base: req.user._id,
      });

      const createBill = await newBill.save();
    }
    //* If bill is not supposed to happen again, skip all that

    updatedBill
      ? res.status(200).json({
          message: `Bill has been updated successfully`,
          updatedBill,
        })
      : res.status(520).json({
          message: "Unable to update budget. Please try again later.",
        });
  } catch (err) {
    serverError(res, err);
  }
});

//? EDIT BILL ROUTE ("/edit/:id")
router.patch("/edit/:id", async (req, res) => {
  try {
    // pull value from parameter (id)
    const { id } = req.params;
    // pull info from body
    const { title, amount, dueDay, autoPay, recurring } = req.body;
    const info = {
      title: title,
      amount: amount,
      dueDay: dueDay,
      autoPay: autoPay,
      recurring: recurring,
    };

    const returnOption = { new: true };

    //* findOneAndUpdate(query/filter, document, options)
    const UpdatedBill = await Bill.findOneAndUpdate(
      { _id: id },
      info,
      returnOption
    );

    res.status(200).json({
      message: `Bill has been updated successfully`,
      UpdatedBill,
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
    const deletedBill = await Bill.findOneAndDelete({ _id: id });

    res.status(200).json({
      message: "Bill was successfully deleted!",
      deletedBill,
    });
    res.status(404).json({
      message: "Bill was not located",
    });
  } catch (err) {
    serverError(res, err);
  }
});

module.exports = router;
