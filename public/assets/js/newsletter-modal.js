(function () {

  // Get DOM Elements
  const newsletterModal = document.querySelector('#newsletter-modal');
  const closeNewsletterModalBtn = document.querySelector('.newsletter-close');

  $("#newsletter-btn").on("click", event => {
      event.preventDefault();
    
      let newsletterEmail = document.getElementById("newsletter-email").value;

      if(newsletterEmail.indexOf("@") == -1 || newsletterEmail.length < 6){
          alert("Please enter a valid email")
          return false;
      }

      let newSubscriber = {
        email: newsletterEmail
      };
  
      // Send the POST request.
      $.ajax("/api/subscribe", {
        type: "POST",
        data: newSubscriber
      }).then(
        () => {
          console.log("created new subscriber");
          // Reload the page to get the updated list
          // location.reload();
        }
      );

      clearNewsletterForm();
      newsletterModal.style.display = 'block';
  })

  // Events
  closeNewsletterModalBtn.addEventListener('click', closeModal);
  window.addEventListener('click', outsideClick);

  // Close
  const closeModal = () => {
      newsletterModal.style.display = 'none';
  }

  // Close If Outside Click
  const outsideClick = e => {
    if (e.target == newsletterModal) {
      newsletterModal.style.display = 'none';
    }
  }

  // Clear form
  const clearNewsletterForm = () => {
      document.getElementById("newsletter").reset();
  }

})();