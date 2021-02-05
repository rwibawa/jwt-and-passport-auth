require('dotenv').config();

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./auth/auth-admin');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');
const patientRoute = require('./routes/patient-routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use('/patient', passport.authenticate('jwt', { session: false }), patientRoute);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(process.env['PORT'] || 4000, () => {
  console.log('Server started.')
});
