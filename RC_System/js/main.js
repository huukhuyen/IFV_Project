$(document).ready(function() {
    // Show five news first : PC
    $('.contentSection .itemTopic:gt(4)').hide();
    // Toggle nav mobile
    $('.wrapheaderMb .toggle').click(function(event) {
        $('.navHeader').fadeToggle('fast');
    });

    // Show three news first : Mobile
    var widthBr = $(window).width();
    if (widthBr <= 768) {
        $('.contentSection .itemTopic:gt(2)').hide();
    }

});
