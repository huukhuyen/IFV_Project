<?php
/**
 * お問い合わせフォーム　入力画面
 *
 * @version $Revision: 1.0.0 $
 * @copyright
 * @author
 */
?>
<?php

function config_models( &$controller )
{
	$controller->AddModel( MODEL_PATH );
}

require_once( "../include/config_mail.php" );
require_once( "../include/framework/cheetan.php" );

function action( &$c )
{

	require_once( MAIL_CFG );

	$errmsg	= array();

	if( count( $_POST ) )
	{
		$obj_str = new clsString();

		$obj_str->all_mb_trim($c->data["cms"]);	//TRIM処理
		$obj_str->all_han2zen($c->data["cms"]);	//半角カナを全角に変換

		$c->tbl_contact->convert_string($c->data["cms"]);

		$errmsg	= $c->tbl_contact->validatemsg_dx_front( $c->data["cms"] );
		//print_r($errmsg);

		$_SESSION[SESSION_CONTACT]["data"] = $c->data["cms"];

		$FormData = $_SESSION[SESSION_CONTACT]["data"];

		if(!empty($_FILES)){

			$obj_file = new clsFileUpload();

			$remove_time = time() - 60*60*24*UPLOAD_MAIL_CLEANING_DATE;
			$obj_file->delete_tmp(UPLOAD_MAIL_DIR,$remove_time);

			foreach($_FILES as $key => $val){

				//ファイルのアップロードの場合

					list( $model, $element ) = explode( "-", $key );
					if($_FILES[$key]['name'] == ""){
						$_SESSION[SESSION_CONTACT]["data"][$element] = "";
						$_SESSION[SESSION_CONTACT]["file"][$element] = "";

					}else{

						$rtn = $obj_file->file_upload($key,$newfilename,UPLOAD_MAIL_DIR,$rtn_name);

						if($rtn != ""){
							$errmsg['file_error'] = $rtn;
						}

						$_SESSION[SESSION_CONTACT]["data"][$element] = $rtn_name;

						//var_dump($newfilename);

						$_SESSION[SESSION_CONTACT]["file"][$element] = $newfilename;

						//var_dump($_SESSION[SESSION_CONTACT]["file"]);

					}
			}
		}

		if(DUPLICATE_CHECK == 1){
			if(!$c->v->duplication($c->data["cms"][DUPLICATE_INPUT_1],$c->data["cms"][DUPLICATE_INPUT_1])){
				$errmsg["mail_duplication"] = DUPLICATE_CHECK_MESSAGE;
			}
		}

		//var_dump($errmsg);

		if( empty($errmsg) )
		{
			$c->redirect( "./confirm.php" );

		}

	}elseif(count( $_GET )){

		$obj_str = new clsString();

		$obj_str->all_mb_trim($c->data["cms"]);	//TRIM処理
		$obj_str->all_han2zen($c->data["cms"]);	//半角カナを全角に変換

		$c->tbl_contact->convert_string($c->data["cms"]);
	}

	if (isset($_SESSION[SESSION_CONTACT]["data"])) {
		$c->set( "F", $_SESSION[SESSION_CONTACT]["data"]);
		$_SESSION[SESSION_CONTACT]["data"] = NULL;
	}else{
		$c->set( "F", $c->data["cms"]);
	}

	$c->set( "errmsg", $errmsg );
	$c->SetViewFile( "contact_view.html" );
}


?>
