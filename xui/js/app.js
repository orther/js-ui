/**
 * Return the CSS height of an element as a number. This will retrun the height set in the style with the px, em,
 * etc... removed and the string number converted to a number.
 *
 * @param element (DOMElement)
 *
 * @return (number)
 */
function getElementCssHeight (element) {

    var heightPattern = /\d+/;

    try {
        var cssHeight = heightPattern.exec(x$(element).getStyle("height")[0]);
    } catch (e) {
        error("Invalid height style for provided element:", element);
    }

}

// -----------------------------------------------------------------------------------------------------------------

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
     * Grow element height to occupy remaing space below available in their parent element.
     */
    growTall: function  () {
        this.each(function (el, i) {
            //log(getElementCssHeight(el.parentNode));
            x$(el).setStyle("height", (el.parentNode.scrollHeight - el.offsetTop) + "px");
        });
        /*
        this.each(function (el, i) {
            log(el.parentNode);
            log(el.parentNode.offsetHeight, el.offsetTop, el.parentNode.offsetHeight - el.offsetTop);
            //x$(el).setStyle("height", el.parentNode.offsetHeight - el.offsetTop - 5);
            /*
            /*
            if (x$(el).hasClass("grow_tall")) {
                // apply grow tall to root element
            }
                // apply grow tall to child elements


        });
        /*
        x$(selectors).each(function (el, i) {
            log(el.parentNode.offsetHeight, el.offsetTop, el.parentNode.offsetHeight - el.offsetTop);
            x$(el).setStyle("height", el.parentNode.offsetHeight - el.offsetTop - 5);
        });
        */
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
            var tab_classes = x$(this).attr("class")[0].split(" ");
            for (var i = 0, len = tab_classes.length; i < len; i++) {
                if (tab_classes[i] != "tab" && tab_classes[i] != "selected") {
                    x$(this.parentNode.parentNode).find("div.tab-content."+tab_classes[i]).addClass("selected")
                        //.growTall();
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

var click_event   = (is_mobile && !is_blackberry) ? "touchstart" : "click";

var screen_height = 640;
var screen_width  = 483;

// -----------------------------------------------------------------------------------------------------------------

x$.ready(function () {

    getElementCssHeight(x$("div.screen")[0]);

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
