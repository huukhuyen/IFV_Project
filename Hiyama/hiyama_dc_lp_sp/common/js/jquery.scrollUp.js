$(function() {
var topBtn = $('#pageTop');
//�X�N���[�����ăg�b�v
topBtn.click(function () {
$('body,html').animate({
scrollTop: 0
}, 500);
return false;
});
});