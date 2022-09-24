<?php
class linksDao {
	
	function __construct(){ 
		
	}

	function cadastrar($link, $conn) {
		$sql = "INSERT INTO links(url_link) values ('".
			($link)."')";
			return $conn->query($sql);
		
	}

	function getLinks($conn){
		$res = $conn->query("SELECT * FROM links");
		return $res;
	}

	function remover($link, $conn){
		$res = $conn->query("DELETE FROM links WHERE url_link = '".$link."'");
		return $res;
	}
	
}

?>
