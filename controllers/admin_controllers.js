var db = require('../models')

// Logging in as an admin //

exports.loginUser = function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
  res.json("/dashboard");
};


// register a new admin //
exports.signUpAdmin = function(req,res) {

    db.Admins.findAll({
      where: {username: req.body.username}
    }).then(function(users) {
      if (users.length > 0) {
        res.json({
          duplicateUser: true
        });
      } else {
        db.Admins.create({
          username: req.body.username,
          password: req.body.password
        }).then(function() {
          res.send({redirect: '/dashboard'});
        }).catch(function(err) {
          res.json(err);
        });
      }
    })
  };


// Signup a new admin //

$(document).ready(function() {
  // Getting references to our form and input
  var signUpButton = $(".signup");
  var usernameInput = $("input#username-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  var repeatPasswordInput = $("input#repeat-password-input");
  var repeatEmailInput = $("input#repeat-email-input");







// const readyLogin = module.exports =$(document).ready(() => {
//     let loginForm = $("form.login");
//     var usernameInput = $("input#username-input");
//     var passwordInput = $("input#password-input");







// var db = require('../models');
// const admin = require('../models/admin');

//this is the admin_controller.js file
// exports.registrationPage = function(req,res) {
//   res.render('admin/registration', {
//     layout: 'main-registration'
//   });
// };

// exports.signOutUser = function(req,res) {
//   req.logout();
//   res.redirect("/");
// };

// login
// exports.loginAdmin = {

// const login = document.getElementById('adminLogin')
// }





// function loginUser(username, password) {
//     $.post("/users/login", {
//       username: username,
//       password: password
//     }).then(data => {
//       window.location.replace(data);
//       // If there's an error, log the error
//     }).catch(function(err) {
//       $("#password-feedback").text("Incorrect Username or Password");
//     });
// }

// register a user
// exports.signUpUser = function(req,res) {
// }


// bcrypt password creations //
// bcrypt.genSalt(saltRounds, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         // store hash inside database
//     })
// })
