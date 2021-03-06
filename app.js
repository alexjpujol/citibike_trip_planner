'use strict';

var express = require('express');
var app = express();

app.listen(process.env.PORT || 3000);

app.use(express.static('public'))
app.set('view engine', 'jade');
app.set('views', './views');
app.set('view options', {
    layout: false
});

app.get('/', function(req,res) {
    res.render('index');
});