<?php
/**
 * ページャークラス
 * 
 * @version $Revision: 1.0.0 $
 * @copyright 
 * @author Jiro Kawanishi
 */
?>
<?php

class clsPaging{
		
	function get_other_param($ary_idname,$opt=0){
	    foreach($_GET as $key => $value){
	        if (!in_array($key,$ary_idname)){
	        	if ($opt==1) {
	        		$other_param .= "".$key."=".urlencode($value);
	        		$opt = 0;
	        	}else{
	            	$other_param .= "&".$key."=".urlencode($value);
	        	}
	        }
	    }
	    return $other_param;
	}
	
	
	// pager()関数ここから
	function pager($idname,$countRe){
	
	    // 現在のページ情報を取得
	    $id =$_GET[$idname];
	 
	    $other_param = $this->get_other_param(array($idname));
	
	    // ページ数の指定がなければページ数を1にセット
	    if($id=="") $id=1;
	
	    // 最終ページを計算する
	    // 総Hit数をページング単位で割ると総ページ数が計算される
	    // ページング単位PER_PAGEを10とすると最終ページ数$maxPageは
	    // 総Hit数 / PER_PAGEを切り上げたものとなる。
	    // 検索結果205件 PER_PAGE:10の場合 $maxPage = ceil(205 / 10) = 21
	    $maxPage=ceil($countRe / PER_PAGE);
	
	    // maxPage=1の場合(PER_PAGEより少ない検索結果)
	    // 選択したページ(id)よりもmaxPageが小さいときはfalse
	    if( ($maxPage == 1) or ($maxPage < $id) ) return false;
	
	    // 選択したページが1より大きい場合
	    if($id > 1){
	        $startPage = $id - VIEW_PAGE_MENU_WIDTH;
	
	        if($startPage < 1){
	            $startPage = 1;
	        }
	
	        $startMore = "<li><a href=\"$PHP_SELF?".$idname."=".($id - 1).$other_param."\">".PREV_MARK." </a></li>";
	
	    }else{
	
	        $startPage = 1;
	    }
	
	    //選択したページが最終ページより前の場合
	    if($id < $maxPage){
	        $endPage = $id + VIEW_PAGE_MENU_WIDTH;
	
	        if($endPage > $maxPage){
	            $endPage = $maxPage;
	        }
	
	        $endMore = "<li><a href=\"$PHP_SELF?".$idname."=".($id + 1).$other_param."\"> ".NEXT_MARK."</a></li>";
	    }else{
	        $endPage = $maxPage;
	    }

	    $page_footer="";
	    // $startPage から $endPageまで繰り返し
	    for($i = $startPage ; $i <= $endPage ; $i++){
	        $page_footer.= " ".(($id==$i)?"<li class=\"active\"><a href=\"$PHP_SELF?$idname=$i$other_param\">$i</a></li>":"<li><a href=\"$PHP_SELF?$idname=$i$other_param\">$i</a></li>");
	    }
	
	    // $startMoreと$endMoreを$page_footerの前後に付け足す
	    $page_footer = $startMore.$page_footer.$endMore;
	
	    // $page_footerを返す
	    return "<div class=\"pagination\"><ul>" . $page_footer . "</ul></div>";
	
	}

	
	// pager()関数ここから
	function pager_front($idname,$countRe){
	
		// 現在のページ情報を取得
		$id =$_GET[$idname];
	
		$other_param = $this->get_other_param(array($idname));
	
		// ページ数の指定がなければページ数を1にセット
		if($id=="") $id=1;
	
		// 最終ページを計算する
		// 総Hit数をページング単位で割ると総ページ数が計算される
		// ページング単位PER_PAGEを10とすると最終ページ数$maxPageは
		// 総Hit数 / PER_PAGEを切り上げたものとなる。
		// 検索結果205件 PER_PAGE:10の場合 $maxPage = ceil(205 / 10) = 21
		$maxPage=ceil($countRe / PER_PAGE_FRONT);
	
		// maxPage=1の場合(PER_PAGEより少ない検索結果)
		// 選択したページ(id)よりもmaxPageが小さいときはfalse
		if( ($maxPage == 1) or ($maxPage < $id) ) return false;
	
		// 選択したページが1より大きい場合
		if($id > 1){
			$startPage = $id - VIEW_PAGE_MENU_WIDTH_FRONT;
	
			if($startPage < 1){
				$startPage = 1;
			}
	
			$startMore = "<li><a href=\"$PHP_SELF?".$idname."=".($id - 1).$other_param."\">".PREV_MARK_FRONT." </a></li>";
	
		}else{
	
			$startPage = 1;
		}
	
		//選択したページが最終ページより前の場合
		if($id < $maxPage){
			$endPage = $id + VIEW_PAGE_MENU_WIDTH_FRONT;
	
			if($endPage > $maxPage){
				$endPage = $maxPage;
			}
	
			$endMore = "<li><a href=\"$PHP_SELF?".$idname."=".($id + 1).$other_param."\"> ".NEXT_MARK_FRONT."</a></li>";
		}else{
			$endPage = $maxPage;
		}
	
		$page_footer="";
		// $startPage から $endPageまで繰り返し
		for($i = $startPage ; $i <= $endPage ; $i++){
			$page_footer.= " ".(($id==$i)?"<li class=\"active\"><a href=\"$PHP_SELF?$idname=$i$other_param\">$i</a></li>":"<li><a href=\"$PHP_SELF?$idname=$i$other_param\">$i</a></li>");
		}
	
		// $startMoreと$endMoreを$page_footerの前後に付け足す
		$page_footer = $startMore.$page_footer.$endMore;
	
		// $page_footerを返す
		return "<div class=\"pagination\"><ul>" . $page_footer . "</ul></div>";
	
	}	
	
	
}

?>