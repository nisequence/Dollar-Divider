const express = require('express');
const app = express();
const PORT = 4000;

//* Requiring in Controllers
const authController = require('./controller/auth.controller');

app.use(express.static(`${__dirname}/public`));
console.log('pathway: ', __dirname);

//* Routes
app.use("/auth", authController);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
