let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
let session = require('express-session');
let passport = require('passport');

let express = require('express');
let app = express();
// require routes file
require('./routes')(app, {});
// read environment values from .env
require('dotenv').config();

// set port from .env, default to 5000
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// app.get('/', function(request, response) {
//     response.render('pages/index');
// });

let users = require('./routes/users');
let desktopRouter = require('./routes/inventory/desktopRouter');
let laptopRouter = require('./routes/inventory/laptopRouter');
let tabletRouter = require('./routes/inventory/tabletRouter');
let televisionRouter = require('./routes/inventory/televisionRouter');
let monitorRouter = require('./routes/inventory/monitorRouter');


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Express Session
app.use(session({
    // TODO does secret need to be in .env?
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.');
        let root = namespace.shift();
        let formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value,
        };
    },
}));

app.use('/users', users);
app.use('/inventory/desktopView', desktopRouter);
app.use('/inventory/laptopView', laptopRouter);
app.use('/inventory/monitorView', monitorRouter);
app.use('/inventory/tabletView', tabletRouter);
app.use('/inventory/televisionView', televisionRouter);
