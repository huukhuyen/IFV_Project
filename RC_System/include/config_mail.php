<?php
/**
 * 設定ファイル
 * 
 * @version $Revision: 1.0.0 $
 * @copyright 
 * @author 
 */
?>
<?php

ini_set("session.bug_compat_42", 0);
ini_set("session.bug_compat_warn", 0);

error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT);

require( dirname(__FILE__) . "/lib/cls_session.php" );
require( dirname(__FILE__) . "/lib/cls_string.php" );
require( dirname(__FILE__) . "/lib/cls_fileupload.php" );
require( dirname(__FILE__) . "/lib/qdmail.php" );
require( dirname(__FILE__) . "/conf/validate_message_mail.php" );

//サイトトップのURL（末尾に/を入れること）
define("SITE_URL","http://test-up.jp/00sample/mailform/");

//ファイルのアップロードディレクトリ
define("UPLOAD_MAIL_DIR","/../../_upload/mail/");

//アップロードするファイルをサーバから消去するまでの日数
define("UPLOAD_MAIL_CLEANING_DATE","1");

function config_database( &$db )
{
	$db->add("", "", "", "", "", "");
}

if ( !function_exists( 'config_models' ) ) {
	function config_models( &$controller )
	{
		$controller->AddModel( dirname(__FILE__) . "/models/tbl_contact.php" );
	}
}

if ( !function_exists( 'is_secure' ) ) {
	function is_secure( &$controller )
	{
    		return false;
	}
}

//メールのテンプレートのパス
define("FMT_MAIL_PATH","./mail_config/mail.txt");

//自動返信メールのテンプレートのパス
define("FMT_MAIL_PATH_USER","./mail_config/mail_user.txt");

//メールの設定ファイルのパス
define("MAIL_CFG","./mail_config/mail_config.php");

//複数フォーム設置時のMODELファイルのパス
define("MODEL_PATH","./mail_config/tbl_contact.php");


?>
