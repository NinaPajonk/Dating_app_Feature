const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');

// MongoDB
const mongo = require('mongodb');
require('dotenv').config();

// Database
let db = null;
const url ='mongodb+srv://asd123:asd123@cluster0-ofs74.mongodb.net/test?retryWrites=true&w=majority'

mongo.MongoClient.connect(url, function(err, client) {
  if (err) {
    throw err;
  }
  db = client.db(process.env.DB_NAME);
});

//
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

// session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.set('view enigine', 'ejs');
app.set('views', 'view');


// home pagina
app.get('/index', (req, res) =>
  res.sendfile(path.join(`${__dirname}/static/index.html`))
);

// route naar about pagina
app.get('/about', (req, res) =>
  res.sendfile(path.join(`${__dirname}/static/about.html`))
);

// route naar detail pagina
app.get('/detail', (req, res) =>
  res.sendfile(path.join(`${__dirname}/static/detail.html`))
);

// route naar ejs. Renderen
// app.get('/detail1', (req, res) => res.render('detail.ejs', { data }));
app.get('/findlove',gebruiker1)

// route naar geliked Renderen
app.get('/', (req, res) => res.render('match.ejs', { data }));

app.get('/start',gebruikers)
// matches overzicht
app.get('/matches',overzichtMatches)
// error404
app.get('/*', error404);

// Bij een 404
function error404(req, res) {
  res.render('404');
}
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

// function db
function gebruikers (req, res){
  db.collection('Users').find({}).toArray(done)
  function done(err, data){
    if (err){
      next (err)
    } else {
      console.log(data);
    res.render('add.ejs',{data: data})
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
