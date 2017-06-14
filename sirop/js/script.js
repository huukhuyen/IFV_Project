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
    $(".ctTab").hide();
    $(".ctTab:first").show();
    $('.clickSwap img:first').addClass("active");

    if (wBrower <= 780) {
        // Show more list product
        $('#cuteArea .toggleFour li:gt(3)').hide();
        $('#coolArea .toggleFour li:gt(3)').hide();
        $('.btnMore').click(function(e) {
            var btn1 = "../images/responsive/btn1.jpg";
            var btn2 = "../images/responsive/btn2.jpg";
            if($(this).find("img").attr("src") == btn1){
                $('.btnMore img').attr("src", btn2);
            } else {
                $('.btnMore img').attr("src", btn1);
            }
            $('#cuteArea .toggleFour li').slideToggle();
            $('#coolArea .toggleFour li').slideToggle();
            return false;
        });
    }
    // Tab product
    $(".clickSwap img").click(function(event) {
        $('.clickSwap img').removeClass("active");
        $(this).addClass("active");
        $(".ctTab").hide();
        var activeTab = $(this).attr("data");
        $("#" + activeTab).show();

        if (wBrower > 780) {
            if ($('.clickSwap img:first').hasClass("active")) {
                $('#wrapContent .container .mainTop').css("border-bottom", "5px solid #F4ACDB");
            } else {
                $('#wrapContent .container .mainTop').css("border-bottom", "5px solid #000000");
            }
        }
    });
    $(window).load(function() {
        equalheight('.navFooter li');
    });
    $(window).resize(function() {
        equalheight('.navFooter li');
    });
});
