// Initialize
window.addEventListener('load', () => {
    // Typewriter Effect
    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-type');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    // Add cursor style
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #f9f5d7 }';
    document.body.appendChild(style);

    // Splash Screen
    setTimeout(() => {
        $('#splash-screen').fadeOut('slow', () => {
            $('#main-content').fadeIn('slow');
            adjustOctogons();
        });
    }, 2000);

    // Preload images
    preloadImages();
});