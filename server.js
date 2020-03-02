const express = require('express'); 
const app = express();
const port = 3000;
const path = require('path')


// 5 object aanmaken
const data = {
    persoon:'Nina',
    leeftijd: 25,
    gender: 'vrouw',
}
// 6 data meegeven render

// 7 .ejs <data.title>

express()
app.set('view enigine','ejs')
app.set('views','view')

app.use('/static',express.static('static'))

// //home pagina
// app.get('/', (req, res) => res.sendfile(path.join(__dirname + '/static/index.html')))

//route naar about pagina
app.get('/about', (req, res) => res.sendfile(path.join(__dirname + '/static/about.html')))

//route naar ejs. Renderen 
app.get('/', (req, res) => res.render('detail.ejs',{data:data}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

