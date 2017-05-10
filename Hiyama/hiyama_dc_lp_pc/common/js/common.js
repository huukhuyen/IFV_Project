//user agent
var _ua = (function(u) {
    return {
        Tablet: (u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1,
        Mobile: (u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) || u.indexOf("blackberry") != -1
    }
})(window.navigator.userAgent.toLowerCase());


function isPhone() {
    return (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('Android') > 0);
}

// タップ電話自動リンク
$(function() {
    if (!isPhone())
        return;

    $('span[data-action=call]').each(function() {
        var $ele = $(this);
        $ele.wrap('<a href="tel:' + $ele.data('tel') + '"></a>');
    });
});

//viewportの書き換え
$(function() {

    var $viewport = $('#metaViewport'),
        $w = $(window);
    if (_ua.Mobile) {
        $w.on("load resize", function() {

            //console.log($w.width());
            if ($w.height() > $w.width()) {
                $viewport.attr("content", "width=device-width,minimum-scale=1.0,maximum-scale=10.0,user-scalable=yes");
                //console.log('たて');
            } else {
                $viewport.attr("content", "width=1100");
                //console.log('横');
            }
        });
    } else if (_ua.Tablet) {
        // console.log('tb');
        $viewport.attr("content", "width=1100");
        $w.on("load resize", function() {
            $viewport.attr("content", "width=1100");
        });
    } else {
        return;
    }

});




/*アーカイブ選択*/
function func_archive_chg() {

    obj = document.archive_chg.issue01;

    index = obj.selectedIndex;
    href = obj.options[index].value;

    document.archive_chg.issue01.options[0].selected = true;

    location.href = href;
}

/*カテゴリ選択*/
function func_category_chg() {

    obj = document.category_chg.issue01;

    index = obj.selectedIndex;
    href = obj.options[index].value;

    obj.options[0].selected = true;

    location.href = href;
}

//高さを揃える *http://www.tinybeans.net/blog/download/jquery-plugin/jquery-auto-height.html
$(function() {
    var $w = $(window),
        autoH = '.auto_h';

    //必ず以下のカラム数を指定して下さい。
    //data-sp="2" スマホのカラム数
    //data-pc="4" PCのカラム数

    if (_ua.Mobile) {
        $w.on("load resize", function() {
            if ($w.height() > $w.width()) {
                var columnNum = $(autoH).attr('data-sp');
                //console.log('たて');
            } else {
                var columnNum = $(autoH).attr('data-pc');
                //console.log('横');
            }
            $('.auto_h').autoHeight({
                column: columnNum
            });
        });
    } else if (_ua.Tablet) {
        // console.log('tb');
        $w.on("load resize", function() {
            var columnNum = $(autoH).attr('data-pc');
            $('.auto_h').autoHeight({
                column: columnNum
            });
        });
    } else {
        $w.on("load resize", function() {
            var columnNum = $(autoH).attr('data-pc');
            $('.auto_h').autoHeight({
                column: columnNum
            });
        });
    }

});



$(function() {
	var followscrolling = new
	ATFollowScrolling({
		element : '#fixNav',
		offset : 200
		});
	followscrolling.load();
});