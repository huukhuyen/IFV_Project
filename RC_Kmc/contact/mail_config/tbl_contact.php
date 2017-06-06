<?php
class CTbl_contact extends CModel
{
	var $validatefunc	= array(

							"name" => array("required"),
							"kana" => array("required","katakana"),
							"gender" => array("required"),
							"method" => array("required"),
							"zip1" => array("required"),
							"address1" => array("required"),
							"tel" => array(),
							"mobile" => array(),
							"mail" => array("required","email"),
							"naiyou" => array("required"),

	
		   					);

	var $validateitem	= array(
			
							"name" => "お名前",
							"kana" => "フリガナ",
							"gender" => "性別",
							"method" => "ご希望の連絡方法",
							"zip1" => "郵便番号",
							"address1" => "住所",
							"tel" => "自宅電話",
							"mobile" => "携帯電話",
							"mail" => "E-Mail",
							"naiyou" => "お問合せ内容",
			
							);
							
	var $convert_list	= array(

							"kana" => "C",
	
							"zip" => "a",
							"tel" => "a",
							"mobile" => "a",
							"mail" => "a",

						);

}
?>