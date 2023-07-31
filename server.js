
// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// cors 
const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Initialize the main project folder
app.use(express.static("website"));

const getAll = (req, res) => res.status(200).send(projectData);
app.get("/all", getAll);

//callback function POST
const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}

// GET route
app.post("/add", postData);

const port = 8000;
const hostname = "127.0.0.1";


//test server
const listening = () =>
console.log(`server running at http://${hostname}:${port}/`);

//set up sever
app.listen(port, listening);
