const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');

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


// gebruiker kiezen (session nog toevoegen)
// function startPage(req, res, next) {
//   res.render('start.ejs');
// }
// app.get('/login', startPage);


//
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view enigine', 'ejs');
app.set('views', 'view');
app.use('/static', express.static('static'));

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
app.get('/detail1', (req, res) => res.render('detail.ejs', { data }));

// route naar geliked Renderen
app.get('/', (req, res) => res.render('match.ejs', { data }));

app.get('/test',gebruikers)

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
  

app.listen(port, () => console.log(`Example app listening on port${port}`));
