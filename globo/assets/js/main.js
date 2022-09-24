var lista_links = [];

$(document).ready(function () {
    getListaLinks();
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
        getListaLinks();
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
                    salvarLink(document.getElementById("link").value);
                }
                else if( document.getElementById("botao_submit").value === 'Remover'){
                    getListaLinks();
                    if(lista_links.length > 0){
                        lista_links.forEach(function(link){
                            if(link === document.getElementById("link").value){
                                removerLink(link)
                                existe = true;
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
function getListaLinks(){
    $.ajax({
        type: 'POST',
        url : 'http://localhost/globo/controller/funcao.php',
        dataType: 'json',
        data : {
            'request_type': 'get_lista'
        },
        complete:function(data){
            if(data.status == 200) {
                var responseLinks = JSON.parse(data.responseText);
                lista_links = responseLinks.details;
            }
        },
        error: function (data){
            console.log("Erro");
        }
    });
}
function salvarLink(link){
    $.ajax({
        type: 'POST',
        url : 'http://localhost/globo/controller/funcao.php',
        async: false,
        data : {
            'link': link,
            'request_type': 'salvar'
        },
        complete:function (data){
            var statusSalvar = JSON.parse(data.responseText)
            if(statusSalvar.details){
                alert("Link cadastrado com sucesso");
            }
            else if(!statusSalvar.details){
                alert("Link já cadastrado");
            }
        },
        error: function (data){
            console.log("Erro");
        }
    });
}
function removerLink(link){
    $.ajax({
        type: 'POST',
        url : 'http://localhost/globo/controller/funcao.php',
        async: false,
        data : {
            'link': link,
            'request_type': 'remover'
        },
        complete:function (data){
            if(data.status == 200){
                alert("Link removido com sucesso");
            }
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
            url : 'http://localhost/globo/controller/funcao.php',
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
