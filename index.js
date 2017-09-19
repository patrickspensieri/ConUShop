var express = require('express');
var app = express();
var { Client } = require('pg');
var client = new Client({
    connectionString : "postgres://kkpbujauwlnekb:8c221de6a032ef270df3d9c1048336529f38477b7adbddade13a3c6d22d52f27@ec2-54-243-255-57.compute-1.amazonaws.com:5432/d3n2v1itic5914",
    ssl: true
})

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    client.connect();

    client.query('SELECT * FROM television', (err, result) => {
        if (err) throw err;
        for (let row of result.rows) {
            console.log(JSON.stringify(row));
        }
        response.render('pages/index'
            //,{jsonData: JSON.parse(JSON.stringify(result)).rows}
        );


        client.end();
    });


});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
