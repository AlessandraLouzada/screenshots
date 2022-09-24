<?php
    include_once("../persistence/connection.php");
    include_once("../persistence/linksDAO.php");

    switch ($_POST['request_type']) {
        case 'salvar':
            salvar();
        break;
        case 'remover':
            remover();
        break;
        case 'get_lista':
            get_lista();
        break;
        case 'screenshot':
            get_print();
        break;

    }

    function salvar(){
        $conexao_bd = new connection();
        $conexao_bd->conectar();
        $conn = $conexao_bd->getConn();

        $linksdao = new linksDao();
		//Cadastra uma nova criançano banco de dados
		$sql=$linksdao->cadastrar($_POST['link'], $conn);

        echo json_encode(
            [
                'details'	=>  $sql,
            ]
        );
    }
    function remover(){
        $conexao_bd = new connection();
        $conexao_bd->conectar();
        $conn = $conexao_bd->getConn();
        $linksdao = new linksDao();
		//Cadastra uma nova criançano banco de dados
		$sql=$linksdao->remover($_POST['link'], $conn);
        echo json_encode(
            [
                'details'	=>  $sql,
            ]
        );
    }
    function get_lista(){
        $conexao_bd = new connection();
        $conexao_bd->conectar();
        $conn = $conexao_bd->getConn();

        $linksdao = new linksDao();
		//Cadastra uma nova criançano banco de dados
		$links=$linksdao->getLinks($conn);
        $array_links = [];
        while ($link = $links->fetch_assoc()){
            array_push($array_links, $link['url_link']);
        }
        echo json_encode(
            [
                'details'	=>  $array_links,
            ]
        );
        return $array_links;
    }
    function get_print(){
        $camimho =  realpath(dirname(__FILE__));
        $array_links = get_lista();
        foreach ($array_links as &$link) {
            $texto_bat ="cd ".str_replace('\controller', '',$camimho)."\assets\js \nphantomjs worker.js ".$link.' ';
            gravar($texto_bat, 'print_telas.bat');
            exec($camimho.'\print_telas.bat');
        }
    }
    function gravar($texto, $arquivo){
        
        //Variável $fp armazena a conexão com o arquivo e o tipo de ação.
        $fp = fopen($arquivo, "w+");
    
        //Escreve no arquivo aberto.
        fwrite($fp, $texto);
        
        //Fecha o arquivo.
        fclose($fp);
    }
    
?>