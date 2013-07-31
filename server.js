var router = require('./router.js');
var express = require('express');
var app = express();
var MongoStore = require('connect-mongo')(express);

// Sessions with connext-mongo to store users cookie info in case server goes down

app.use(express.cookieParser());
app.use(express.session({
    secret: '1234567890QWERTY',
    store: new MongoStore({
      db: router.conn.connection.db
    })
  }));
app.use(express.bodyParser());

// Router functions are defined in users.js

app.post('/login', function(req, res){
  router.login(req, res);
});

app.post('/signup', function(req, res){
  router.signup(req, res);
});

app.post('/create', function(req, res){
  router.create(req, res);
});

app.post('/groups', function(req, res){
  router.groups(req, res);
});

app.post('/logcheck', function(req, res){
  router.logcheck(req, res);
});

app.post('/logout', function(req, res){
  req.session.username = null;
  res.end();
});

app.get('/home', function(req, res){
  	res.end('home');
});

app.get('/login', function(req, res) {
  res.sendfile('./html/login.html');
});

app.get('/signup', function(req, res) {
  res.sendfile('./html/signup.html');
});

app.get('/', function(req, res){
  res.sendfile('./html/create.html');
});

// app.get('/', function(req, res){
//   if(!req.session.username) { res.redirect('/login'); }
//   else { res.sendfile("./html/home.html"); }
// });

app.get('/css/login.css', function(req, res){
	res.setHeader('Content-Type', 'text/css');
	res.sendfile('./css/login.css')
});

app.get('/css/home.css', function(req, res){
	res.setHeader('Content-Type', 'text/css');
	res.sendfile('./css/home.css')
});

app.get('/css/create.css', function(req, res){
	res.setHeader('Content-Type', 'text/css');
	res.sendfile('./css/create.css')
});


app.get('/*', function(req, res) {
	res.redirect('/');
});


app.listen(process.env.PORT || 8080);
console.log('Listening on port 8080...');





