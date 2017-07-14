<?php
class CTbl_account extends CModel
{
	var $validatefunc	= array(
							"login_id" => array("notempty","eisu"),
							"password" => array("notempty","eisu"),
							);

	var $validateitem	= array(
	
							"login_id" => "ログインID",
							"password" => "パスワード",
							);
							
	var $convert_list	= array(
							"login_id" => "a",
							"password" => "a",
						);

}
?>