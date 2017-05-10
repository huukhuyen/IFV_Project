// JavaScript Document

$(document).ready(function () {
    var topBtn = $('.page_order');
    topBtn.hide();
});

$(window).scroll(function () {
    if ($(this).scrollTop() >= 1700) {
        $('.page_order').fadeIn();
    } else {
        $('.page_order').fadeOut();
    }
});

$('.page_order').click(function (event) {
    event.preventDefault();
    var position = $('#order').offset().top;
    $('body,html').animate({
        scrollTop: position
    }, 1000);
});