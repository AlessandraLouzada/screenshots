<?php
    switch ($_POST['request_type']) {
        case 'gravar':
            gravar($_POST['lista']);
        break;
        case 'get_lista':
            get_lista();
        break;
        case 'screenshot':
            get_print();
        break;

    }

    function gravar($texto, $arquivo = null){
        //Variável arquivo armazena o nome e extensão do arquivo.
        if(!$arquivo){ 
            $arquivo = "links.txt";
        }
        
        //Variável $fp armazena a conexão com o arquivo e o tipo de ação.
        $fp = fopen($arquivo, "w+");
    
        //Escreve no arquivo aberto.
        fwrite($fp, $texto);
        
        //Fecha o arquivo.
        fclose($fp);
    }
    function get_lista(){
        //Variável arquivo armazena o nome e extensão do arquivo.
        $arquivo = "links.txt";
        
        //Variável $fp armazena a conexão com o arquivo e o tipo de ação.
        $fp = fopen($arquivo, "r+");
    
        $ler = fread( $fp, filesize($arquivo) );

        // Fecha o arquivo
        fclose($fp);
        echo json_encode(
            [
                'details'	=>  $ler,
            ]
        );
        return $ler;
    }
    function get_print(){
        $camimho =  realpath(dirname(__FILE__));
        $array_links = json_decode(get_lista());
        foreach ($array_links as &$link) {
            $texto_bat ="cd ".str_replace('\controller', '',$camimho)."\assets\js \nphantomjs worker.js ".$link.' ';
            gravar($texto_bat, 'print_telas.bat');
            exec($camimho.'\print_telas.bat');
        }
    }
    
?>