console.log("hallo wereldje")
/*******************************************************
 * Define some constants and variables
 ********************************************************/

const express = require("express");
let ejs = require("ejs");

const app = express();
const port = process.env.PORT || 8000;

const routes = require('./routes/routes');


/*******************************************************
 * Middleware
 ********************************************************/
app.use(express.static("./public"));

/*******************************************************
 * Set template engine
 ********************************************************/
app.set("view engine", "ejs");

/*******************************************************
 * Routes
 ********************************************************/
app.use(routes);

/*******************************************************
 * If no routes give response, show 404
 ********************************************************/
app.use((req, res) => {
    res.status(404).send("Error 404: Pagina niet gevonden");
});

/*******************************************************
 * Start webserver
 ********************************************************/
app.listen(port, () => console.log(`Server running on port ${port}`));