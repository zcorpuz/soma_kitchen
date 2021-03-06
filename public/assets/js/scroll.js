// Select element function
// call this function where whatever you pass in will be returned to you

(function () {
    const selectElement = element => {
        return document.querySelector(element);
    };

    let menuToggler = selectElement('.menu-toggle');
    let body = selectElement('body');
    let navLinkClick = selectElement('.item-toggle');


    menuToggler.addEventListener('click', () => {
        body.classList.toggle('open');
    })

    navLinkClick.addEventListener('click', () => {
        body.classList.toggle('open');
    })
    
    // Scroll Reveal
    window.sr = ScrollReveal();

    sr.reveal('.animate-left', {
        origin: 'left', 
        duration: 1000,
        distance: '25rem',
        delay: 300
    });

    sr.reveal('.animate-right', {
        origin: 'right', 
        duration: 1000,
        distance: '25rem',
        delay: 600
    });

    sr.reveal('.animate-top', {
        origin: 'top', 
        duration: 1000,
        distance: '25rem',
        delay: 600
    });

    sr.reveal('.animate-bottom', {
        origin: 'bottom', 
        duration: 1000,
        distance: '25rem',
        delay: 600
    });

})();