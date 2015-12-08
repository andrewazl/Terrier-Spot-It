var express = require('express');
var router = express.Router();
var lostItem = require('../models/lostitem');
var foundItem = require('../models/founditem');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

module.exports = function(passport){

  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index', { message: req.flash('message') });
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true
  }));

  /* GET Registration Page */
  router.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* GET Home Page */
  router.get('/home', isAuthenticated, function(req, res){
    res.render('home', { user: req.user });
  });

  /* GET Lost Item Page */
  router.get('/lostitem', isAuthenticated, function(req, res){
    res.render('lostitem', { user: req.user, title: 'Lost Item Page' });
  });

  /* Handle Lost Item POST */
  router.post('/lostitem', isAuthenticated, function(req, res, done){
    var newlostItem = new lostItem();
    var today = new Date();

    newlostItem.username = req.user.username;
    newlostItem.lostitem = req.body.lostitem;
    newlostItem.description = req.body.description;
    newlostItem.address = req.body.address;
    newlostItem.created_at = today;

    // save the lost item
    newlostItem.save(function(err) {
      if (err){
        console.log('Error in Saving Lost Item: '+err);
        throw err;
      }
      console.log('Lost Item information store succesful');
      res.render('map', { user: req.user, title: 'Map' });
    });
  });

  /* GET Found Item Page */
  router.get('/founditem', isAuthenticated, function(req, res){
    res.render('founditem', { user: req.user, title: 'Found Item Page' });
  });

  /* Handle Found Item POST */
  router.post('/founditem', isAuthenticated, function(req, res, done){
    var newfoundItem = new foundItem();
    var today = new Date();

    newfoundItem.username = req.user.username;
    newfoundItem.founditem = req.body.founditem;
    newfoundItem.description = req.body.description;
    newfoundItem.address = req.body.address;
    newfoundItem.created_at = today;

    // save the found item
    newfoundItem.save(function(err) {
      if (err){
        console.log('Error in Saving Found Item: '+err);
        throw err;
      }
      console.log('Found Item information store succesful');
      res.render('map', { user: req.user, title: 'Map' });
    });
  });

  /* GET Map Page */
  router.get('/map', isAuthenticated, function(req, res){
    res.render('map', { user: req.user, title: 'Map' });
  });

  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}

