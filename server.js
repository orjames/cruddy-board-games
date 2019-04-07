var express = require('express'); // this is a node module
var methodOverride = require('method-override'); // this is a node module
var db = require("./models"); // require in this directory /models
var app = express(); // this is a node module

// for our middleware anything we include in express or need to configure
// app is express
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({extended: false})); // sets up bodyparser
app.use(methodOverride('_method'));

app.get('/', function(req, res){
    res.render('index');
});

// GET /games/ - gets all games
app.get('/games', function(req, res) {
    // Try and get all the records
    db.game.findAll().then(function(games) {
        // Show data within 
        // console.log(games);
        // res.render data into ejs page
        res.render('games/index', {games});
    });
});

app.get('/games/new', function(req, res) {
    res.render('games/new');
});

app.post('/games', function(req, res) {
    db.game.findOrCreate({
        where: {
            name: req.body.name,
            description: req.body.description,
            players: req.body.players
        },
        defaults: {}
    }).spread(function(game, created) {
        // console.log(game);
        res.redirect('/games');
    });
});

// GET /games/3 - gets one game
app.get('/games/:id', function(req, res) {
    db.game.findById(parseInt(req.params.id)).then(function(game) {
        res.render('games/show', {game});
    });
});

app.delete('/games/:id', function (req, res) {
    db.game.destroy({
        where: { id: req.params.id }
    }).then(function() {
        res.redirect('/games');
    });
});

// GET /games/3/edit - returns the populated edit form
app.get('/games/:id/edit', function(req, res) {
    db.game.findById(parseInt(req.params.id)).then(function(game) {
        res.render('games/edit', {game}); // second argument is an object, keys inside that object show up in the page
    });
});

app.put('/games/:id', function(req, res) {
    db.game.update({
        name: req.body.name,
        description: req.body.description,
        players: req.body.players
    }, {
        where: {
            id: parseInt(req.params.id)
        }
    }).then(function(game) {
        res.redirect('/games/' + parseInt(req.params.id));
    }).catch(function(err) {
        res.send(err.errors[0].message);
        // res.send(err);
    });
});

app.listen(3000);
