<?php
/*-----------------------------------------------------------------------------
cheetan is licensed under the MIT license.
copyright (c) 2006 cheetan all right reserved.
http://php.cheetan.net/
-----------------------------------------------------------------------------*/
class CValidate extends CObject
{
	function notempty( $data, $errmsg = "" )
	{
		return $this->_check( ( $data !== '' ), $errmsg );
	}

	function notempty_sel( $data, $errmsg = "" )
	{
		return $this->_check( ( $data !== '' ), $errmsg );
	}
	
	function required( $data, $errmsg = "" )
	{
		return $this->_check( ( $data !== '' ), $errmsg );
	}

	function number( $data, $errmsg = "" )
	{
		if ($data == "") {
			$ret = 1;
		}else{
			$ret = is_numeric( $data );
			if($ret == 1){
				$ret = preg_match("/^[0-9]+$/",$data);
			}
		}
		return $this->_check( $ret , $errmsg );
	}

	function eisu( $data, $errmsg = "" )
	{
		if ($data == "") {
			$ret = 1;
		}else{
			$ret = preg_match("/^[0-9a-zA-Z]+$/",$data);
		}
		return $this->_check( $ret , $errmsg );
	}


	function email( $data, $errmsg = "" )
	{
		if ($data == "") {
			$ret = 1;
		}else{
			$ret = preg_match('/\\A(?:^([a-z0-9][a-z0-9_\\-\\.\\+]*)@([a-z0-9][a-z0-9\\.\\-]{0,63}\\.(com|org|net|biz|info|name|net|pro|aero|coop|museum|[a-z]{2,4}))$)\\z/i',$data);
		}
		return $this->_check( $ret , $errmsg );
	}	
	

	function url( $data, $errmsg = "" )
	{
		if ($data == "") {
			$ret = 1;
		}else{
			$ret = preg_match( '/^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/', $data );
		}
		return $this->_check( $ret , $errmsg );
	}

	function tel( $data, $errmsg = "" )
	{
		if ($data == "") {
			$ret = 1;
		}else{
			$ret = preg_match( '/^0\d{1,4}-\d{1,4}-\d{3,4}$/', $data );
		}
		return $this->_check( $ret , $errmsg );
	}

	function tel2( $data, $errmsg = "" )
	{
		if ($data == "") {
			$ret = 1;
		}else{
			$ret = preg_match( '/^0\d{1,4}[-(]?\d{1,4}[-)]?\d{3,4}$/', $data );
		}
		return $this->_check( $ret , $errmsg );
	}

	function mb_short( $data, $min, $errmsg = "" )
	{
		if ($data == "") {
			$ret = 1;
		}else{
			$len	= mb_strlen( $data ,"UTF-8");
			$ret	= ( $min <= $len ) ? 1 : 0;
		}

		return $this->_check( $ret, $errmsg );
	}

	function mb_long( $data, $max, $errmsg = "" )
	{
		if ($data == "") {
			$ret = 1;
		}else{
			$len	= mb_strlen( $data ,"UTF-8");
			$ret	= ( $len <= $max ) ? 1 : 0;
		}

		return $this->_check( $ret, $errmsg );
	}
	
	function minSize( $data, $min, $errmsg = "" )
	{
		return $this->mb_short( $data, $min, $errmsg );
	}

	function maxSize( $data, $min, $errmsg = "" )
	{
		return $this->mb_long( $data, $min, $errmsg );
	}	

	function katakana( $data, $errmsg = "" )
	{

		if ($data == "") {
			$ret = 1;
		}else{
			if (preg_match("/^[ァ-ヾ　 ]+$/u",$data) == False) {
				$ret = 0;
			}else{
				$ret = 1;
			}
		}

		return $this->_check( $ret , $errmsg );
	}

	function hiragana( $data, $errmsg = "" )
	{
	
		if ($data == "") {
			$ret = 1;
		}else{
			if (preg_match("/^[ぁ-んヾー　 ]+$/u",$data) == False) {
				$ret = 0;
			}else{
				$ret = 1;
			}
		}
	
		return $this->_check( $ret , $errmsg );
	}

	function duplication($value1,$value2,$errmsg = ""){
	
		if ($value1 != $value2){
			$ret = 0;
		}else{
			$ret = 1;
		}

		return $this->_check( $ret, $errmsg );
	}

	function year( $data, $errmsg = "" )
	{
		if ($data == "") {
			$ret = 1;
		}else{
			if(is_numeric( $data )){
				if($data >= 1000 && $data <= 2100 ){
					$ret = 1;
				}else{
					$ret = 0;
				}
			}else{
				$ret = 1;
			}
		}
		return $this->_check( $ret , $errmsg );
	}

	function month( $data, $errmsg = "" )
	{
		if ($data == "") {
			$ret = 1;
		}else{
			if(is_numeric( $data )){
				if($data >= 1 && $data <= 12 ){
					$ret = 1;
				}else{
					$ret = 0;
				}
			}else{
				$ret = 1;
			}
		}
		return $this->_check( $ret , $errmsg );
	}

	function day( $data, $errmsg = "" )
	{
		if ($data == "") {
			$ret = 1;
		}else{
			if(is_numeric( $data )){
				if($data >= 1 && $data <= 31 ){
					$ret = 1;
				}else{
					$ret = 0;
				}
			}else{
				$ret = 1;
			}
		}
		return $this->_check( $ret , $errmsg );
	}

	function hour( $data, $errmsg = "" )
	{
		if ($data == "") {
			$ret = 1;
		}else{
			if(is_numeric( $data )){
				if($data >= 0 && $data < 24 ){
					$ret = 1;
				}else{
					$ret = 0;
				}
			}else{
				$ret = 1;
			}
		}
		return $this->_check( $ret , $errmsg );
	}
	
	function minute( $data, $errmsg = "" )
	{
		if ($data == "") {
			$ret = 1;
		}else{
			if(is_numeric( $data )){
				if($data >= 0 && $data < 60 ){
					$ret = 1;
				}else{
					$ret = 0;
				}
			}else{
				$ret = 1;
			}
		}
		return $this->_check( $ret , $errmsg );
	}


	function _check( $b, $errmsg )
	{
		if( $b )
		{
			if( $errmsg )	return "";
			else			return TRUE;
		}
		else
		{
			if( $errmsg )	return $errmsg;
			else			return FALSE;
		}
	}
}
?>
