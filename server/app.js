var express         = require('express');
var mongoService    = require('./mongo.service');
var bodyParser      = require('body-parser');
var router          = require('./route');

var app = express();

app.use(mongoService);

app.use(bodyParser.json({
    extended: true
}));

app.use('/api', router);

app.listen(3000);
