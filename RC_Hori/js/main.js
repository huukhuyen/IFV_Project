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

// div要素をfadein
//$('div').hide().fadeIn(300);

// class'showUp'をdiv要素に追加
//$('div').addClass('showUp');


// div要素をスクロールでfadein
$(function() {
    $('.effect div, .effect i').css("opacity", "0");
    $(window).scroll(function() {
        $(".effect").each(function() {
            var imgPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight + windowHeight / 5) {
                $("i, div", this).css("opacity", "1");
                $("i", this).css({
                    "font-size": "100px",
                    "padding": "0 20px 40px"
                });
            } else {
                $("i, div", this).css("opacity", "0");
                $("i", this).css({
                    "font-size": "20px",
                    "padding": "20px"
                });
            }
        });
    });
});


//////////////////////////////////////
/*
ROCOZ Edit
2017.06.10
*/
//////////////////////////////////////

/* メインルーチン
 **************************************************/
$(function() {

    // TOPページかどうかをチェック
    //-----------------------------------------------------------------------
    checkToppage();

    function checkToppage() {
        if ($('body').is('.page--top')) {
            is_toppage = true;
        } else {
            is_toppage = false;
        }
        //console.log(is_toppage);
    }


    var timer = false;
    /*
    リサイズ時のウインドウサイズによって、PCとスマートフォンの処理を分ける
    ***************************************/

    //	function widthResizeSetting(){
    //		//現在のウィンドウサイズを取得
    //		var winWidth = window.innerWidth ? window.innerWidth: $(window).width();
    //		//1回だけ発動用
    //		if (timer !== false) {
    //			clearTimeout(timer);
    //		}
    //		timer = setTimeout( function() {
    //			if(winWidth > 720){
    //			} else if (winWidth <= 720){
    //			}
    //		}, 300);
    //	}
    //
    //	$(window).on('resize',widthResizeSetting);

    $('.btnToggle').click(function(e) {
        var winWidth = window.innerWidth ? window.innerWidth : $(window).width();
        if (winWidth > 780) {
            $(this).toggleClass('active');
            $('.navMain').toggleClass('active');
        } else if (winWidth <= 780) {
            $(this).toggleClass('active');
            $('.navMain').slideToggle();
        }
        return false;
    });

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > 1) {
            $('.headerMenu').addClass('active');
        } else {
            $('.headerMenu').removeClass('active');
        }
    });

});
//$(function(){
//	$('.anim div').hide();
//	});
//	var i = 0;
//	var int=0;
//	$(window).bind("load", function() {
//	var int=setInterval("doFade(i)",500);
//	});
//	function doFade() {
//	var list = $('.anim div').length;
//	if (i >= list) {
//	clearInterval(int);
//	}
//	$('.anim div').eq(i).fadeIn(300);
//	i++;
//}


// Change view settings
