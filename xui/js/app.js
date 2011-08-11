/**
 * Log to console or fall back to alert
 */
function log () {
    try {
        console.log.apply(console, arguments);
    } catch (e) {
        alert(log);
    }
}

// -----------------------------------------------------------------------------------------------------------------

/**
 * Log to console or fall back to alert
 */
function error () {
    try {
        console.error.apply(console, arguments);
    } catch (e) {
        alert(["ERROR:",arguments]);
    }
}

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

/**
 * XUI Extensions
 */
x$.extend({

    /**
     * Return the CSS height in pixels for first element in passed collection.
     *
     * @return (number) -1 returned when height can not be determined.
     */
    getCssHeight: function () {

        try {
            if (this.length) {
                return parseInt(/\d+/.exec(this.getStyle("height")[0]));
            }
        } catch (e) {
            error("Invalid height style for provided element:", element);
        }

        return -1;

    },

    // -------------------------------------------------------------------------------------------------------------

    /**
     * Grow all elements in collection's height to occupy available space below in their container element.
     */
    growTall: function  () {

        this.each(function (el, i) {
            x$(el).setCssHeight(x$(el.parentNode).getCssHeight() - el.offsetTop);
        });

        return this;

    },

    // -------------------------------------------------------------------------------------------------------------

    /**
     * Set the CSS height in pixels for first all element in passed collection.
     *
     * @param height (number) Height in pixels.
     */
    setCssHeight: function (height) {

        this.setStyle("height", height + "px");

        return this;

    },

    // -------------------------------------------------------------------------------------------------------------

    /**
     * Apply tab view functionality
     *
     * @param tab_select_event (string)
     */
    tabView: function (tab_select_event) {

        this.on(tab_select_event, function (e) {
            // toggle tabs
            x$(this.parentNode).find("div.tab").removeClass("selected");
            x$(this).addClass("selected");

            // toggle content
            x$(this.parentNode.parentNode).find("div.tab-content").removeClass("selected");
            var classes = x$(this).attr("class")[0].split(" ");
            for (var i = 0, len = classes.length; i < len; i++) {
                if (classes[i] != "tab" && classes[i] != "selected") {
                    x$("div.tab-content."+classes[i], this.parentNode.parentNode).addClass("selected").growTall();
                    break;
                }
            }
        });

    }

});

// -----------------------------------------------------------------------------------------------------------------

var is_android    = navigator.userAgent.match(/Android/i);
var is_blackberry = navigator.userAgent.match(/BlackBerry/i);
var is_iphone     = navigator.userAgent.match(/iPhone/i);
var is_ipod       = navigator.userAgent.match(/iPod/i);
var is_mobile     = (is_android || is_blackberry || is_iphone || is_ipod);

var click_event = (is_mobile && !is_blackberry) ? "touchstart" : "click";

var screen_height = 640;
var screen_width  = 483;

// -----------------------------------------------------------------------------------------------------------------

x$.ready(function () {

    // setup screen size
    x$("div.screen").setStyle("height", screen_height + "px").setStyle("width", screen_width + "px");

    x$("div.screen#main>div.tabbed-views").growTall();

    // initialize tab view functionality
    x$("div.tab-bar div.tab").tabView(click_event);

    // initialize lists
    x$("div.list").each(function (val, i) {
        x$("div.header>span.count", val).html(x$("div.item", val).length);
    });

    // show chats tab on start
    x$("div.screen#main>div.tabbed-views>div.tab-bar div.tab.chats").click();

    /*
    logToScreen(navigator.userAgent);

    x$("#slide-screen-2").on(clickEvent, function (e) {
        logToScreen(e);
        slideNewScreen("#screen-1", "#screen-2");
    });
    x$("#slide-screen-1").on(clickEvent, function (e) {
        logToScreen(e);
        slideNewScreen("#screen-2", "#screen-1");
    });
    */

});
