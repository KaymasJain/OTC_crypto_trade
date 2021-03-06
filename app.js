/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const nunjucks = require('nunjucks');
const minifyHTML = require('express-minify-html');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
if (process.env.NODE_ENV === 'development') {
  dotenv.load({ path: '.env.example' });
} else {
  dotenv.load({ path: '.env' });
}

/**
 * Route handlers.
 */
const IndexController = require('./routes/IndexRoutes');

/**
 * Create Express server.
 */
const app = express();



/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: false,
  express: app
});
app.set('view engine', 'html');
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({	
  resave: true,	
  saveUninitialized: true,	
  secret: process.env.SESSION_SECRET,	
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds	
  store: new MongoStore({	
    url: process.env.MONGODB_URI,	
    autoReconnect: true,	
  })	
}));
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
}); 
app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));

app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/:id', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/:id/:id', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }));
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }));


/**
 * Primary app routes.
 */
app.use('/', IndexController);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${chalk.green('✓')} App is running at http://localhost:${process.env.PORT} in development mode`);
  } else {
    console.log(`${chalk.green('✓')} App is running at https://conteract.io in production mode`);
  }
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;