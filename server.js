const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const slug = require('slug');
const bodyParser = require('body-parser');
const cc = require('camelcase');
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

//object aanmaken
const data = {
  id: 'notebook',
  title: 'Notebook',
  genre: 'Romantic Drama',
  description: ''
}
var upload = multer({dest: 'static/upload/'})

// code uit slides backend
express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', movies);
app.post('/', add);
app.get('/add', form);
app.get('/id:, movie');
app.set('view enigine', 'ejs');
app.set('views', 'view');
app.use('/static', express.static('static'));
app.delete('/:id', remove)

// movie opdracht code examples
function movies(req, res){
  res.render('list.ejs',{data: data})
}

function movie(req, res, next) {
  var id = req.params.id
  var movie = find(data, function (value) {
    return value.id === id
  })

  if (!movie) {
    next()
    return
  }

  res.render('detail.ejs', {data: movie})
}

function form(req, res) {
  res.render('add.ejs')
}

function add(req, res) {
  var id = slug(req.body.title).toLowerCase()
  data.push({
    id: id,
    title: req.body.title,
    plot: req.body.plot,
    description: req.body.description
  })

  res.redirect('/' + id)
}
function remove(req, res) {
  var id = req.params.id

  data = data.filter(function (value) {
    return value.id !== id
  })

  res.json({status: 'ok'})
}

  //home pagina
  app.get('/index', (req, res) => res.sendfile(path.join(__dirname + '/static/index.html')))

  // route naar about pagina
  app.get('/about', (req, res) =>
    res.sendfile(path.join(`${__dirname}/static/about.html`))
  );

  // route naar ejs. Renderen
  app.get('/', (req, res) => res.render('detail.ejs', { data }));

  app.listen(port,() => console.log('Example app listening on port' + port));