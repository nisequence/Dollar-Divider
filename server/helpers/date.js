/* 
    Created a "helpers folder" ---> helpers is a common folder name for helper functions/middleware/etc (sort of a catch all)

    - Middleware is essentially a function that accesses our request, response, and moves on to other aspects of our code (next).

    - Middleware can be customized to your project needs
*/
// Create a function called "logTime":
// This will have 3 parameters (request, response, next)
// Run logic in the code block {}

function logTime (req, res, next) {
    // we will only see/get the request object in the console when we hit "send" in POSTMAN 
    // console.log(req);
    // TO DO:[] it continues after being called, []create a date for when the request was made, []see/view the request date (from the huge req object)
        // Creating a variable date with the Date datatype class constructor
    let date = new Date();
    let time = new Date();
    // The method we are using  = creating a string for our local date
        req.datePosted = date.toLocaleDateString();
        req.timePosted = time.toLocaleTimeString();

        // Build a console.log to check it's working and show us the time of the request
        console.log(
            `Request datePosted key:`, 
            req.datePosted,
            `\nTime:`,
            req.timePosted
            );

    // App continue out of the function and onto what's next
    next();

};

/* 
    - module.exports
        - exporting an object
        - we can make a variety of objects and store them as keys
*/

module.exports = {
    logTime: logTime,
};
