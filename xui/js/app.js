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
    /*
    var log_space = document.getElementById("log-data");

    log_space.innerHTML = log + "<br>" + log_space.innerHTML;
    */
    x$(".log-data").top(log + "<br>");
};

// -----------------------------------------------------------------------------------------------------------------

/**
 * Slide from one screen to the next.
 *
 * @param current_screen (HTMLDivElement)
 * @param new_screen     (HTMLDivElement)
 */
function slideNewScreen (current_screen, new_screen) {

    x$(new_screen).setStyle("left", document.body.offsetWidth + "px");
    x$(new_screen).setStyle("backgroundColor", "orange");
    x$(new_screen).setStyle("z-index", "10");
    x$(current_screen).setStyle("left", "0px");
    x$(current_screen).setStyle("z-index", "1");
    x$(current_screen).tween({
        left: "-" + (document.body.offsetWidth - 20)+ "px",
        duration: 300
    });
    x$(new_screen).tween({
        left:'0px',
        duration: 300,
    }, function () {
        x$(new_screen).tween({
            backgroundColor: "#e0e0e0",
            duration: 500
        });
    });

}

// -----------------------------------------------------------------------------------------------------------------

x$.ready(function () {
    var clickEvent = "click";

    logToScreen(navigator.userAgent);

    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/Android/i)) ||(navigator.userAgent.match(/BlackBerry/i))) {
        clickEvent = "touchstart";
    }

    /* Click Events */
    x$("#slide-screen-2").on(clickEvent, function (e) {
        logToScreen(e);
        slideNewScreen("#screen-1", "#screen-2");
    });
    x$("#slide-screen-1").on(clickEvent, function (e) {
        logToScreen(e);
        slideNewScreen("#screen-2", "#screen-1");
    });

});
