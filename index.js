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
