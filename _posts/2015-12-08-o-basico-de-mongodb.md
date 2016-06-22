---  
layout: post  
comments: true  
title: O Básico de MongoDB  
date: 2015-12-08 23:00:00  
---


No meu último post falei um pouco sobre a stack MEAN, e o M dessa sigla nada mais é que MongoDB. Mas que parada louca é essa, parça?! Irei explicar nesse post exatamente isso.


## SQL vs NoSQL  

Bem sabemos que existe o modelo relacional de banco de dados, como SQL. Mas e o que vem a ser esse tal de NoSQL?  

NoSQL não quer dizer *Não SQL*, seu conceito é de ser um banco de dados não relacional e de código aberto. Para explicar melhor o que vem a ser NoSQL, irei usar um exemplo dado pelo [Suissa](https://twitter.com/osuissa) durante uma aula de MongoDB no curso de [Be MEAN](https://github.com/Webschool-io/be-mean-instagram):  

> Para entender melhor o NoSQL, pensaremos em uma analogia utilizando cervejas. Aquelas cervejas Pilsens da vida (Skol, Bhrama, Sub-zero) são banco de dados relacionais, iguais. Agora, as cervejas NoSQL são as diferentes, cada uma com suas características marcantes.


Os banco de dados em NoSQL são baseados em grafos não relacionais. Ele é ótimo em resolver problemas especificos, de uma forma muito melhor do que banco de dados relacionais.  

Uma das principais diferenças entre bancos de dados relacionais e NoSQL é que, enquanto os bancos de dados relacionais nós os estruturamos sabendo quais repostas teremos, quais entradas, o NoSQL o que realmente importa são as perguntas e não as respostas. Ou seja, a normalização de um banco de dados não relacional será de acordo com as perguntas do seu sistema.


## MongoDB, o que é mesmo?

> MongoDB (do inglês humongous, "gigantesco") é uma aplicação de código aberto, de alta performance, sem esquemas, orientado a documentos. Foi escrito na linguagem de programação C++. Além de orientado a documentos, é formado por um conjunto de documentos JSON. Muitas aplicações podem, dessa forma, modelar informações de modo muito mais natural, pois os dados podem ser aninhados em hierarquias complexas e continuar a ser indexáveis e fáceis de buscar.

Ah, sabe mais uma coisa legal do MongoDB, ele não possui JOIN. Ainda não.  

E o mais impressionante do MongoDB, ele aceita **JavaScript**! Sua API é uma das mais fáceis de utilizar. Ele possui **schemaless**, por isso não possui **schema**.


#### MongoDB é para programadores e não para DBA's da vida! #FicaDica


### Como é seu armazenamento?  

O MongoDB trabalho com *Memory Mapped Files*, ou seja, ele vai persistindo os dados sequencialmente no seu hard disk.  

Quando criamos um *database* no MongoDB, ele já pré-aloca 80MB, para que os dados sejam inseridos sequencialmente. Mas ele não vai levantar esses dados pré-alocados diretamente no HD, ele vai para a memória RAM. E, quando a sua memória RAM ter toda sua capacidade usada, existe um carinha chamado **sharding**, que vai quebrar os dados em pequenos pacotes e alocar em outros servidores.


### Terminologia  

SQL > MongoDB  
Database > Database  
Table > Collection  
Rows > JSON  
Query > Query  
Index > Index  
Partition > Shard  

Enquanto no SQL utilizamos tabelas, no MongoDB trabalhamos com coleções (*collections*). Ao invés de rows, temos documentos JSON.  

Já deu pra sentir um pouco da pegada do MongoDB é louca, né? É só o começo, parça! ;)


### Instalação e Documentação  

Para a instalação do MongoDB no seu computador, é muito simples, caso você **não use** Windows. Se você ainda usa Widnows, boa sorte, pois vai precisar! hehe'  

Brincadeiras a parte, independente do sistema operacional que você utilize (eu não uso Windows), recomendo fortemente um artigo sobre [como instalar](https://github.com/Webschool-io/be-mean-instagram/blob/master/Apostila/module-mongodb/pt-br/installation.md) o MongoDB.

[Nesse link](https://docs.mongodb.org/), encontramos a documentação oficial do MongoDB. E mesmo sendo em inglês, indispensável!


### Começando os Trabalhos :p  

Os exemplos que postarei no decorrer desse post, realizei no Debian. Eu já deixei meu MongoDB para iniciar seu serviço já quando ligo o PC. Mas caso aí pra você ele não inicie automaticamente, baste deixar um terminal aberto com o comando `mongod` e então abrir outro terminal para trabalhar com o MongoDB.

O `mongod` apenas é o comando responsável por iniciar o serviço do MongoDB, então, se ele não inicia automaticamente quando seu PC liga, toda vez que for utilizar o MongoDB deve executar esse comando e só fechar esse terminal quando não trabalhar mais com o MongoDB.  

Agora, após deixar o terminal do `mongod` aberto, temos outro terminal para utilizarmos o MongoDB. Temos duas maneiras de iniciar o MongoDB:  

* `mongo` > para iniciar o MongoDB direto, então ele conectará no banco de dados *test*.  
* `mongo nome_database` > para iniciar o MongoDB já conectado em um banco de dados especifico.  

Independente se você conectar no database `test` ou diretamente em um database especifico (`mongo nome_database`), você poderá lista todos os banco de dados com o `show dbs` de qualquer banco de dados conectado. Ou seja, mesmo eu estando conectado no `bancoTest`, poderei ver a lista de todos os outros bancos conectados através do `show dbs`.


### Inserindo documento  

Digamos que você inicie o MongoDB com o comando `mongo bancoTeste`, e der um `show dbs`, verá que o banco **bancoTeste** não está listado. Mas por que? Simples, o MongoDB só cria o seu banco de dados quando for inserido algum objeto dentro de uma coleção.  

A sintaxe básica do MongoDB é `db.nome_coleção.função_desejada()`.  

No MongoDB, temos duas maneiras de inserir novos objetos. Ou é através de uma variável e passando via parâmetro quando chamaos a função `insert` ou diretamente como parâmetro.


#### Direto na função `insert`  

Para inserirmos um objeto diretamente como parâmetro da função `insert`, é como o exemplo a seguir: `db.colecao.insert({name: "Ednilson"})`.


#### Via variável

Agora, se optarmos por inserirmos um objeto via variável, teremos dois passos:  

**1.** Criar a variável: `var json = {name: "Ednilson"}`;  
**2.** Chamar a função `insert` passando como parâmetro a variável criada anteriormente: `db.colecao.insert(json)`.  

Qual a maneira mais fácil que você identificou de adicionar um objeto na coleção desejada? Via variável, lógico, né! Se não foi via variável, why? Tell me, please! :p  

Agora, dê o comando `show dbs` e o que acontece? Seu `bancoTeste` foi criado com sucesso, parça!  

Também podemos criar uma variável e adicionar vários documentos dentro da mesma variável. Mas como? Em forma de array, como no seguinte exemplo: `var array = [{name: "Anderson Silva", age: 45}, {name: "Chris Weidman", age: 25}, {name: "Eli Manning", age: 28}]`. E então chamar a função `insert`: `db.colecao.insert(array)`.  

Agora que inseri, como vejo o que foi inserido ou o que tem na minha coleção? Simples também, parça! Basta dar um comando `db.colecao.find()`. Apenas com o `find`, ele vai lista todos os objetos na coleção. Agora se você quer ver um especifico, o primeiro, por exemplo, basta dar o comando `db.colecao.findOne()`.  

Acima, vimos como inserir esses objetos na nossa coleção. Porém, eles são estão salvos no banco ainda. Para salvar, basta chamarmos a função `save`, da seguinte forma: `db.colecao.save(array)`. Se você preferir dar o `save` sem o `insert`, também é possível.


### Hora do `SELECT`, #SQN!  

Para buscar documentos, temos:  

* `find()`: dando apenas um `db.colecao.find()`, sem passar nenhum parâmetro, ele irá mostrar todos os registros na tela.  
* `findOne(): ele retorna apenas um único documento: `db.colecao.findOne()`.

Irei te recomendar a leitura [desse artigo](http://imasters.com.br/artigo/17308/mongodb/como-utilizar-selects-com-mongodb/?trace=1519021197&source=author-archive), um pouco antigo, mas explica com detalhes como funciona a busca de documentos com MongoDB. #FicaDICA


### E como fica o UPDATE?  

Atualizar um documento pode ser feito tanto com o `db.colecao.save()` como utilizar `db.colecao.update()`. No comando `db.colecao.update()` nós passamos 3 parâmetros, sendo eles:  

* query;  
* modificadores;  
* options.  

A sintaxe básica é: `db.colecao.update(query, modificadores, options)`.  

Antes de exemplificar como funciona o UPDATE no MongoDB, vamos ver o que são e como funcionam os **operadores de modificação**!


#### Operadores de Modificação  

##### `$set`  

Ele modifica um valor ou cria esse valor, caso ele não exista. Sua sintaxe básica é `{$set: {campo: valor}}`.  

Agora, vamos buscar nossos documentos e copiar um **_id**: `{"_id": ObjectId("56672470c75dad95fecca13c"), "name": "Anderson Silva", "age": 45}`.  

Nisso, criaremos uma variável `var query = {"_id": ObjectId("56672470c75dad95fecca13c")}` contendo a **_id** escolhida. Então, utilizando o `$set` iremos adicionar um novo campo no nosso documento: `var mod = {$set: {sex: "Male"}}`.  

Como vemos no código acima, criamos uma variável **mod** que está nosso modificado `$set`. E então, passamos o `db.colecao.update(query, mod)` com o query que possui o _id escolhido anteriormente e nosso operador `$set`. Agora, ao buscarmos o documento pela query visualizamos que o campo `age` foi criado e adicionado o valor especificado na variável `mod`.


##### `$unset`  

Se temos como adicionar um novo campo em nosso documento, temos como remover esse campo? Sim, utilizando o operador `$unset`! Ele funciona como o `$set`, porém ao invés de adicionar, ele **remove**!  

Sua sintaxe básica é `{$unset: {campo: valor}}`.


##### `$inc`  

Esse operador incrementa um valor no campo desejado. Caso o campo não exista, esse campo é criado e inserido o valor passado por ele. Sua sintaxe é `{$inc: {campo: valor}}`.

Let's code! Ainda utilzando nosso _id na variável query, iremos aumentar a idade do carinha lá, simples: `var mod = {$inc: {age: 1}}`. Ao invés de 45 anos, agora ele tem 46.  

E para voltar aos 45 anos? Basta passar um valor negativo: `var mod = {$inc: {age: -1}}`!


Além desses operadores citados, temos os operadores de array. Não os citarei aqui no blog, para saber mais, basta acessar a documentação oficial do MongoDB, cujo link tá lá em cima do post! ;)


### Concluindo  

É fácil trabalhar com MongoDB, não é?! Se eu continuar nesse post, sairá mais uma apostila do que post. Ficou interessado em aprender mais sobre MongoDB, então já sabe, vem acompanhar o curso [Be MEAN](https://github.com/Webschool-io/be-mean-instagram/) do [Suissa](https://twitter.com/osuissa)!


Qualquer dúvida, sugestão, crítica, por favor, deixe seu comentário logo abaixo. Vaaleu! Até a próxima! :)
