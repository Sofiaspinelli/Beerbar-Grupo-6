require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override')
const session = require('express-session');
const testConnection = require('../utils/dbconnectiontest');


const userLogin = require('./middlewares/userLoginCheck');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');
const apisRouter = require('./routes/api/apis');
/* const remindMiddleware = require('./middlewares/remindMiddleware');
 */ /* No hacia falta el requerir ni el uso de app.use, de eso se encarga el cookie.cookieParser */
const app = express();
testConnection();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Trabajar con put y delete */
app.use(methodOverride('_method'));

app.use(session({
   secret: 'Beerbar',
   resave: true, 
  saveUninitialized: true,
  maxAge: 3600000 }));
app.use(userLogin)



/* app.use(remindMiddleware); */

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..' , 'public')));


/* Rutas */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);
app.use('/api', apisRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
