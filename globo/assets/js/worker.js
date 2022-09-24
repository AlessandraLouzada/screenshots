var page = require('webpage').create();
var system = require('system');
var data = new Date();

// Guarda cada pedaço em uma variável
var dia     = data.getDate();           // 1-31
var mes     = data.getMonth();          // 0-11 (zero=janeiro)
var ano    = data.getFullYear();       // 4 dígitos
var hora    = data.getHours();          // 0-23
var min     = data.getMinutes();        // 0-59

// Formata a data e a hora (note o mês + 1)
var str_data = dia + '-' + (mes+1) + '-' + ano;
var str_hora = hora + 'h' + min + 'm';
data = str_data + ' ' + str_hora;

page.viewportSize = { width: 1024, height: 768 };
var url = system.args[1];
page.open(url, function(response) {
  const status = response;
  url = url.replace("://", "+");
  var nome = url.replace("/", "_")+'/'+data+ '.png';
  page.render('../../screenshots/'+nome);
  phantom.exit();
});