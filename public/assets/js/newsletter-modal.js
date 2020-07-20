(function () {

  // Get DOM Elements
  const newsletterModal = document.querySelector('#newsletter-modal');
  const closeNewsletterModalBtn = document.querySelector('.newsletter-close');

  $("#newsletter-btn").on("click", function(event) {
      event.preventDefault();
    
      let newsletterEmail = document.getElementById("newsletter-email").value;

      if(newsletterEmail.indexOf("@") == -1 || newsletterEmail.length < 6){
          alert("Please enter a valid email")
          return false;
      }

      clearNewsletterForm();
      newsletterModal.style.display = 'block';
  })

  // Events
  closeNewsletterModalBtn.addEventListener('click', closeModal);
  window.addEventListener('click', outsideClick);

  // Close
  function closeModal() {
      newsletterModal.style.display = 'none';
  }

  // Close If Outside Click
  function outsideClick(e) {
    if (e.target == newsletterModal) {
      newsletterModal.style.display = 'none';
    }
  }

  // Clear form
  function clearNewsletterForm() {
      document.getElementById("newsletter").reset();
  }

})();