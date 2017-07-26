$(document).ready(function() {
    // Slider main
    $(".sliderMain").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        autoPlay: 4000,
        singleItem: true

        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false
    });
    $('.owl-prev').html('<img src="images/arrow_l.png">');
    $('.owl-next').html('<img src="images/arrow_r.png">');
});
