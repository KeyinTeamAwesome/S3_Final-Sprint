const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const dal = require("../services/users.dal");

//We don't know if we need this:
// router.use(express.static("public"));

// Log In route
router.get("/login", (req, res) => {
  res.render("users/login");
});

// Submits login information to be authenticated
router.post(
  "/login",
  checkNotAuthenticated,
  // calls function from passport.js
  //check Peter's code for passport.authenticate
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

// Sign up Route
router.get("/signup", checkNotAuthenticated, async (req, res) => {
  res.render("users/signup", { title: "Sign Up" });
});

// Submits user information to be added to the database
router.post("/signup", checkNotAuthenticated, async (req, res) => {
  try {
    // encrypt password before storing in database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // object created to insert into database
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: null,
      favorite_genre: null,
      image: null,
    };

    //ENDED HERE DEC 9 KB & DT
    // Check to see if user already exists
    const userCheck = await getUserByEmail(user.email);
    if (userCheck != null) {
      console.log("User already exists");
      req.flash("error", "User with this email already exists");
      res.redirect("/auth/register");
    } else {
      DEBUG && console.log("Registering User: " + user.name);
      addUser(user);
      DEBUG && console.log("Registered User: " + user.name);
      req.flash("success", "User succesfully created");
      res.redirect("/auth/login");
    }
  } catch (error) {
    console.error(error);
    req.flash("error", "Oops, Something went wrong");
    res.redirect("/auth/register");
  }
});

// //I DON'T THINK WE NEED THIS -KB
// // Route to User Account page
// router.get("/profile", checkAuthenticated, async (req, res) => {
//   res.render("auth/profile", { title: "My Profile" });
// });

// // Submits a request to delete user from database
// router.post("/profile", checkAuthenticated, async (req, res) => {
//   console.log("Unsubscribing..." + user.name);
//   try {
//     await deleteUser(user.email);
//     req.logout(function (err) {
//       if (err) {
//         return next(err);
//       }
//       req.flash("success", "Successfully Unsubscribed");
//       profileIcon = null;
//       user = null;
//       res.redirect("/auth/login");
//     });
//   } catch (error) {
//     req.flash("error2", "Oops, Something went wrong");
//     console.error(error);
//     res.redirect("/auth/profile");
//   }
// });

// // Route to call function to log out user
// router.delete("/logout", (req, res, next) => {
//   DEBUG && console.log("logout initialized");

//   req.logout(function (error) {
//     if (error) {
//       return next(error);
//     }
//     profileIcon = null;
//     user = null;
//     res.redirect("/auth/login");
//   });
// });

module.exports = router;
