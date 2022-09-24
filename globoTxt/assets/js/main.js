const lista_links = [];

$(document).ready(function () {
    setListaLinks(lista_links);
    iniciarWorker();
    $('#inserir').on('click', () => {
        document.getElementById("tabela").style.display = "none";
        document.getElementById("dado_link").style.display = "block";
        document.getElementById("box").style.display = "block";
        document.getElementById("botao_submit").value = "Salvar";
    });

    $('#listar').on('click', () => {
        document.getElementById("dado_link").style.display = "none";
        document.getElementById("tabela").style.display = "block";
        document.getElementById("box").style.display = "block";
        if(lista_links.length > 0){
            document.getElementById('tabela').innerHTML = "";
            let table = document.createElement('table');
            let thead = document.createElement('thead');
            let tbody = document.createElement('tbody');

            table.appendChild(thead);
            table.appendChild(tbody);

            document.getElementById('tabela').appendChild(table);

            let tr_cabecalho = document.createElement('tr');
            let cabecalho = document.createElement('th');
            cabecalho.innerHTML = "Links cadastrados";

            tr_cabecalho.appendChild(cabecalho);
            thead.appendChild(tr_cabecalho);

            lista_links.forEach(function(link){
                let tr_linhas = document.createElement('tr');
                let linhas = document.createElement('td');
                linhas.innerHTML = link;

                tr_linhas.appendChild(linhas);
                tbody.appendChild(tr_linhas);
            });
        }
        else{
            document.getElementById('tabela').innerHTML = "Sem links cadastrados";
        }

        
    });

    $('#remover').on('click', () => {
        document.getElementById("tabela").style.display = "none";
        document.getElementById("dado_link").style.display = "block";
        document.getElementById("box").style.display = "block";
        document.getElementById("botao_submit").value = "Remover";
    });

    $('#botao_submit').on('click', () => {
        
        var existe = false;
        if( document.getElementById("link").value != ''){
            try {
                let url = new URL(document.getElementById("link").value);
                if( document.getElementById("botao_submit").value === 'Salvar'){
                    if(lista_links.length > 0){
                        lista_links.forEach(function(link){
                            if(link === document.getElementById("link").value){
                                existe = true;
                                alert("Link já cadastrado");
                                return;
                            }
                        });
                    }
                    if(!existe){
                        lista_links.push(document.getElementById("link").value);
                        setListaLinks(lista_links)
                        alert("Link cadastrado com sucesso");
                    }
                }
                else if( document.getElementById("botao_submit").value === 'Remover'){
                    if(lista_links.length > 0){
                        lista_links.forEach(function(link){
                            if(link === document.getElementById("link").value){
                                var index = lista_links.indexOf(link);
                                lista_links.splice(index,1);
                                setListaLinks(lista_links)
                                existe = true;
                                alert("Link removido com sucesso");
                            }
                        });
                    }
                    if(!existe){
                        alert("Link não cadastrado para ser removido");
                    }
                }
            } catch (err) {
                alert("Link invalido!")
            }
            document.getElementById("link").value = '';
        }
        else{
            alert("Preencha o campo");
        }
    });
    

});
function setListaLinks(links){
    const JsonArray = JSON.stringify(links);
    $.ajax({
        type: 'POST',
        url : 'http://localhost/globoTxt/controller/funcao.php',
        async: false,
        data : {
            'lista': JsonArray,
            'request_type': 'gravar'
        },
        error: function (data){
            console.log("Erro");
        }
    });
}
function iniciarWorker(){
    if(lista_links.length > 0){
        $.ajax({
            type: 'POST',
            url : 'http://localhost/globoTxt/controller/funcao.php',
            async: false,
            data : {
                'request_type': 'screenshot'
            },
            error: function (data){
                console.log("Erro");
            }
        });
    }
}
window.setInterval(iniciarWorker, 60000);
