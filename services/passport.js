const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const {
  getUserByEmail,
  getUserById,
} = require("../model/controllers/m.auth.dal");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    DEBUG && console.log("Authenticating..." + email);
    const user = await getUserByEmail(email);
    DEBUG && console.log("Authenticated User: " + user);
    if (user == null) {
      return done(null, false, {
        message: `There is no user with email ${email}`,
      });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password Incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new localStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;
