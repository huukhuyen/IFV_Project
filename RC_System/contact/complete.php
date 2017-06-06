<?php
/**
 * お問い合わせフォーム　完了画面
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

	if (isset($_SESSION[SESSION_CONTACT]["data"])) {

		$FormData = $_SESSION[SESSION_CONTACT]["data"];

		foreach($FormData as $key => $val){
			if(is_array($val)){
				if(empty($val)){
					$FormData[$key] = "";		
				}else{
					$FormData[$key] = implode("/",$val);
				}
			}
		}
		
		//フォームの送信先等の取得:::::::::::::::::::::::::::::::::::::::::::::::::
		if(empty($FormData[INPUT_MAIL])){
			$From     = MAIL_TO;				//メールアドレスが未記入の場合
		}else{
			$From     = $FormData[INPUT_MAIL];		//送信元メールアドレス
		}

		$Subject  = MAIL_SUBJECT;		//送信メール件名
		
		//フォームの送信先メールアドレス
		if (MAIL_FLG == 1) {
			$To       = MAIL_TO;		//本番
			if(MAIL_CC != ""){
				$Cc = MAIL_CC;
			}
			if(MAIL_BCC != ""){
				$Bcc = MAIL_BCC;
			}
		}else{
			$To       = MAIL_TO_TEST;	//テスト
			if(MAIL_CC_TEST != ""){
				$Cc = MAIL_CC_TEST;
			}
			if(MAIL_BCC_TEST != ""){
				$Bcc = MAIL_BCC_TEST;
			}
		}
		//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		// フォームのメールのテンプレートの読み込み
		$body = implode("",file(FMT_MAIL_PATH));

		// テンプレートを送信された文字で置換する
		if(!empty($FormData)){
			foreach ($FormData as $k => $v) {
				
				if(empty($v)){
					$v = BLANK_TEXT;
				}

				$body = str_replace('<%'.$k.'%>', $v, $body);
			}
		}else{
			echo "error!";
			return;
		}
		

			//メールオブジェクトをセット
			$mail = new Qdmail();
			$mail->lineFeed("\n");

			$mail->to($To);

			if(!empty($Cc)){
				$mail->cc($Cc);
			}
			if(!empty($Bcc)){
				$mail->bcc($Bcc);
			}

			$mail->subject($Subject);

			$mail->from($From);
			$mail->text($body);
			
	//var_dump( $_SESSION[SESSION_CONTACT]["file"]);
				
			//添付ファイルがある場合は添付
			if(!empty($_SESSION[SESSION_CONTACT]["file"] )){
				foreach($_SESSION[SESSION_CONTACT]["file"] as $k => $v){
					if($v != ""){
						$obj_file = new clsFileUpload();
						$mail->attach( array($obj_file->get_file_path($v,UPLOAD_MAIL_DIR) , $_SESSION[SESSION_CONTACT]["data"][$k] ) );
					}
				}
			}


		if (!$mail->Send()){
			$FormData['ERROR_1'] = 1;
			echo "error1";
			exit;
		}

		//自動返信メールの送信処理***********************

		if (RETURN_FLG == 1) {
			if(!empty($FormData[INPUT_MAIL])){
				//自動返信メールの送信先等の取得:::::::::::::::::::::::::::::::::::::::::::::::::
				//送信元メールアドレス
				if (MAIL_FLG == 1) {
					if(MAIL_RETURN_FROM == ""){
						$From_user     = MAIL_TO;
					}else{
						$From_user     = MAIL_RETURN_FROM;
					}
		//本番
				}else{
					if(MAIL_RETURN_FROM_TEST == ""){
						$From_user     = MAIL_TO_TEST;
					}else{
						$From_user     = MAIL_RETURN_FROM_TEST;
					}		//テスト
				}
	
				$FromName_user = MAIL_TO_NAME;			//送信元メール名前部分
				$Subject_user  = RETURN_SUBJECT;		//送信メール件名
	
				$To_user       = $FormData[INPUT_MAIL];	//送信先メールアドレス
				//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	
				// メールのテンプレートの読み込み
				$body_user = implode("",file(FMT_MAIL_PATH_USER));
	
				// テンプレートを送信された文字で置換する
				foreach ($FormData as $k => $v) {
					
					if(empty($v)){
						$v = BLANK_TEXT;
					}					
	
					$body_user = str_replace('<%'.$k.'%>', $v, $body_user);
				}		


				$mail->to($To_user);
				$mail->subject($Subject_user);

				if(empty($FromName_user)){
					$mail->from($From_user);
				}else{
					$mail->from($From_user,$FromName_user);
				}

				$mail->text($body_user);
				
				//自動返信メールは添付ファイルを送らない
				if(!empty($_SESSION[SESSION_CONTACT]["file"] )){
					foreach($_SESSION[SESSION_CONTACT]["file"] as $k => $v){
						if($v != ""){
							$mail->attach( array() );
						}
					}
				}
				
				

				if (!$mail->Send()){
					$FormData['ERROR_2'] = 1;
					echo "error2";
					exit;
				}
			}
		}

        clsSession::session_abandon();

	}else{
		$c->redirect( INPUT_PAGE_NAME );
	}

	$c->set( "F", $FormData);

	$c->SetViewFile( "complete_view.html" );
}
?>