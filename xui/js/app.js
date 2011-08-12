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
     * Set the first item in the collection passed as the active screen.
     */
    setScreenActive: function () {

        x$("div.screen.active").setStyle("display", "none").removeClass("active");
        this.addClass("active");

        return this;

    },

    // -------------------------------------------------------------------------------------------------------------

    /**
     * Show screen.
     */
    showScreen: function () {

        var current_screen = x$("div.screen.active");
        var new_screen     = this;

        new_screen.setStyle("left", screen_width + "px").setStyle("z-index", "10").setStyle("display", "block");
        current_screen.setStyle("left", "0px").setStyle("z-index", "1").tween({
            left: "-" + (screen_width - 20)+ "px",
            duration: 300
        });
        new_screen.tween({
            left:'0px',
            duration: 300,
        }, function () {
            new_screen.setScreenActive();
        });


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

    },

    // -------------------------------------------------------------------------------------------------------------

    /**
     * Setup window and screen for current display and show first screen.
     *
     * @param load_screen_id (string) ID of screen to be displayed on load.
     */
    windowInit: function (load_screen_id) {

        // setup window
        x$("div#window").setStyle("height", screen_height + "px").setStyle("width", screen_width + "px");

        // setup all screens
        x$("div.screen").setStyle("display", "none").setStyle("height", screen_height + "px")
            .setStyle("width", screen_width + "px");

        // show first screen
        x$("#" + load_screen_id).setStyle("display", "block").setScreenActive();

        return this;

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

screen_height = window.innerHeight;
screen_width  = window.innerWidth;

// -----------------------------------------------------------------------------------------------------------------

x$.ready(function () {

    // initialize window and set main screen to show on load
    x$("div#window").windowInit("main");

    // grow tabbed views to screen height on load
    x$("div.screen#main>div.tabbed-views").growTall();

    // initialize tab view functionality
    x$("div.tab-bar div.tab").tabView(click_event);

    // initialize lists
    x$("div.list").each(function (val, i) {
        x$("div.header>span.count", val).html(x$("div.item", val).length);
    });

    // show chats tab on start
    x$("div.screen#main>div.tabbed-views>div.tab-bar div.tab.chats").fire(click_event);

    /**
     * EXAMPLE SETUP
     */

    // grow chat holder view
    x$("div.screen#chats>div.holder").growTall();

    // setup example screen change buttons
    x$("#go-to-main-screen-chats").on(click_event, function (event) {
        x$("div.screen#main>div.tabbed-views>div.tab-bar div.tab.chats").fire(click_event);
        x$("div.screen#main").showScreen();
    });
    x$("#go-to-main-screen-friends").on(click_event, function (event) {
        x$("div.screen#main>div.tabbed-views>div.tab-bar div.tab.friends").fire(click_event);
        x$("div.screen#main").showScreen();
    });
    x$("#go-to-main-screen-updates").on(click_event, function (event) {
        x$("div.screen#main>div.tabbed-views>div.tab-bar div.tab.updates").fire(click_event);
        x$("div.screen#main").showScreen();
    });
    x$("#go-to-chats-screen").on(click_event, function (event) {
        x$("div.screen#chats>div.holder>div.name").setStyle("display", "none");
        x$("div.screen#chats").showScreen();
    });

    // setup friend list on click event chang
    x$("div.list div.item").on(click_event, function (event) {
        x$("div.screen#chats>div.holder>div.name").html("Chat: "  + x$("div.details div.name", this).html()[0])
            .setStyle("display", "inline-block");
        x$("div.screen#chats").showScreen();
    });

});
