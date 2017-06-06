<?php
/**
 * お問い合わせフォーム　確認画面
 *
 * @version $Revision: 1.0.0 $
 * @copyright
 * @author
 */
?>
<?php

require_once( "../include/config_mail.php" );
require_once( "../include/framework/cheetan.php" );

function action( &$c )
{

	require_once( MAIL_CFG );

	if( count( $_POST ) )
	{
		if (isset($_SESSION[SESSION_CONTACT]["data"])) {
			$c->redirect( "./complete.php" );

		}else{
			$c->redirect( INPUT_PAGE_NAME );
		}

	}


	//var_dump( $_SESSION[SESSION_CONTACT]);

	if (isset($_SESSION[SESSION_CONTACT]["data"])) {

		$FormData = $_SESSION[SESSION_CONTACT]["data"];

		foreach($FormData as $key => $val){

				if(is_array($val)){
					if(empty($val)){
						$FormData[$key] = "";
					}else{
						$FormData[$key] = implode("\n",$val);
					}
				}

		}

		$c->set( "F", $FormData);


	}else{
		$c->redirect( INPUT_PAGE_NAME );
	}



	$c->SetViewFile( "confirm_view.html" );
}
?>
