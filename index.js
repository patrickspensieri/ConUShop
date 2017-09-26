var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

let express = require('express');
let app = express();
let {Client} = require('pg');
let client = new Client({
    connectionString: 'postgres://kkpbujauwlnekb:8c221de6a032ef270df3d9c1048336529f38477b7adbddade13a3c6d22d52f27@ec2-54-243-255-57.compute-1.amazonaws.com:5432/d3n2v1itic5914',
    ssl: true,
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

client.connect();

client.query('SELECT * FROM television', (err, result) => {
    if (err) throw err;
    for (let row of result.rows) {
        console.log(JSON.stringify(row));
    }
// ,{jsonData: JSON.parse(JSON.stringify(result)).rows}
    client.end();
});

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

var users = require('./routes/users');
var routes = require('./routes/authenticate');
// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

app.use('/users', users);


