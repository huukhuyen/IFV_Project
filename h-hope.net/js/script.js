$(document).ready(function() {
    // Slider
    $('#main-slide').owlCarousel({
        autoPlay: 3000,
        navigation: false,
        slideSpeed: 200,
        paginationSpeed: 400,
        singleItem: true
    });
    // nav-left
    var topScroll_what = $('#section-what').offset().top;
    var topScroll_message = $('#section-message').offset().top;
    var topScroll_report = $('#section-report').offset().top;
    var topScroll_books = $('#section-books').offset().top;
    var topScroll_member = $('#section-member').offset().top;
    var topScroll_contact = $('#section-contact').offset().top;
    $(window).scroll(function() {
        if ($(this).scrollTop() > 134) {
            $('.nav-left').removeClass('abs').addClass('fixed');
        } else {
            $('.nav-left').removeClass('fixed').addClass('abs');
        }
        // scroll spy
        var scroll_local = $(this).scrollTop();
        if (scroll_local >= topScroll_what && scroll_local < topScroll_message) {
            $('.nav-left a[href^="#"]').removeClass('active');
            $('.nav-left a[href^="#section-what"]').addClass('active');
        } else if (scroll_local >= topScroll_message && scroll_local < topScroll_report) {
            $('.nav-left a[href^="#"]').removeClass('active');
            $('.nav-left a[href^="#section-message"]').addClass('active');
        } else if (scroll_local >= topScroll_report && scroll_local < topScroll_books) {
            $('.nav-left a[href^="#"]').removeClass('active');
            $('.nav-left a[href^="#section-report"]').addClass('active');
        } else if (scroll_local >= topScroll_books && scroll_local < topScroll_member) {
            $('.nav-left a[href^="#"]').removeClass('active');
            $('.nav-left a[href^="#section-books"]').addClass('active');
        } else if (scroll_local >= topScroll_member && scroll_local < 6400) {
            $('.nav-left a[href^="#"]').removeClass('active');
            $('.nav-left a[href^="#section-member"]').addClass('active');
        } else if (scroll_local >= 6400) {
            $('.nav-left a[href^="#"]').removeClass('active');
            $('.nav-left a[href^="#section-contact"]').addClass('active');
        } else {
            $('.nav-left a').removeClass('active');
        }

    });

    // Scrool bookmark
    $('a[href^="#"]').click(function() {
        var the_id = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(the_id).offset().top
        }, 1000);
        return false;
    });
});
