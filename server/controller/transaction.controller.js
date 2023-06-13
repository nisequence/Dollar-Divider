const router = require("./budget.controller");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const Household = require("../models/household.model");


const serverError = (res, error) => {
    console.log("Server-side error");
    return res.status(500).json({
      Error: error.message,
    });
  };

  //? POST ROUTE "/add"
  //* Do we want to add by :id?
  router.post("/add", async (req, res) => {
    try {
        const {id} = req.params;
        const { date, category, amount, base} = req.body;

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

            const transaction = new Transaction( {
                //! Do you want desc to be the same as category? MR
                date: date,
                category: category,
                amount: amount,
                //ownerId: req.user._id,

            });

        const newTransaction = await transaction.save();

        return res.status(200).json({
            message: `You are created a new transaction!`,
            newTransaction,
          });


        } else if (base == "household") {
           // get household ID
            const findHousehold = await Household.findOne({ _id: id });
      
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
            const transaction = new Transaction( {
                //! Do you want desc to be the same as category? MR
                date: date,
                category: category,
                amount: amount,
                ownerId: req.user._id,

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
  //? GET ALL HOUSEHOLD ROUTE "/household/:id"

  //? GET ALL PERSONAL ROUTE "/mine/:id"

//   router.get("/mine/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { category, amount, base} = req.body;

//         if ()

//     }
//   })

  //? GET BY CATEGORY ROUTE "/category/:id"

  router.get("/category/:id", async (req, res) => {
    try {
        const {category} = req.params;

        const getCategories = await Transaction.find( { category: category}); // find() or findOne() based on what we are actually looking for? MR

        getCategories.amount > 0

        ? res.status(200).json({
            getCategories,
        })
        : res.status(404).json({
            message: 'No category found.'
        });
    } catch (err) {
        errorResponse(res, err);
    }
})

  //? GET ONE ROUTE "/find/:id"

  //? PATCH ROUTE "/edit/:id"

  router.patch("/edit/:id", async (req, res) => {
    try {
        // pull value from parameter (id)
        const { id } = req.params;
        // pull info from body
        const info = req.body;

        const returnOption = {new: true};

        //* findOneAndUpdate(query/filter, document, options)
        const UpdatedTransaction = await Transaction.findOneAndUpdate(
            {_id: id },
            info,
            returnOption);

            res.status(200).json({
                message: `${UpdatedTransaction.desc} has been updated successfully`, UpdatedTransaction,
            })
    } catch (err) {
        errorResponse(res, err);
    }
  });

  //? DELETE ROUTE "/delete/:id"
  router.delete("/delete/:id", async (req, res) => {
    try {
      //* Pull transaction id from params
      const { id } = req.params;
      const userID = req.user._id;
  
      //* Find and confirm the user has access to the transaction
      const deleteTransaction = await Transaction.deleteOne({ _id: id, ownerID: userID });
  
      deleteBudget.deletedCount === 1
        ? res.status(200).json({
            message: "Transaction was successfully deleted!",
          })
        : res.status(404).json({
            message: "Access to or existence of this transaction was not located",
          });
    } catch (err) {
      serverError(res, err);
    }
  });


  module.exports = router;
