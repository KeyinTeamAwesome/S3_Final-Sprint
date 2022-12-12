const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const flash = require("express-flash");
const session = require("express-session");
const logins = require("./services/auth.dal");

passport.use(
  new localStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      let user = await logins.getLoginByEmail(email);
      if (user == null) {
        return done(null, false, { message: "No user with that email." });
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Incorrect password was entered.",
          });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  let user = await logins.getLoginById(id);
  if (DEBUG) console.log("passport.deserializeUser: " + user);
  done(null, user);
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/search");
  }
  return next();
}

module.exports = { checkAuthenticated, checkNotAuthenticated };
