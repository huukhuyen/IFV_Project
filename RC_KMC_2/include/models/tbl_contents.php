<?php
class CTbl_contents extends CModel
{
	var $validatefunc	= array(

							"year" => array("notempty","number"),
							"month" => array("notempty","number"),
							"day" => array("notempty","number"),
			
							"title" => array("notempty"),
							"body" => array("notempty"),
						);

	var $validateitem	= array(	

							"year" =>"年",
							"month" =>"月",
							"day" =>"日",
			
							"title" =>"タイトル",
							"body" =>"本文",
			
						);

	var $convert_list	= array(

							"year" => "n",
							"month" =>"n",
							"day" =>"n",
						);
						

						
	function get_record($rec,$offset,$limit){
		
		$ary = array();

		foreach ( $rec as $key => $val) {

			$sk_year[$key] = (int)$val["year"];
			$sk_month[$key] = (int)$val["month"];
			$sk_day[$key] = (int)$val["day"];
			$sk_id[$key] = (int)$val["id"];
		
			$ary[$key] = $val;
		}
		
		if(!empty($ary)){
			 array_multisort($sk_year, SORT_DESC, SORT_NUMERIC, $sk_month, SORT_DESC, SORT_NUMERIC, $sk_day, SORT_DESC, SORT_NUMERIC, $sk_id, SORT_DESC, SORT_NUMERIC, $ary);
		}
		
		$rtn = array_slice($ary,$offset,$limit);

		return $rtn;
	}
	

}
?>