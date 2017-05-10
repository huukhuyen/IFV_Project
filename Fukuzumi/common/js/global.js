//=======================================================================
// util
//=======================================================================

// GLOBAL Flugs
var is_toppage; //トップページでtrue

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
if (is_toppage) {
  /**Menu fixed**/
  var $menu = $('.header');
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $menu.addClass('fixed');
    } else if ($(this).scrollTop() <= 50) {
      $menu.removeClass('fixed');
    }
  });

}

var cookie_true;
$('.header-slider').bxSlider({
  mode: 'fade',
  auto: true,
  pager: false,
  speed: 1200,
  pause: 7000,
  controls: false,
  autoControls: true
});

$('.header-slider_sp').bxSlider({
  mode: 'fade',
  auto: true,
  pager: false,
  speed: 1200,
  pause: 7000,
  controls: false,
  autoControls: true
});

/**Language**/
$('.btn-dropmenu').on('click', function() {
  $(this).next().slideToggle();
});

/**Menu SP**/
$(".menu-mobi").click(function() {
  $(".header-menu").toggleClass("active");
  $("body").toggleClass("active-menu");
});

$(".header-menu a, .close-mobi").click(function() {
  $("body").removeClass("active-menu");
  $(".header-menu").removeClass("active");
});

/**fade-layer**/
$('body').addClass('fade-layer-off');
$('<div class="fade-layer"/>').prependTo('body').fadeOut(1200, function() {
  $(this).remove();
});
$(window).on("beforeunload", function(e) {
  $('body').fadeOut();
});



/**scroll width**/
// var $map = $('.map');
// var x = $(".map-img").offset().top - $(window).height();
// var $height_map =  $('.map-img').height();
// var h = x + $height_map;
// var wh = $('.w1000').width();
// var wh_img = wh - 210;
// $(window).scroll(function(){
//   if ($(this).scrollTop() > h){
//     $(".map-center").css("width", wh_img);
//   }
// });

var offset = $('.map').offset().top;
$(window).scroll(function(event) {
  if ($(this).scrollTop() >= offset) {
    $('.map-center').css("width", "790px");
  }
});
