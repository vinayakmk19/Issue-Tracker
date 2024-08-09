const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const mainRouter = require('./routes/index');

const app = express();

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Use EJS as the view engine and set the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use the mainRouter for all routes
app.use('/', mainRouter);

// Export the app for use in other files
module.exports = app;
