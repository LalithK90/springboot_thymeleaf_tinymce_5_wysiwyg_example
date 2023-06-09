
// Add smooth scrolling to all links
$("a").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {

        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    } // End if
});

$(document).ready(function () {
    let timerElement = $('#timer');
    let totalTime = 120 * 60; // Total time in seconds (2 hours)

    function startTimer () {
        let hours, minutes, seconds;

        let timer = setInterval(function () {
            hours = parseInt(totalTime / 3600, 10);
            minutes = parseInt((totalTime % 3600) / 60, 10);
            seconds = parseInt(totalTime % 60, 10);

            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            timerElement.text(hours + ':' + minutes + ':' + seconds);

            if (--totalTime < 0) {
                clearInterval(timer);
                timerElement.text('Time is up!');
                // Handle time up event here
            }
        }, 1000);
    }

    startTimer();
});

function setActiveLink (event) {
    // Remove "active" class from all nav items
    let navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(function (item) {
        item.classList.remove('active');
    });

    // Add "active" class to the clicked nav item
    event.target.classList.add('active');
}