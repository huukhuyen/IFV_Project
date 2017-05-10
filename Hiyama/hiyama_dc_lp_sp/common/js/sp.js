function reSize() {
    var portraitWidth,
        landscapeWidth,
        notElement = "p,address,span,h1,h2,h3,h4,h5,h6,dt,dd,dl";
    target = $("html");
    $(window).bind("resize", function() {
        if (Math.abs(window.orientation) === 0) {
            if (/Android/.test(window.navigator.userAgent)) {
                if (!portraitWidth) {
                    portraitWidth = $(window).width();
                }
            } else {
                portraitWidth = $(window).width();
            }
            target.css("zoom", portraitWidth / 640);
        } else {
            if (/Android/.test(window.navigator.userAgent)) {
                if (!landscapeWidth) {
                    landscapeWidth = $(window).width();
                }
            } else {
                landscapeWidth = $(window).width();
            }
            target.css("zoom", landscapeWidth / 640);
        }
    }).trigger("resize");
}
reSize();