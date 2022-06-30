require('dotenv').config();

const createError     = require('http-errors');
const express         = require('express');
const path            = require('path');
const cookieParser    = require('cookie-parser');
const logger          = require('morgan');
const bodyParser      = require('body-parser');
const schedule        = require('node-schedule');
const cors            = require('cors');
const ejsLayouts      = require("express-ejs-layouts");
const wagner          = require('wagner-core');
const helmet          = require('helmet');
var http              = require('http');

let app               = express();
const io              = require('socket.io')();
const port = 9096;

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({limit: '5000mb',extended: true}));
app.use(bodyParser.urlencoded({limit: '5000mb',extended: true}));
app.options('*', cors())
app.use(function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*"); 
    // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*Setting up layouts*/

app.use(ejsLayouts); 
const mongoose = require('./utils/db')(wagner);
require("./models")(mongoose, wagner);
require('./manager')(wagner);
require('./utils/middlewares')(wagner);
require('./utils/dependencies')(wagner);
let users = require("./routes")(app, wagner);

const serverInstance = app.listen(port, () => console.log(`App listening on port ${port}!`));


