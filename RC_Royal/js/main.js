$(document).ready(function() {
    // Slider main
    $(".sliderMain").owlCarousel({
        navigation: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        autoPlay: 4000,
        singleItem: true
    });
    $('.owl-prev').html('<img src="images/arrow_l.png">');
    $('.owl-next').html('<img src="images/arrow_r.png">');
});
