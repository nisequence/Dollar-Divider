const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT;

const serverError = (res, error) => {
  console.log("Server-side error");
  return res.status(500).json({
    Error: error.message,
  });
};

//? POST Route for Register
router.post("/register", async (req, res) => {     
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 11)
    });
        const newUser = await user.save();

        const token = jwt.sign({ id: user._id }, SECRET, {
            expiresIn: "3 days",
        });

        return res.status(200).json({
            user: newUser,
            message: "New user created!",
            token,
        });
    } catch (err) {
        serverError(res, err);
    }
});

//? POST Route for login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email: email})

        if (!user) throw new Error("Credentials do not match!");

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) throw new Error("Credentials do not match!");

        //4. After verified, provide a jwt token
        const token = jwt.sign({id: user._id}, SECRET, {expiresIn: "3 days"});

        //5. response status returned
        return res.status(200).json({
            message: "Login successful!",
            user,
            token
        })
    } catch (err) {
        serverError(res, err);
    }
})

//? GET Route for Testing
router.get('/hello-world', (req, res) => {
    res.send('Hello world');
})

module.exports = router;