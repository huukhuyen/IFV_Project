$(document).ready(function() {
    // Clone nav PC to SP
    var cloneNav = $('.nav-main ul').clone(true);
    var navSpClone = $(cloneNav).find('.highlight').remove();
    $('.nav-sp').append(cloneNav);
    
    // Toggle nav mobile
    $('.btnToggle').click(function(event) {
        $(this).toggleClass('active');
        $('.nav-sp').slideToggle();
    });

    // Hover select language
    $('.langNav').hover(function() {
        let nav = $(this).find('li').length;
        $(this).animate({
            'height': 24 * nav + 'px'
        }, 'fast');
    }, function() {
        $(this).animate({
            'height': '24px'
        }, 'fast');
    });
    try {
        // Blur background
        var indexBlur = $('.section-home02').offset().top;
        var indexBlur2 = $('.section-home06').offset().top;
        $(window).scroll(function() {
            let s = $(window).scrollTop();
            let opacityVal = (s / indexBlur);
            $('.blurred-img').css('opacity', opacityVal);

            let s2 = $(window).scrollTop();
            let opacityVal2 = (s2 / indexBlur2);
            $('.blurred-img06').css('opacity', opacityVal2);
        });

        // link scroll
        $('a[href^="#"]').click(function() {
            let the_id = $(this).attr("href");
            $('html, body').animate({
                scrollTop: $(the_id).offset().top
            }, 600);
            return false;
        });
        // Slider center
        $('.center-slider').slick({
            centerMode: true,
            centerPadding: '160px',
            slidesToShow: 1,
            responsive: [{
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });
        // Click modal
        $('.video-popup').colorbox({
            iframe: true,
            innerWidth: 949,
            innerHeight: 493,
            maxWidth: '95%',
            maxHeight: '95%'
        });
    } catch (e) {}



    // $('.btnModal a').click(function(event) {
    //     let url_modal = $(this).data('img');
    //     let modal_html = `
    //         <div class="modal">
    //             <div class="modalIn">
    //                 <img src="` + url_modal + `" alt="">
    //             </div>
    //         </div>`;
    //     $('body').append(modal_html);
    //     return false;
    // });

    // Hide modal
    $(document).click(function(e) {
        if (!$(e.target).is('.modalIn')) {
            $(".modal").fadeOut();
        }
    });

    // Fade scroll
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
});
