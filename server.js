/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Brandon Lam
 * Email: lamb@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var data = require('./twitData.json');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    defaultLayout: 'main',
    helpers: {
        foo: function () { return 'FOO!'; },
        bar: function () { return 'BAR!'; }
    },
    extname: '.handlebars'
});

app.get('/', function (req, res, next) {
    console.log("== Got a request")
    console.log("== Request Parameters:", req.params);
    //shows all data for the page
    if (data) {
        var inputs = {
            twits: data,
            show: 1
        }
        res.render('twitPage', inputs);
    }
    else {
        next();
    }
});
/*
app.get('/twits/:index', function (req, res, next) {
    console.log("== Got a request")
    console.log("== Request Parameters:", req.params);
    var index = req.params.index;
    if (index < data.length && index >= 0) {
        var inputs = {
            twits: [data[index]],
            show: 0
        }
        res.render('twitPage', inputs);
    }
    else {
        res.status(404);
        res.render('404Page');
    }
});*/

//Function that renders the 404 page on attempting to access something inaccessible.
app.get('*', function (req, res, next) {
    console.log("== Got a request")
    console.log("== Request Parameters:", req.params);
    res.render('404Page');
    res.status(404);
});

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});