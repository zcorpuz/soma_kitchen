(function () {

    $("#contact-btn").on("click", function(event) {
        event.preventDefault();

        let clientName = document.getElementById("name").value;
        let clientPhoneNumber = document.getElementById("phone-number").value;
        let clientEmail = document.getElementById("email").value;
        let clientMessage = document.getElementById("message-input").value;    
        let errorMessage = document.getElementById("error-message");
        
        let validationMessage;
        if(clientName.length < 5){
        validationMessage = "Please enter your full name";
        errorMessage.style.padding = "10px";
        errorMessage.innerHTML = validationMessage;
        return false;
        }
        
        if(isNaN(clientPhoneNumber) || clientPhoneNumber.length != 10){
        validationMessage = "Please enter a valid phone number";
        errorMessage.style.padding = "10px";
        errorMessage.innerHTML = validationMessage;
        return false;
        }

        if(clientEmail.indexOf("@") == -1 || clientEmail.length < 6){
        validationMessage = "Please enter a valid email address";
        errorMessage.style.padding = "10px";
        errorMessage.innerHTML = validationMessage;
        return false;
        }

        if(clientMessage.length <= 50){
        validationMessage = "Please enter more than 50 characters in the 'Message' body";
        errorMessage.style.padding = "10px";
        errorMessage.innerHTML = validationMessage;
        return false;
        }

        if (errorMessage.style.padding = "10px") {
            errorMessage.style.display = "none";
        }

        let newContact = {
            email: clientEmail,
            fullName: clientName,
            message: clientMessage,
            phoneNumber: clientPhoneNumber
        };
  
        console.log(newContact);
    
        // Send the POST request.
        $.ajax("/api/contactUs", {
        type: "POST",
        data: newContact
        }).then(
            () => {
                console.log("created new contact guest");
                // Reload the page to get the updated list
                // location.reload();
            }
        );

        clearInputForm();

        contactModal.style.display = 'block';
    })

    // Get DOM Elements
    const contactModal = document.querySelector('#contact-modal');
    const closeContactModalBtn = document.querySelector('.contact-close');

    closeContactModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);

    // Close
    function closeModal() {
        contactModal.style.display = 'none';
    }

    // Close If Outside Click
    function outsideClick(e) {
    if (e.target == contactModal) {
        contactModal.style.display = 'none';
    }
    }

    // Clear form
    function clearInputForm() { 
        document.getElementById("contact-form-input").reset();
    }
})();