var equalheight = function(container) {
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function() {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}
$(document).ready(function() {
    var wBrower = $(window).width();
    var hBrower = $(window).height();

    $('.btnToggle').click(function(e) {
        $('.navMain').slideToggle();
        return false;
    });

    $(window).load(function() {
        equalheight('.navSidebar li');
    });
    $(window).resize(function() {
        equalheight('.navSidebar li');
    });

    if (wBrower <= 720) {
        // $('.areaListInfo .items .second_div').insertBefore('.first_div');
    } else {
        $('.contentRight').css("height", hBrower);
        $(window).load(function() {
            equalheight('.areaAbout .items');
            equalheight('.areaAbout .descript');
            equalheight('.navSidebar li');
        });
        $(window).resize(function() {
            equalheight('.areaAbout .items');
            equalheight('.areaAbout .descript');
            equalheight('.navSidebar li');
        });
    }

});
