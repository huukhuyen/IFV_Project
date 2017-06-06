<?php
/**
 * ファイルアップロードクラス
 * 
 * @version $Revision: 1.0.0 $
 * @copyright 
 * @author Jiro Kawanishi
 */
?>
<?php

class clsFileUpload{

	function get_file_path($newfilename,$upload_dir=UPLOAD_DIR){
		
		$newfile_path = realpath(dirname(__FILE__) . $upload_dir) . "/" . $newfilename;
		
		return $newfile_path;
		
	}

	function file_upload($form_name,&$newfilename,$upload_dir=UPLOAD_DIR,&$rtn_name=""){

		if ($_FILES[$form_name]['error'] != _UPLOAD_ERR_NO_FILE && $_FILES[$form_name]['error'] != _UPLOAD_ERR_OK) {
			switch ($_FILES[$form_name]['error']) {
				case _UPLOAD_ERR_FORM_SIZE:
					return('アップロードできるファイルの最大サイズを超えています。');
				default:
					return "";
			}

		} else {

			if ($_FILES[$form_name]['error'] == _UPLOAD_ERR_OK) { // ファイルが正常にアップロードされ

					//pathを取り除いたファイル名を取得
					$rtn_name = end(mb_split("/",$_FILES[$form_name]['name']));


					if(empty($newfilename)){
						$newfilename = sha1(time() . '-' . rand(0,100));
					}

//print $upload_dir;
					
					$newfile_path = realpath(dirname(__FILE__) . $upload_dir) . "/" . $newfilename;

//print $newfile_path;

					if (!move_uploaded_file($_FILES[$form_name]['tmp_name'], $newfile_path)) {
						return('ファイルの移動に失敗しました。書き込み先の権限を確認してください。');
					}
					chmod($newfile_path, 0666);

					return "";

			}else{
					return "ファイル形式が正しくありません。";

			}
		}
	}



	function file_upload_image($form_name,&$newfilename){

		if ($_FILES[$form_name]['error'] != _UPLOAD_ERR_NO_FILE && $_FILES[$form_name]['error'] != _UPLOAD_ERR_OK) {
			switch ($_FILES[$form_name]['error']) {
				case _UPLOAD_ERR_FORM_SIZE:
					return('アップロードできる画像の最大サイズを超えています。');
				default:
					return "";
			}
	
		} else {
	
			if ($_FILES[$form_name]['error'] == _UPLOAD_ERR_OK) { // 画像が正常にアップロードされ
				if (preg_match('~^image/p?jpeg$~', $_FILES[$form_name]['type'])) { // 画像がJPEGであれば
					
					if(empty($newfilename)){
						$newfilename = sha1(time() . '-' . rand(0,100)) . ".jpg";
					}
					
					$newfile_path = realpath(dirname(__FILE__) . "/" . UPLOAD_DIR) ."/". $newfilename;
	
					if (!move_uploaded_file($_FILES[$form_name]['tmp_name'], $newfile_path)) {
						return('画像の移動に失敗しました。書き込み先の権限を確認してください。');
					}
					chmod($newfile_path, 0666);
	
					list($origw, $origh) = getimagesize($newfile_path);
	
					$newsrc = imagecreatefromjpeg($newfile_path);
					
					if ($origw > IMAGE_MAX_SIZE || $origh > IMAGE_MAX_SIZE) {
						// リサイズ
						if ($origw > $origh) { // 横長の場合
							$neww = IMAGE_MAX_SIZE;
							$newh = ($neww / $origw) * $origh;
					
						} else { // 縦長の場合
							$newh = IMAGE_MAX_SIZE;
							$neww = ($newh / $origh) * $origw;
						}
					
						$newdst = imagecreatetruecolor($neww, $newh);
						imagecopyresampled($newdst, $newsrc, 0, 0, 0, 0, $neww, $newh, $origw, $origh);
						imagejpeg($newdst, $newfile_path, 100);
						
						imagedestroy($newdst);
					}
					return "";
	
				}else{
					return "ファイル形式が正しくありません。";
	
				}
			}
		}
	}

	function copy_file_all($ary){
		
		foreach($ary as $k => $v){

			if((strpos($k, 'file', 0) !== false) || (strpos($k, 'tmb', 0) !== false)){
				if(!empty($v)){
					$ret = $this->copy_file($v);
					if(!empty($ret)){
						return $ret;
					}
				}
			}
		}
		
		return "";
		
	}



	function copy_file($filename,$upload_dir=UPLOAD_DIR,$public_dir=PUBLIC_DIR){
		
		$from = realpath(dirname(__FILE__) . "/" . $upload_dir) ."/". $filename;
		$to   = realpath(dirname(__FILE__) . "/" . $public_dir) ."/". $filename;
		
		if(file_exists($from)){
			if (!copy($from, $to)) {
				return("ファイルコピーに失敗しました。");
			}
		}
		
		return "";
		
	}




	function delete_file_all($ary){

		foreach($ary as $k => $v){

			if(strpos($k, 'del_fn_', 0) !== false){
				if(!empty($v)){
					$ret = $this->delete_file($v);
					if(!empty($ret)){
						return $ret;
					}
				}
			}
		}

		return "";

	}


	function delete_file($filename,$public_dir=PUBLIC_DIR){

		$delfile_dir  = realpath(dirname(__FILE__) . "/" . $public_dir);
		@unlink($delfile_dir . "/" . $filename);
	}

	function delete_tmp($upload_dir=UPLOAD_DIR,$remove_time=NULL){

		$delfile_dir = realpath(dirname(__FILE__) . "/" . $upload_dir);

		if (is_dir($delfile_dir)) {
			if ($dh = opendir($delfile_dir)) {
				while (($filename = readdir($dh)) !== false) {

					if($remove_time==NULL){
						@unlink($delfile_dir . "/" . $filename);
					}else{
						if (filemtime($delfile_dir . "/" . $filename) < $remove_time) {
							@unlink($delfile_dir . "/" . $filename);
						}
					}

				}
				closedir($dh);
			}

		}
	}

}

?>