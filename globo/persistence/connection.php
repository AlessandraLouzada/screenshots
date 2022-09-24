<?php
class Connection {
	private $servername="localhost";
	private $username="root";
	private $password="";
	private $bd="link_globo";
	private $conn=null;
	
	function __construct() {}
	
	
	function conectar() {
		// Se a conexão for null realiza a conexão com o banco de dados
		if($this->conn == null) {
			$this->conn = mysqli_connect($this->servername, $this->username, $this->password, $this->bd);
		}
		// Se ocorrer algum erro na conexão é emitido uma mensagem 
		if(!$this->conn) {
			die("Conexão falhou. $conn->connect_error");
		}
	}
	// Pega a conexão com o banco de dados
	function getConn() {
		return $this->conn;
	}
	
}


?>
