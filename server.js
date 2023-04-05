/*******************************************************
 * Define some constants and variables
 ********************************************************/
const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;
const routes = require('./routes/routes');

/*******************************************************
 * Middleware
 ********************************************************/
app.use(compression());

// Cache the js and css file on default
// The SW is an enhancement.
// Regex must be [filename]-[uuid].[source]
app.use(/.*\..*/, (req, res, next) => {
  res.setHeader('Cache-Control', 'max-age=365000000, immutable');
  next();
});

app.use(express.static('./public'));

/*******************************************************
 * Set template engine
 ********************************************************/
app.set('view engine', 'ejs');
app.set('views', 'views');

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
