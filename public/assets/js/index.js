    // Get the modal
var modal = document.getElementById("modal1");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




// // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // 
// login modal and checks password with database //
// Login functionality. ready() waits for the page to load//
$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var usernameInput = $("input#adminInput");
  var passwordInput = $("input#passwordInput");
  
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username) {
      usernameInput.css("border", "solid 1px red");
      $("#adminName").text("Please enter a username");
      return;
    }

    if (!userData.password) {
      passwordInput.css("border", "solid 1px red");
      $("#password-feedback").text("Please enter a password");
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });


  function loginUser(username, password) {
    pasword = true;
    console.log(password)
    console.log(loginUser)
    $.post("/dashboard", {
      username: username,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      $("#password-feedback").text("Incorrect Username or Password");
    });
  
  }
});
