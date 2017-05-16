$(document).ready(function() {
    // Show five news first : PC
    $('.contentSection .itemTopic:gt(4)').hide();
    // Toggle nav mobile

    $('.wrapheaderMb .toggle').click(function(event) {
        $('.navHeader').fadeToggle('fast');
        // Toggle img
        var urlI = $(this).find('img');
        let openNav = "images/toggle.png";
        let closeNav = "images/toggle_close.png";
        // urlI === "images/toggle.png" ? urlI === "1" : "2";
        if (urlI.attr('src') === openNav) {
            $('.toggle img').attr('src', closeNav);
        }
        else {
            $('.toggle img').attr('src', openNav);
        }
    });

    // Show three news first : Mobile
    var widthBr = $(window).width();
    if (widthBr <= 768) {
        $('.contentSection .itemTopic:gt(2)').hide();
    }

    // Hover listProduct
    $('.listNews .item').hover(function() {
        var url = $(this).find('.btnNewsM');
        $(this).find('.btnNewsM').attr('src', $(this).find('.btnNewsM').attr('src').replace('-ovoff', '-ovon'));
    }, function() {
        $(this).find('.btnNewsM').attr('src', $(this).find('.btnNewsM').attr('src').replace('-ovon', '-ovoff'));
    });
});
