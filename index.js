if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const uuid = require("uuid");
const logins = require("./services/auth.dal");
const app = express();
const pp = require("./passport");
const PORT = process.env.PORT || 3000;
global.DEBUG = true;

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: true })); //THIS MAY BE TRUE OR FALSE??
app.use(express.static(__dirname + "/public"));
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
app.get("/", pp.checkNotAuthenticated, (req, res) => {
	res.render("index.ejs");
	// res.render("index.ejs", { name: req.user.username });
});

const searchRouter = require("./routes/search");
app.use("/search", searchRouter);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

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
	res.render("register.ejs");
});
app.post("/register", pp.checkNotAuthenticated, async (req, res) => {
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

app.listen(PORT, () => {
	console.log(`Simple app running on port ${PORT}.`);
});
