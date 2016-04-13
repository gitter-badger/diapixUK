var express = require('express');
// var pg = require('pg');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('www');

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// app.get('/', function(request, response) {
//   response.render('pages/index')
// });
// app.get('/', function(request, response) {
//   var result = ''
//   var times = process.env.TIMES || 5
//   for (i=0; i < times; i++)
//     result += cool();
//   response.send(result);
// });

// app.get('/cool', function(request, response) {
//   response.send(cool());
// });

// app.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// })

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ', app.get('port'));
});