if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); //Configure dotenv.
}
const express = require("express"); //Require express and assign it to the constant express.
const bcrypt = require("bcrypt"); //Require bycrypt and assign it to the constant bcrypt.
const passport = require("passport"); //Require passport and assign it to the constant passport.
const flash = require("express-flash"); //Require express-flash and assign it to the constant flash.
const session = require("express-session"); //Require express-session and assign it to the constant session.
const methodOverride = require("method-override"); //Require method-override and assign it to the constant methodOverride.
const uuid = require("uuid"); //Require uuid and assign it to the constant uuid.
const logins = require("./services/auth.dal"); //Import auth.dal.js and assign it to the constant logins.
const app = express(); //Assign express to the app constant.
const pp = require("./passport"); //Import passport.js and assign it to the constant pp.
const PORT = process.env.PORT || 3000; //Asssign the constant port to the port 3000.
global.DEBUG = true; //Set global.DEBUG to true.

app.set("view-engine", "ejs"); //Set the view engine to ejs.
app.use(express.urlencoded({ extended: true })); //Set up urlencoded and extend it.
app.use(express.static(__dirname + "/public"));
app.use(flash()); //Set up flash.
app.use(
  session({
    //Set up secret session.
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// below is the method override middleware, method override is a npm package that allows us to use the put and delete methods
app.use(methodOverride("_method"));

// Passport checkAuthenticated() middleware.
// For every route we check the person is logged in. If not we send them
// LOCALHOST STARTS HERE to the login page
app.get("/", pp.checkNotAuthenticated, (req, res) => {
  res.render("index.ejs");
  // res.render("index.ejs", { name: req.user.username });
});

const searchRouter = require("./routes/search"); //Require search.js in routes folder and assign to the constant searchRouter.
app.use("/search", searchRouter); //Use searchRouter when /search route is called.

const authRouter = require("./routes/auth"); //Require auth.js in routes folder and assign to the constant authRouter.
app.use("/auth", authRouter); //Use authRouter when /auth route is called.

// Passport checkNotAuthenticated() middleware.
// This middleware is only for the login and register. If someone stumbles
// upon these routes they only need access if they are NOT authenticated.
app.get("/login", pp.checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});
app.post(
  "/login",
  pp.checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/search",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
app.get("/register", pp.checkNotAuthenticated, (req, res) => {
  //Check if user is authenticated when /register route is called, then render register.ejs.
  res.render("register.ejs");
});

app.post("/register", pp.checkNotAuthenticated, async (req, res) => {
  //Check if user is authenticated when /register route is called.
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //Hash the password and assign it to the constant hashedPassword.
    let result = await logins.addLogin(
      //Call the addLogin function from auth.dal.js and assign the results to result.
      req.body.name,
      req.body.email,
      hashedPassword,
      uuid.v4()
    );
    res.redirect("/login"); //Redirect to /login.
  } catch (error) {
    console.log(error); //If error, log to the console and redirect to /register.
    res.redirect("/register");
  }
});

app.delete("/logout", function (req, res, next) {
  //Use .logout function to log users out.
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login"); //Redirect to login.
  });
});

app.use((req, res) => {
  res.status(404).render("404.ejs"); //Set status to 404 and render 404.ejs.
});

app.use((req, res) => {
  res.status(503).render("503.ejs"); //Set status to 503 and render 503.ejs.
});

app.listen(PORT, () => {
  //Set app to listening on port.
  console.log(`Simple app running on port ${PORT}.`);
});
