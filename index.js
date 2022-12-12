if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const uuid = require("uuid");
const logins = require("./services/auth.dal"); // use MONGODB dal
const app = express();
const PORT = process.env.PORT || 3000;
global.DEBUG = true;
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

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: true })); //THIS MAY BE TRUE OR FALSE??
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// Passport checkAuthenticated() middleware.
// For every route we check the person is logged in. If not we send them
// LOCALHOST STARTS HERE to the login page
app.get("/", checkAuthenticated, (req, res) => {
  res.render("search.ejs", { name: req.user.username });
});

app.get("/search", checkAuthenticated, (req, res) => {
  res.render("search.ejs");
});

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

// Passport checkNotAuthenticated() middleware.
// This middleware is only for the login and register. If someone stumbles
// upon these routes they only need access if they are NOT authenticated.
app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});
app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});
app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let result = await logins.addLogin(
      req.body.name,
      req.body.email,
      hashedPassword,
      uuid.v4()
    );
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
});

app.delete("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return next();
}

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});
