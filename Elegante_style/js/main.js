$(document).ready(function() {
    $("#slideMain").owlCarousel({
        navigation : true,
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true
    });

    $('.owl-prev').html('<img src="images/arrow_left.png" alt="">');
    $('.owl-next').html('<img src="images/arrow_right.png" alt="">');
});