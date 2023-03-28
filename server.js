/*******************************************************
 * Define some constants and variables
 ********************************************************/

const express = require('express');
let ejs = require('ejs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

const routes = require('./routes/routes');

/*******************************************************
 * Middleware
 ********************************************************/
app.use(express.static('./public'));

/*******************************************************
 * Set template engine
 ********************************************************/
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors({ origin: 'http://localhost' }));

/*******************************************************
 * Routes
 ********************************************************/
app.use(routes);

/*******************************************************
 * If no routes give response, show 404
 ********************************************************/
app.use((req, res) => {
  res.status(404).send('Error 404: Pagina niet gevonden');
});

/*******************************************************
 * Start webserver
 ********************************************************/
app.listen(port, () => console.log(`Server running on port ${port}`));
