$(document).ready(function() {
    // Getting references to our form and input
    var signUpButton = $(".newAdmin");
    var usernameInput = $("input#newAdminInput");
    var passwordInput = $("input#newPasswordInput");
    var repeatPasswordInput = $("input#repeat-password-input");

      // Username "on-the-fly" validation
    usernameInput.bind('input propertychange', function() {
    if (usernameInput.val().trim().length < 6) {
      $("#adminName-form").addClass("has-error");
      $("#adminName-feedback").text("username must be at least 3 characters long");
    } else {
      $("#adminName-form").removeClass("has-error");

      $("#adminName-form").addClass("has-success");
      $("#adminName-feedback").text("Username valid!");
    }
  });


  var passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  passwordInput.bind('input propertychange', function() {
    if (!passwordRegEx.test($(this).val())) {
      $("#password-form").removeClass("has-success");

      $("#password-form").addClass("has-error");
      $("#password-feedback").text("Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and must be at least 8 characters long.");
    } else {
      $("#password-form").removeClass("has-error");

      $("#password-form").addClass("has-success");
      $("#password-feedback").text("Password set correctly!");    
    }
  });

  repeatPasswordInput.bind('input propertychange', function() {
    if (passwordInput.val().trim() !== repeatPasswordInput.val().trim()) {
      $("#repeat-password-form").removeClass("has-success");

      $("#repeat-password-form").addClass("has-error");
      $("#repeat-password-feedback").text("Passwords Don't Match");
    } else {
      $("#repeat-password-form").removeClass("has-error");

      $("#repeat-password-form").addClass("has-success");
      $("#repeat-password-feedback").text("Passwords Match!");    
    }
  });


  repeatPasswordInput.bind('input propertychange', function() {
    if (passwordInput.val().trim() !== repeatPasswordInput.val().trim()) {
      $("#repeat-password-form").removeClass("has-success");

      $("#repeat-password-form").addClass("has-error");
      $("#repeat-password-feedback").text("Passwords Don't Match");
    } else {
      $("#repeat-password-form").removeClass("has-error");

      $("#repeat-password-form").addClass("has-success");
      $("#repeat-password-feedback").text("Passwords Match!");    
    }
  });

  var adminData = {
    username: usernameInput.val().trim(),
    password: passwordInput.val().trim()
  };


  if (!adminData.username || !adminData.password) {
    return alert("Please don't leave fields blank");
  }

      // If we have an email and password, run the signUpUser function
      signUpUser(adminData.username, adminData.email, adminData.password);
      passwordInput.val("");
      usernameInput.val("");
      repeatPasswordInput.val("");

      if (!adminData.username || !adminData.email || !adminData.password) {
        return alert("Please don't leave fields blank");
      }
  
      // If we have an email and password, run the signUpUser function
      signUpUser(adminData.username, adminData.email, adminData.password);
      emailInput.val("");
      passwordInput.val("");
      usernameInput.val("");
      repeatPasswordInput.val("");
    });
  
    // Does a post to the signup route. If succesful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(username, email, password) {
      $.post("/dashboard", {
        username: username,
        email: email,
        password: password
      }).then(function(data) {
        if (data.admin) {
          // Replace with Modal
          alert("Sorry, that username has been taken");
        } else {
          window.location = data.redirect;
        }
      }).catch(function(err) {
        console.log(err);
      });
    }

