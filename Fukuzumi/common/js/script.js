//* TOP Animation
//*****************************
//ユーザーエージェント判定
var _ua = (function(u){
	return {
	Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1,
	Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) || u.indexOf("blackberry") != -1
	}
})(window.navigator.userAgent.toLowerCase());


/* URL判定用
************************************************/
var local = window.location;
var url = local.origin;
var current_dir = getDir(local); // 現在のディレクトリ
function getDir(place, n) {
　　return place.pathname.replace(new RegExp("(?:\\\/+[^\\\/]*){0," + ((n || 0) + 1) + "}$"), "/");
}
//console.log(current_dir);

/* 定数定義
************************************************/

// 背景に関係する定数 *******************************

//URL取得
var hostName = location.hostname;

//=======================================================================
// util
//=======================================================================

// GLOBAL Flugs
var is_toppage; //トップページでtrue
var cookie_true;

// オープニングアニメーション関係 **********************


// ページ遷移関係 ************************************

// レスポンシブ関係 ************************************
// ブレイクポイント
var BP_SP = 767;


/* メインルーチン
**************************************************/
$(function(){
	
	/* 変数初期化(メインルーチン内全域で使用する変数)
	------------------------------------------------*/
	//スマートフォンオブジェクト
	var $footFixNav = $('#footFixNav');
	var $btnPagetopSp = $('#btnPagetopSp');
	var $pagetop = $('#pagetop');
	
	//イメージ切り替え用
	var bgPcChangeTimer;
	var bgSpChangeTimer;
	
	
	/* 初期設定
	***************************************/

	//スマホ表示かどうか
	var spDisplayFlag = 0;

	//リサイズ時、PCやスマホに変化したか
	var resizePc = 0;
	var resizeSp = 0;


	// コンテナが非表示の場合 true
	var hiddenContainer = false;

   // TOPページかどうかをチェック
   //-----------------------------------------------------------------------
   checkToppage ();
   function checkToppage (){
      if($('body').is('.page--top')){
         is_toppage = true;
      } else {
         is_toppage = false;
      }
      //console.log(is_toppage);
   }

	/* 初期化ルーチン
	------------------------------------------------*/	

	$(window).scroll(commonScroll);

	//　フッターメニュー設定
	$footFixNav.hide();
	var footMenuH;


	/* ロード時のウインドウサイズによって、PCとスマートフォンの処理を分ける 
	***************************************/
	function winLoadSetting(){
		//現在のウィンドウサイズを取得
		var winWidth = window.innerWidth ? window.innerWidth: $(window).width();
		
		if(winWidth >= 768){
			//PC時
			
			/* 初期設定
			***************************************/

			/* 初期化ルーチン
			------------------------------------------------*/
			// 背景初期化
			//トップページでローディング
//			if(is_toppage){
//				initBackground();
//			}
			//console.log(loadingFlag);
			
			
			/* 初期化関係のメソッド
			------------------------------------------------*/
			// 現在のスクロール量で、ページトップの位置を設定
			if (windowTopPos > 100) {
				$pagetop.css({bottom : 0});
			} else {
				$pagetop.css({bottom : -pageTopH});
			}
			
			//モーダルウィンドウ設定
//			if( $('a.youtube').length > 0){
//				$('a.youtube').colorbox({
//					iframe:true,
//					innerWidth:853,
//					innerHeight:480,
//					opacity: 0.9
//				});
//			}
			
		} else if (winWidth < 768){
			//スマートフォン時
			
			/* 初期設定
			***************************************/
			
			/* 初期化ルーチン
			------------------------------------------------*/
			
			/* 初期化関係のメソッド
			------------------------------------------------*/
			
			// フッターメニューロード時
			$footFixNav.show();
			footMenuH = $footFixNav.innerHeight();
			if (windowTopPos > 100) {
				$footFixNav.css({bottom : 0});
			} else {
				$footFixNav.css({bottom : -(footMenuH + 1)});
			}
			//フッターメニュー分を下余白設定
			//$indexfooterArea.css('paddingBottom',footMenuH + 10);
		}
		
	}
	
	$(window).on('load',winLoadSetting);
	
	var timer = false;
	/*
	リサイズ時のウインドウサイズによって、PCとスマートフォンの処理を分ける 
	***************************************/
	
	function widthResizeSetting(){
		//現在のウィンドウサイズを取得
		var winWidth = window.innerWidth ? window.innerWidth: $(window).width();
		//1回だけ発動用
		if (timer !== false) {
			clearTimeout(timer);
		}
		timer = setTimeout( function() {
			if(winWidth >= 768){
				//PC時
				
				/* 初期設定
				***************************************/
				//スマホ表示の無効化
				spDisplayFlag = 0;
				
				/* 初期化ルーチン
				------------------------------------------------*/

				/* 初期化関係のメソッド
				------------------------------------------------*/
				//スマホ用フッターナビを非表示
				$footFixNav.hide();

				// 現在のスクロール量で、ページトップの位置を設定
				if (windowTopPos > 200) {
					$pagetop.css({bottom : 0});
				} else {
					$pagetop.css({bottom : -pageTopH});
				}
				//フッターメニュー分を下余白解除
				//$indexfooterArea.css('paddingBottom',20);
				
			} else if (winWidth < 768){
				//スマートフォン時
				
				/* 初期設定
				***************************************/
							
				/* 初期化ルーチン
				------------------------------------------------*/	
				
				/* 初期化関係のメソッド
				------------------------------------------------*/

				// 現在のスクロール量で、フッターナビの位置を設定
				$footFixNav.show();
				footMenuH = $footFixNav.innerHeight();
				if (windowTopPos > 200) {
					$footFixNav.css({bottom : 0});
				} else {
					$footFixNav.css({bottom : -(footMenuH + 1)});
				}
					
				//フッターメニュー分を下余白設定
				//$indexfooterArea.css('paddingBottom',footMenuH + 10);
				
			}
		}, 300);
	}
	
	$(window).on('resize',widthResizeSetting);


	/* 初期化関係のメソッド
	------------------------------------------------*/

	/* データ取得・設定用のメソッド
	------------------------------------------------*/
	
	// スクロール量を取得
	function getScrollTop(){
		return $(window).scrollTop();
	}

	// スクロール量を設定
	function setScrollTop(offset){
		return $(window).scrollTop(offset);
	}
	
	// 画面サイズを取得
	function getWinW(){
		return window.innerWidth ? window.innerWidth: $(window).width();
	}


	/*
	Scroll Action
	***************************************/
	var windowTopPos;
	var windowWidth;
	var windowHeight;
	var winBtmPos;

	/*	値取得メゾット
	----------------------------------------------*/
	// 現在のWindow位置取得用
	$(window).on("load resize scroll",function(){
		windowTopPos = $(window).scrollTop();
		windowWidth = $(window).width();
		windowHeight = $(window).height();
		winBtmPos = Math.floor(windowTopPos + windowHeight);
	});
		

	/* ページトップ設定
	-----------------------------------*/
	// ページトップボタンの高さを取得
	var footNavFlug = 0;
	
	//共通スクロールイベント
	function commonScroll() {
		var scrollTop = getScrollTop();
		//スクロールが200に達したらボタン表示
		if (scrollTop > 200) {
			if(footNavFlug == 0){
				$footFixNav.animate({
					bottom : 0
				},400);
				footNavFlug = 1;
			}
        } else {
			if(footNavFlug == 1){
				$footFixNav.stop(true).animate({
					bottom : -(footMenuH + 1)
				},400);
				footNavFlug = 0;
			}
        }
	}
	
	//スクロールしてトップ
    $btnPagetopSp.click(pagetopScroll);

	//ページトップスクロール用
	function pagetopScroll() {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		return false;
	}
	
	/* 電話番号リンク設定
	-----------------------------------*/
	//スマートフォンなら電話番号にリンク
	var ua = navigator.userAgent.toLowerCase();
	var isMobile = /iphone/.test(ua)||/android(.+)?mobile/.test(ua);
	
	if (!isMobile) {
		$('a[href^="tel:"]').on('click', function(e) {
			e.preventDefault();
		});
	}
	
	
});