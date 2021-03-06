require('dotenv').config();
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

/*
  Load Routes
*/
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

/*
  Initialize Express App based on Environment
*/
const app = express();
let server;
if (process.env.NODE_ENV === 'development') {
  // HTTPS for development
  const sslOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  };
  server = https.createServer(sslOptions, app);
} else if (process.env.NODE_ENV === 'production') {
  // HTTP because HTTPS is handled by Heroku
  server = http.createServer(app);
} else {
  const err = new Error(
    'Please add the .env file with NODE_ENV=development to the root dir'
  );
  throw err;
}


/*
  Connect to the Database
*/
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.once('open', () => console.log('Connected to the Database'));
// Mongo Debugging
// if (process.env.NODE_ENV === 'development') {
//   mongoose.set('debug', true);
// }

/*
  Configure Middleware
*/
const sessionSecret = process.env.SESSION_SECRET || 'mySecret';
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

/*
  User Routes
*/
app.use('/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/books', booksRouter);

/*
  Serve the Single Page App from React Build in Production
*/
if (process.env.NODE_ENV === 'production') {
  app.use(favicon(path.join(__dirname, 'client/build', 'favicon.ico')));
  app.use(express.static('./client/build'));
  // Catch any other address and serve index.html
  app.get('*', function(req, res) {
    res.sendfile(__dirname + '/client/build/index.html');
  });
}

/*
  Catch 404 (Not found) and forward to error handler
*/
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*
  Error Handler
*/
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Send Error Message
  console.log(err);
  res.status(err.status || 500);
  res.send('error');
});

/*
  Port Listenning Setup
*/
const port = process.env.PORT || 4000;
server.listen(port, function listening() {
  console.log('Listening on %d', server.address().port);
});
