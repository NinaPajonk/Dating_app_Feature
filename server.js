const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const slug = require('slug');
const bodyParser = require('body-parser');


// object aanmaken
const data = {
  persoon: 'Nina',
  leeftijd: 20,
  gender: 'vrouw',
};
express();
app.use(bodyParser.urlencoded({ extended: true }));
// app.get('/', movies);
app.post('/', add);
app.get('/add', form);
app.get('/id:, movie');
app.set('view enigine', 'ejs');
app.set('views', 'view');
app.use('/static', express.static('static'));

function form(req, res) {
  res.render('add.ejs');
}

function add(req, res) {
  const id = slug(req.body.title).toLocaleLowerCase();
  data.push({
    id,
    title: req.body.title,
    plot: req.body.plot,
    description: req.body.description,
  });
  res.redirect(`/${id}`);
}

  //home pagina
  app.get('/index', (req, res) => res.sendfile(path.join(__dirname + '/static/index.html')))

  // route naar about pagina
  app.get('/about', (req, res) =>
    res.sendfile(path.join(`${__dirname}/static/about.html`))
  );

  // route naar ejs. Renderen
  app.get('/', (req, res) => res.render('detail.ejs', { data }));

  app.listen(port,() => console.log('Example app listening on port' + port))