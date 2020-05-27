/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Brandon Lam
 * Email: lamb@oregonstate.edu
 */

var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var data = require('./twitData.json');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'default' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', function (req, res, next) {
    console.log("== URL Parameters for Request:", req.params);
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

app.get('/twits/:index', function (req, res, next) {
    console.log("== url params for rquest:", req.params);
    var index = req.params.index;
    if (index < data.length && index >= 0) {
        var inputs = {
            twits: [data[index]],
            show: 1
        }
        res.render('twitPage', inputs);
    }
    else {
        res.status(404);
        res.render('404Page');
    }
});

app.get('*', function (req, res, next) {
    console.log("== url params for rquest:", req.params);
    res.render('404Page');
    res.status(404);
});

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});