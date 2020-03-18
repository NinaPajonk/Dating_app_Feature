const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');

//MongoDB
const mongo = require('mongodb')
require('dotenv').config()

// Database
let db = null
let url = 'mongodb+srv://NPajonk:Nina%40pajonk25@cluster0-ofs74.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'

mongo.MongoClient.connect(url, function(err, client){
  if (err) {
  throw err
  }
  db = client.db(process.env.DB_NAME)
})

db.collection('datingUsers').find({firstName: "Eliza"});

function startPage(req, res, next) {
  res.render("start.ejs");
}
app.get("/login", startPage);

//object aanmaken
// const data = {
//   id: 'gebruiker1',
//   name: 'Eliza Meijer ',
//   age: '24',
//   bio: 'Hi, ik ben Eliza en ik ben een blogger altijd op zoek naar avontuur. '
// }



// 
express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view enigine', 'ejs');
app.set('views', 'view');
app.use('/static', express.static('static'));

  //home pagina
  app.get('/index', (req, res) => res.sendfile(path.join(__dirname + '/static/index.html')))

  // route naar about pagina
  app.get('/about', (req, res) => res.sendfile(path.join(`${__dirname}/static/about.html`))
  );

  // route naar detail pagina
  app.get('/detail', (req, res) => res.sendfile(path.join(`${__dirname}/static/detail.html`))
  );

  // route naar ejs. Renderen
  app.get('/detail1', (req, res) => res.render('detail.ejs', { data }));

  // route naar geliked Renderen
  app.get('/', (req, res) => res.render('match.ejs', { data }));

  app.listen(port,() => console.log('Example app listening on port' + port));