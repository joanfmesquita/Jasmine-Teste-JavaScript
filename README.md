# Jasmine-Teste-JavaScript

Preparando o ambiente

Primeiro, certifique-se de ter o Node.js instalado em sua máquina. Caso ainda não tenha, você pode baixá-lo pelo endereço https://nodejs.org .

Com o Node.js instalado em sua máquina, execute o seguinte comando no terminal:

$ npm install jasmine -g

Caso não esteja no Windows, não se esqueça de acrescentar “sudo” antes do comando.

Isso irá instalar o Jasmine globalmente em sua máquina, o que nos permitirá executar o comando “jasmine” pelo terminal.

Vamos criar um diretório com o nome “Testes Jasmine”, que será onde iremos escrever nossos códigos.

Dentro do diretório, abra o terminal e execute o comando:

$ jasmine init

Isso irá criar um diretório chamado “spec“. Dentro desse diretório terá um outro chamado “support”, que contém um arquivo chamado “jasmine.json”, onde estão todas as configurações do Jasmine.

Por padrão, o Jasmine irá procurar por todos os arquivos dentro do diretório “spec” em que o nome termine com “spec.js”. Por isso, todos nossos códigos de teste ficarão dentro deste diretório.

Pronto! Nosso ambiente já está preparado para escrevermos nosso primeiro teste.



Criando nosso primeiro teste

Vamos finalmente escrever nosso primeiro código. Para isso, vamos criar um arquivo com o nome “hello-spec.js” dentro do diretório “spec”.

É uma boa prática criar arquivos de teste com o mesmo nome do arquivo que será testado. Como estamos testando o arquivo “hello” e o Jasmine espera por arquivos que terminem com “spec.js”, demos o nome ao nosso arquivo de “hello-spec.js”. Assim fica fácil sabermos que o arquivo trata-se de um teste de um arquivo de nome “hello”.

Dentro do arquivo “hello-spec.js” teremos o seguinte código:

var hello = require('../hello');
describe('Hello', function(){
    it('has to print "Hello World!"', function(){
        var text = hello();
        expect(text).toEqual('Hello World!');
    })
})

Primeiro nós importamos a nossa função “hello()”.

Iniciamos primeiro a função “describe()” do Jasmine. Esta função cria o que chamamos de “suíte”. Normalmente define algum componente da nossa aplicação. Neste caso, chamamos de “Hello”, já que é o nome do nosso arquivo. Pode ser o nome de uma classe, funcionalidade, objeto, tela, etc. É só uma string comum que decidimos um nome para nos ajudar a manter a organização dos testes.

Então, após dar um nome para a suíte, uma função anônima é passada, e dentro dela é que nós começamos efetivamente a criar os testes.

Veja que nós executamos uma função “it()”. Ela é o que chamamos de “especificação”, ou “spec” (de specification). É simplesmente uma função onde primeiro passamos uma string onde indicamos o que um certo pedaço de código deve fazer.

Note que ainda não estamos programando nada. Essa string não é um comando, é simplesmente uma string onde descrevemos o que queremos. Isso também facilita a organização dos testes e o gerenciamento caso algo dê errado. Notaremos isso melhor daqui a pouco. Dentro de cada suíte podemos ter quantas specs quisermos.

A função “it()” também recebe uma função de callback, que é onde finalmente escreveremos algum teste.

Nós executamos a função “hello()” e guardamos o retorno dela em uma variável que demos o nome de “text”. E finalmente vem o nosso teste.

Passamos a variável “text” para uma função chamada “expect()”. Essa função armazena o valor passado. Em seguida executamos a função “toEqual()”, e passamos para ela a string “Hello World!”.

A função “toEqual()” verifica se um valor é igual ao valor passado para ela. Essas funções que checam valores se chamam “Matchers”. Há várias delas no Jasmine. Conheceremos mais em uma futura aula, e veremos que podemos até mesmo criar nossos próprios Matchers.

O Jasmine tenta ser o mais próximo possível do Inglês para facilitar a leitura dos testes. Com isso, basicamente estamos dizendo:

Vamos executar este teste. Com o terminal aberto no diretório raiz, execute o comando:
$ jasmine

Ele irá indicar que foi encontrado um spec, nenhuma falha, e o tempo em segundos que levou para executar todos os testes.

Agora vamos mudar o nosso teste. Na função “toEqual()”, tire a string “Hello World!” e coloque a string “Welcome!“

Ele irá exibir um erro.

Veja como que a mensagem de erro ficou bem fácil de entender. Diz que espera-se que “Hello World!” seja igual a “Welcome!”. Por isso o erro!

Depois ele também indica onde ocorreu o erro, ou seja, o teste que não passou (arquivo, linha e coluna).

Lembra-se que eu disse que era importante um bom nome para a suíte e para a spec? Isso porque as duas juntas acabam formando o título do teste. Veja que ele formou a frase “Hello has to print ‘Hello World!’”. Os nomes e palavras passadas não fazem diferença nenhuma para o computador, que está testando, mas faz toda a diferença para o humano que estiver lendo os testes.

Vamos voltar a string “Welcome!” para o que estava antes, permitindo que o teste passe novamente.

Não é prático termos que ficar executando o Jasmine a cada alteração que fizermos em nosso código. Por isso é melhor que a gente tenha uma maneira em que o Jasmine seja iniciado sozinho quando algum arquivo for alterado.

Muitas ferramentas disponibilizam isso, mas o Jasmine não disponibiliza nativamente.

Muitas pessoas costumam configurar automatizadores de tarefas, como o Gulp. Mas vamos fazer aqui algo ainda mais simples do que configurar o Gulp.

Vamos instalar o Nodemon com o comando:
npm install nodemon -g

Isso irá instalar o Nodemon globalmente em sua máquina, permitindo que a gente acesse ele pelo terminal.

O Nodemon é uma ferramenta que executa o Node.js e reinicia ele assim que uma modificação em algum arquivo for localizada.

Com o Nodemon instalado, ao invés de simplesmente chamar o Jasmine pelo terminal, execute o seguinte comando:
nodemon --exec jasmine

Com isso o Nodemon será iniciado e irá executar o comando “jasmine”. Quando alterarmos algum código ou teste, o comando “jasmine” será executado novamente.

Isso é muito útil quando, por exemplo, estamos com um teste quebrado e estamos tentando arrumar uma função, ou quando estamos criando uma nova funcionalidade. Assim o Jasmine ficará de olho para ver se nosso novo código não irá quebrar o código já existente.

Instalando o Karma

O Karma (inicialmente conhecido como Testacular) é uma ferramenta criada pela equipe que criou o AngularJS. Ela serve para executar testes.

Com ele podemos, por exemplo, mandar que os nossos testes sejam executados no Chrome e no Firefox ao mesmo tempo com apenas um comando.

Primeiro vamos instalar o Karma. Para isso, execute o comando:
$ npm install -g karma-cli
npm install karma --save-dev

Isso irá instalar o Karma globalmente em sua máquina, nos possibilitando executar o Karma diretamente da linha de comando.

Vamos aproveitar nosso diretório com nossos testes. Abra o terminal na raiz do diretório e execute o comando:
karma init karma.conf.js

Isso irá iniciar um arquivo de configuração do Karma com o nome “karma.conf.js”. Pode ser o nome que você preferir.

Uma série de perguntas serão feitas, como o framework de testes que estamos usando (Jasmine já é o padrão), o navegador a ser usado para os testes, o local dos arquivos dos nossos testes, etc.

Agora precisamos instalar algumas dependências. Execute o comando:
npm install karma karma-jasmine karma-chrome-launcher jasmine-core
Já temos nossos testes feitos. Então para iniciar, basta executar o comando:
karma start karma.conf.js


Executando testes com Karma e WebPack

Provavelmente irá dar um erro ao executarmos os testes, pois estamos usando o “require” que é um comando do Node.js, e o Karma executa testes em navegadores.

Podemos usar um plugin do Karma que interpreta o comando “require()”, fazendo uso do WebPack. Para isso, execute o comando:
npm install webpack karma-webpack
Tenha certeza de que possui o WebPack instalado em sua máquina. Caso contrário, execute o comando:
npm install webpack -g
Agora vamos ao arquivo de configuração do Karma e fazer uma pequena alteração. Em “preprocessors”, adicione o array [“webpack”] com a chave “spec/*spec.js”.

Note que o nome da chave deve ser igual a string passada em “files”.

Agora basta iniciar o karma com o comando
karma start
