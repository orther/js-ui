/**
 * Allow for easy attach event handlers for both W3 and IE browsers.
 */
function addEvent(obj, evType, fn){
    if (obj.addEventListener){
        obj.addEventListener(evType, fn, false);
        return true;
    } else if (obj.attachEvent){
        var r = obj.attachEvent("on"+evType, fn);
        return r;
    } else {
        return false;
    }
}

// -----------------------------------------------------------------------------------------------------------------

/**
 * Log to console or fall back to alert
 */
var log = function (log) {
    try {
        console.log(log);
    } catch (e) {
        alert(log);
    }
};

// -----------------------------------------------------------------------------------------------------------------

/**
 * Log to screen div.
 */
var logToScreen = function (log) {
    var log_space = document.getElementById("log-data");

    log_space.innerHTML = log + "<br>" + log_space.innerHTML;
};

// -----------------------------------------------------------------------------------------------------------------

/**
 * Slide from one screen to the next.
 *
 * @param active_screen (HTMLDivElement)
 * @param new_screen    (HTMLDivElement)
 */
function slideNewScreen (active_screen, new_screen) {
    // position and display new screen to be ready for slide in
    new_screen.style.left      = document.body.offsetWidth;
    new_screen.style.zIndex    = 100;
    new_screen.style.display   = "block";

    active_screen.style.zIndex = 50;

    animator.animate({
        duration: 300,
        step: function () {
            var currentTime = (new Date).getTime();
            var elapsedTime = currentTime - this.startTime;
            var newState    = elapsedTime / this.duration;

            if (newState >= 1) {
                // update elements to final animation frame
                new_screen.style.left       = 0;
                active_screen.style.left    = 0 - document.body.offsetWidth;
                active_screen.style.display = "none";

                return false;
            }

            // update elements to next animation frame
            new_screen.style.left    = document.body.offsetWidth - (document.body.offsetWidth * newState);
            active_screen.style.left = 0 - (document.body.offsetWidth * newState);

            return true;
        }
    });
}

// -----------------------------------------------------------------------------------------------------------------

addEvent(window, 'load', function () {
    var screen_1 = document.getElementById("screen-1");
    var screen_2 = document.getElementById("screen-2");

    screen_1.style.display = "block";
    screen_1.style.zIndex  = 100;

    addEvent(document.getElementById("go-screen-2"), "click", function () {
        slideNewScreen(screen_1, screen_2);
        return false;
    }, true);
    addEvent(document.getElementById("go-screen-1"), "click", function () {
        slideNewScreen(screen_2, screen_1);
        return false;
    }, true);
});

