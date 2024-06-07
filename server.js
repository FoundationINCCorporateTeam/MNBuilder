const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./models/User'); // User model defined later
const paymentRoutes = require('./routes/paymentRoutes');
const forumRoutes = require('./routes/forumRoutes');

const app = express();

mongoose.connect('mongodb://localhost/nocode-builder', { useNewUrlParser: true, useUnifiedTopology: true });

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.post('/signup', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    passport.authenticate('local')(req, res, () => {
      res.status(200).send('Signed up successfully');
    });
  });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).send('Logged in successfully');
});

app.use('/payments', paymentRoutes);
app.use('/forum', forumRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
