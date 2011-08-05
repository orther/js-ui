
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
 * @param current_screen (HTMLDivElement)
 * @param new_screen     (HTMLDivElement)
 */
function slideNewScreen (current_screen, new_screen) {
    // move new screen to right of view to setup for slid in effect
    Firmin.translateX(new_screen, document.body.offsetWidth, 0, function () {
        // slide in new screen
        Firmin.animate(new_screen, {
            translateX:     0,
            timingFunction: "ease-out"
        }, "0.5s");
        // slide out current screen
        Firmin.animate(current_screen, {
            translateX:     0 - document.body.offsetWidth,
            timingFunction: "ease-out"
        }, "0.5s");
    });

    //Firmin.animate(new_screen, {translateX: document.body.offsetWidth}, 0);


    // slide out current screen
    /*
    */
    /*
    new_screen.style.cssText     = "-webkit-transition: all 0; -webkit-transform: translate(100%, 0);";
    current_screen.style.cssText = "-webkit-transition: all 0.5s ease-out; -webkit-transform: translate(-100%, 0);";
    new_screen.style.cssText     = "-webkit-transition: all 0.5s ease-out; -webkit-transform: translate(0%, 0);";

    //
    //-webkit-transition: all 0.5s ease-out;

    /*
    // position and display new screen to be ready for slide in
    new_screen.style.left      = document.body.offsetWidth;
    new_screen.style.zIndex    = 100;
    new_screen.style.display   = "block";

    current_screen.style.zIndex = 50;

    animator.animate({
        duration: 300,
        step: function () {
            var currentTime = (new Date).getTime();
            var elapsedTime = currentTime - this.startTime;
            var newState    = elapsedTime / this.duration;

            if (newState >= 1) {
                // update elements to final animation frame
                new_screen.style.left       = 0;
                current_screen.style.left    = 0 - document.body.offsetWidth;
                current_screen.style.display = "none";

                return false;
            }

            // update elements to next animation frame
            new_screen.style.left    = document.body.offsetWidth - (document.body.offsetWidth * newState);
            current_screen.style.left = 0 - (document.body.offsetWidth * newState);

            return true;
        }
    });
    */
}

// -----------------------------------------------------------------------------------------------------------------

addEvent(window, 'load', function () {
    var screen_1 = document.getElementById("screen-1");
    var screen_2 = document.getElementById("screen-2");

    // show first screen
    Firmin.translateX(screen_1, 0);

    addEvent(document.getElementById("slide-screen-2"), "click", function () {
        slideNewScreen(screen_1, screen_2);
        return false;
    }, true);
    addEvent(document.getElementById("slide-screen-1"), "click", function () {
        slideNewScreen(screen_2, screen_1);
        return false;
    }, true);
});

