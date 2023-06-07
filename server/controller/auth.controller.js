const router = require("express").Router();

//? GET Route for Testing
router.get('/hello-world', (req, res) => {
    res.send('Hello world');
})

module.exports = router;