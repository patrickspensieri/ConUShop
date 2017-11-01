let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
let session = require('express-session');
let passport = require('passport');
let flash = require('connect-flash');
let MemoryStore = require('./config/memoryStore');

let UnitOfWork = require('./domain-layer/unit-of-work/unitOfWork');
let IdentityMap = require('./domain-layer/identity-map/idMap');

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

// Express Session, maintained in MemoryStore
let sessionStore = MemoryStore.store;
app.use(session({
    // TODO move the key into the .env file
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    // MemoryStore package replaces default express memory-store
    // MemoryStoreallows control of sessions (delete, get, prune), unlike default
  store: sessionStore,
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

UOW = new UnitOfWork();
idMap = new IdentityMap();

app.use(require('./routes'));
// run the startup tasks
let startup = require('./config/startup');
startup.run();
