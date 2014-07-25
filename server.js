var express = require('express'),
    app = express(),
    fs = require('fs'),
    browserify = require('browserify');

app.use('/build', express.static(__dirname + '/build'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/', express.static(__dirname + '/example'));

app.get('/app.js', function(req, res) {
    res.set({
        'Content-Type': 'application/javascript'
    });
    var b = browserify();
    b.add(__dirname + '/src/index.js');
    b.bundle().pipe(res);
});

app.get('/countries', function(req, res) {
    res.send(require('./lib/country.json').data);
});

app.put('/countries/:country_id/states/:state_id', function(req, res) {
    res.send(req.body);
});

module.exports = app;
