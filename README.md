# Screenshots

As aplicação permitem o usuário cadastrar, listar e remover links, e que a cada 1 minuto é tirado print da página de cada um desses links cadastrados.

A aplicação na pasta globo usa banco de dados para fazer o controle dos links inseridos, caso baixe ela sera necessario rodar o script criacaoBd.sql, que está dentro dela no banco de dados do seu servidor local. 

Já a aplicação na pasta globoTxt usa de arquivos para salvar os links inseridos, nessa não é necasario rodar nenhum script de banco de dados.

Como primeiro passo para rodar e testar a aplicação é preciso ter algumas ferramentas instaladas, como o phantomJS,  Selenium e nodeJS.

O seguinte link, https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-windows.zip, fara o download do phantomJS no Windows, apos finalizar o download é preciso desconpactar o arquivo e acrescentar o phantomJS nas variaveis de ambiente no PATH, o caminho a ser colocado é onde esta o executavel que se encontra dentro da pasta bin, exemplo "C:\Program Files\phantomjs-2.1.1-windows\bin".

Após baixar o projeto em sua máquina acesse o caminho da pasta onde está o projeto e pelo terminal e rode os comandos:
npm install selenium-webdriver
npm install chromedriver
Esses comandos são usados para realizar o teste automático pelo Selenium.


Para rodar o teste automatizado é preciso acessar a pasta do projeto pelo terminal e dar o seguinte comando: node seleniumTeste.js

Vale lembrar que o projeto foi desenvolvido no sistema operacional Windows 10, com Visual Studio como IDE, o Apache v3.2.4  como servidor e usando as seguintes linguagens:
PHP 7.2.34
Node 18.9.0
HTML5
CSS
JavaScript
