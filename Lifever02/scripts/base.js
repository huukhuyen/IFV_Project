var fadeTopEffect = {
    setInit: function() {
        $(window).scroll(function() {
            $(".fadeTop").each(function() {
                var elemPos = $(this).offset().top;
                var scroll = $(window).scrollTop();
                var windowHeight = $(window).height();
                if (scroll > elemPos - windowHeight + 60) {
                    $(this).addClass('ef-slide');
                }
            });
        }).trigger("scroll");
    },
}

$(document).ready(function() {
    fadeTopEffect.setInit();

    // link scroll
    $('a[href^="#"]').click(function() {
        var the_id = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(the_id).offset().top
        }, 1000);
        return false;
    });

    // link popup
    $(".secProd-content_items > ul").click(function() {
        if ($(window).width() < 641) {
            $(".popup").find(".popup-inner").removeClass("bigSize").find(".popup-inner_content").html("<image src='" + $(this).attr("data-img") + "' alt='' class=''>");
            $(".popup").fadeIn(500);
        }
    });
    $(".items-charts > .pc-off").click(function() {
        if ($(window).width() < 641) {
            $(".popup").find(".popup-inner").addClass("bigSize").find(".popup-inner_content").html("<image src='" + $(this).attr("data-img") + "' alt='' class=''>");
            $(".popup").fadeIn(500);
        }
    });

    $(".popup-inner_close").click(function() {
        $(".popup").fadeOut(500);
    });


    $(window).resize(function() {
        if ($(window).width() < 641) {
            $(".popup").hide();
        }
    });
});
