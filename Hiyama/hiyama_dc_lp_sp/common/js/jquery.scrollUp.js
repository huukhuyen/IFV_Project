$(function() {
var topBtn = $('#pageTop');
//スクロールしてトップ
topBtn.click(function () {
$('body,html').animate({
scrollTop: 0
}, 500);
return false;
});
});