let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
let session = require('express-session');
let passport = require('passport');
let flash = require('connect-flash');

let express = require('express');
let app = express();
// read environment values from .env
require('dotenv').config();

// set port from .env, default to 5000
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/presentation-layer/assets'));
app.set('views', __dirname + '/presentation-layer/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Express Session, maintained in memory-store
app.use(session({
    // TODO move the key into the .env file
    secret: 'secret',
    saveUninitialized: true,
    resave: false,
}));
app.use(flash());

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

app.use(require('./routes'));
