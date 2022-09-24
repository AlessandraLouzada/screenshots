var lista_links = [];
$(document).ready(function () {
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
                exibir();
            }
        },
        error: function (data){
            console.log("Erro");
        }
    });
});
function exibir(){
    if(lista_links.length > 0){
        lista_links.forEach(function(link){
            
            var link_compare = link.replace("://", "+");
            link_compare = link_compare.replace("/", "_");

            var url_link = "http://localhost/globo/screenshots/"+link_compare;
            $.ajax({
                url: url_link,
                success: function(data){
                    document.getElementById('box').append("Prints do link cadastrado: "+ link);
                    $(data).find("td > a").each(function(){
                        if($(this).attr("href") != '/globo/screenshots/'){
                            var src_img = url_link+'/'+$(this).attr("href");
                            var data = $(this).attr("href").replace("%20", " às ");
                            var html = '<br><br><img src="'+ src_img+'" width="500" height="600"><br>'
                            +'<label>Print tirado na data: '+data.replace(".png", "")+'</label><br><br>';
                            $("#box").append(html);
                        }
                    });
                }
                });
        });

    }
    else{
        document.getElementById('box').innerHTML = "Sem links cadastrados";
    }
}
