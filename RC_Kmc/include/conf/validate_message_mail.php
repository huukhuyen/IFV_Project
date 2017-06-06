<?php
/**
 * バリデーションメッセージ定義ファイル
 * 
 * @version $Revision: 1.0.0 $
 * @copyright 
 * @author 
 */
?>
<?php

//表側エラーメッセージ
$CONF_VALIDATE_MESSAGE_FRONT = array(

	"required" => "※<%item%>は入力必須項目です。<br />",
	"notempty" => "※<%item%>を記入してください。<br />",
	"notempty_sel" => "※<%item%>を選択してください。<br />",
	"number"   => "※<%item%>は数字を記入してください。<br />",
	"email"    => "※<%item%>に正しいメールアドレスを記入してください。<br />",
	"eisu"     => "※<%item%>は英数字で記入してください。<br />",
	"mb_short" => "※<%item%>は<%len%>文字以上で記入してください。<br />",
	"mb_long"  => "※<%item%>は<%len%>文字以内で記入してください。<br />",
	"minSize" => "※<%item%>は<%len%>文字以上で記入してください。<br />",
	"maxSize"  => "※<%item%>は<%len%>文字以内で記入してください。<br />",
	"url"      => "※<%item%>に正しいURLを記入してください。<br />",
	"tel"      => "※<%item%>に正しい番号を記入してください。<br />",
	"katakana" => "※<%item%>はカタカナで記入してください。<br />",
	"hiragana" => "※<%item%>はひらがなで記入してください。<br />",

);


?>