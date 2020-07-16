const { Nuxt, Builder } = require('nuxt');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const consola = require('consola');
const passport = require('./passport/setup');
const auth = require('./routes/auth');
const app = express();

/**
 * Secrets to define in environmental variables
 * SESSION_SECRET - Used to generate sessions.
 * MONGO_URI - Uri with access credentials to the database.
 */

const SESSION_SECRET =
  process.env.NODE_ENV === 'development'
    ? 'my super secret'
    : process.env.SESSION_SECRET;

const bodyParser = require('body-parser');

const MONGO_URI =
  process.env.NODE_ENV === 'development'
    ? 'mongodb://127.0.0.1:27017/auth_test'
    : process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(
    consola.info({
      message: `MongoDB connected ${MONGO_URI}`,
      badge: true
    })
  )
  .catch(err => {
    console.log('Error while connecting to mongodb. Err: ', err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    name: 'auth-session',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 10 },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', auth);

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  await nuxt.ready();
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
