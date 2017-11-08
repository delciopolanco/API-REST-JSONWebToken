const express = require('express'),
    bodyParser = require('body-parser'),
    hbs = require('express-handlebars'),
    server = express(),
    api = require('./routes');

server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(bodyParser.json());
server.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}));
server.set('view engine', '.hbs');
server.use('/api/', api);
server.get('/login', (req, res) => {
    res.render('login');
});

module.exports = server;