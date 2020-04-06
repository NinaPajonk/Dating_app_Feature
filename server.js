const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');

// bodyparser
app.use(bodyParser.urlencoded({ extended: true }));

// ejs
app.set('view enigine', 'ejs');
app.set('views', 'view');

// MongoDB Database
const mongo = require('mongodb');
require('dotenv').config();

let db = null;
let userid = null;
let usersCollection = null;
const url ='mongodb+srv://asd123:asd123@cluster0-ofs74.mongodb.net/test?retryWrites=true&w=majority'

mongo.MongoClient.connect(url, function(err, client) {
  if (err) {
    throw err;
  }
  db = client.db(process.env.DB_NAME);
  console.log("Verbinden met de database");
  usersCollection = db.collection("Users");
  
});

// de static files folder
app.use('/static', express.static('static'));

// session werkt nog niet!!!! source: https://github.com/expressjs/session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// ROUTE NAAR EJS RENDEREN 
// pagina om gebruiker te kiezen
app.get('/',gebruikers)
// pagina met alle profielen
app.get('/findlove',gebruiker1)
// matches overzicht
app.get('/matches',overzichtMatches)
// na dat je gebruiker hebt gekozen
app.post("/login", inloggen);
// liken
app.post("/:id", like);


// wanneer je bent ingelogd kom je op de findlove pagina
function inloggen(req, res, next) {
  req.session.currentUser = req.body.user;
  userid = req.session.currentUser;
  userCollection = db.collection("users" + userid);
  res.redirect("findlove");
  console.log("Je bent ingelogd! Find true LOVE!! " + userid);
}


// function like. Update One. source:  https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#db.collection.updateOne
function like (req, res, next) {
  let id = req.params.id;
UsersCollection.updateOne({id: userid}, {$push: {"hasLiked": id}});
}
  // toevoegen aan gebruikers collectie
  UsersCollection.findOne({id : id}, addToCollection)

// function pagina gebruiker 1
function gebruiker1 (req, res){
  db.collection('Users').find({}).toArray(done)
  function done(err, data){
    if (err){
      next (err)
    } else {
      console.log(data);
    res.render('detail.ejs',{data: data})
    }
    }
  }

// function start
function gebruikers (req, res){
  db.collection('Users').find({}).toArray(done)
  function done(err, data){
    if (err){
      next (err)
    } else {
      console.log(data);
    res.render('start.ejs',{data: data})
    }
    }
  }

// function pagina gebruiker 1
function overzichtMatches (req, res){
  db.collection('Users').find({}).toArray(done)
  function done(err, data){
    if (err){
      next (err)
    } else {
      console.log(data);
    res.render('match.ejs',{data: data})
    }
    }
  
  }
app.listen(port, () => console.log(`Example app listening on port${port}`));
