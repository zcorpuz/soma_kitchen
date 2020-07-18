// Server requirements for admin/login //
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const User = require('./models/user');
const exphbs = require('express-handlebars');
const path = require('path'); 
const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);



// creating variables to call the express application.
var app = express();

// setting our application port
app.set('port', 9000);

// Omar and the dude in the video used morgan. Not entirely sure what it does yet //
app.use(morgan('dev'));

// initializing body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initializing cookie-parser to allow access to cookies stored in the browser. 
app.use(cookieParser());

// // Static directory
app.use(express.static("public"));


// initializing express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 8080;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
// ******************************************************************************
// *** Dependencies
// =============================================================
// var express = require("express");
// const path = require('path')
// const passport = require( "./config/passport")
// Sets up the Express App
// =============================================================
// const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));



// handle bars config
// app.engine('handlebars', hbs({extname: 'handlebars',defaultLayout: 'main', layoutsDir: __dirname + '/views'}));

// app.engine(handlebars, exphbs({ demain}))

app.engine('handlebars',exphbs({defaultLayout:'main'}));


// app.set('views', path.join(__dirname, '/main')); 
app.set('view engine', 'handlebars'); 






//set up handlebars
// const exphbs = require('express-handlebars');
// app.engine('handlebars', exphbs({
//     defaultLayout: 'main'
// }));
// app.set('view engine', 'handlebars');


// This middleware is checking if user's cookie is still saved in browser and user is not set, then automatically log the user out.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
  
      res.redirect('/dashboard');
  } else {
      next();
  }    
};

var hbsContent = {userName: '', loggedin: false, title: "You are not logged in today", body: "Hello World"}; 


// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
  res.render('index', {});
});

// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        //res.sendFile(__dirname + '/public/login.html');
        res.render('login', hbsContent);
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        });
    });


// route for user logout
app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
  hbsContent.loggedin = false; 
  hbsContent.title = "You are logged out!"; 
      res.clearCookie('user_sid');
  console.log(JSON.stringify(hbsContent)); 
      res.redirect('/');
  } else {
      res.redirect('/login');
  }
});



// route for user signup
app.route('/signup')
    //.get(sessionChecker, (req, res) => {
    .get((req, res) => {
        //res.sendFile(__dirname + '/public/signup.html');
        res.render('signup', hbsContent);
    })
    .post((req, res) => {
        User.create({
            username: req.body.username,
            //email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            res.redirect('/dashboard');
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });




// route for user's dashboard
app.get('/dashboard', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
  hbsContent.loggedin = true; 
  hbsContent.userName = req.session.user.username; 
  //console.log(JSON.stringify(req.session.user)); 
  console.log(req.session.user.username); 
  hbsContent.title = "You are logged in"; 
      //res.sendFile(__dirname + '/public/dashboard.html');
      res.render('index', hbsContent);
  } else {
      res.redirect('/login');
  }
});

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});



// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));




// Requiring models for syncing
// const db = require("./models");

// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// Routes
// =============================================================


// Syncing our sequelize models and then starting our Express app
// =============================================================
// db.sequelize.sync({ force: true }).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });


