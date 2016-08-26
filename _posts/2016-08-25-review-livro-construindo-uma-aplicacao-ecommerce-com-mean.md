---  
layout: post  
comments: true  
title: REVIEW - Construindo uma Aplicação E-commerce com MEAN
date: 2016-08-25 23:36:00
image: '/assets/img/meanshop.jpg'
description: Review do livro Construindo uma Aplicação E-commerce com MEAN, de Adrian Meijia, traduzido para português pela Novatec.
introduction: Review do livro Construindo uma Aplicação E-commerce com MEAN, de Adrian Meijia, traduzido para português pela Novatec.
---

Salve salve *peoples*, tudo na paz?  

Nas últimas semanas, além dos trabalhos e projetos que já atuo, fiquei envolvido com a leitura e implementação do livro **Construindo uma Aplicação E-commerce com MEAN**. E hoje, lhes apresento um review desse livro, cujo autor é o [Adrian Meijia](https://github.com/amejiarosario), lançado em inglês pela Packt Publishing em novembro de 2015 e traduzido para português pela [Novatec](http://novatec.com.br/livros/ecommerce-mean/) em junho de 2016.  

Se você estava ou ainda esteja na dúvida de comprar esse livro ou não, descubra a resposta para essa dúvida lendo esse post! =)

Eu tive o prazer de ganhar de presente esse livro da [Novatec](http://novatec.com.br/livros/ecommerce-mean/) e da [Webschool.io](http://webschool.io/), muito obrigado Novatec e tio [Suissa](https://twitter.com/osuissa) por me proporem todo esse conhecimento com esse **excelente** livro! Não só a mim, mas também ao meu amigo [Eliel](https://github.com/hc3), que também ganhou o livro.  

Vou apresentar uma visão geral do livro e minhas opiniões a respeito. Não vou entrar em detalhes complexos de como são os códigos do livro ou o que poderia ser utilizado no lugar, alguma melhoria, mimimimi. Isso cabe a você, caro leitor, lendo esse livro! :D


## O Livro


![Livro Construindo uma Aplicação E-commerce com MEAN](/assets/img/meanshop.jpg)


Quem vê o tamanho e espessura do livro se engana, ele é muito objetivo e faz jus ao título. Ele é indicado para programadores com um conhecimento básico em JavaScript e queira expandir esses conhecimentos.  

É dado uma introdução a cada tecnologia que dá nome a stack MEAN. Cita exemplos de empresas que migraram para o NodeJS além de mencionar motivos e benefícios de optarem pelo NodeJS e porque desistiram de frameworks *enterprise*, como Spring MVC, Java e RoR.  

Não fica preso a ensinar apenas a stack MEAN, desde conhecimentos básicos e introdutórios a várias tecnologias utilizadas para desenvolver uma aplicação de ecommerce.  

Ao contrário de muitos cursos que encontramos hoje no mercado, ele começa com o front-end, na parte de AngularJS. Para quem é crú mesmo com MEAN. Mostrando algumas diretivas e módulos básicos e essenciais para qualquer aplicação.

Nos mostra como utilizar o módulo `ui-router` no AngularJS e todos os seus benefícios. Até então, eu conhecia apenas o `ng-route`. Agora, só usarei o `ui-router`.  

Não entra em detalhes de Style Guide, como o do John Papa, isso é com você, filhote. Mas nos mostra uma visão enorme do poder do AngularJS. A versão utilizada no livro é a 1.x.  

Ainda nos mostra como utilizar `factory` e `services` para criamos nossas funções únicas vinculadas aos controllers ou outros componentes usando o *Dependency Injection*. Antes de ingressar no back-end, ainda nos mostra um CRUD no AngularJS, que lá na frente, quando chegarmos ao back-end, será apenas refatorado quando necessário.  

O capítulo específico de MongoDB e Mongoose, particularmente, me deu uma percepção que estava fazendo uma revisão das aulas de MongoDB do curso [Be MEAN](http://webschool.io/), do [tio Suissa](https://twitter.com/osuissa). Conteúdo excelente, linguagem simples, muito direta e objetiva.  

Após apresentado sobre AngularJS e MongoDB, chegamos ao back-end, com NodeJS e ExpressJS. Aqui é apresentado como é e como funciona uma API RESTful. Até então eu ainda tinha uma dúvida ou outra sobre o que era e como funcionava uma API RESTful. No livro, Adrian nos mostra os conceitos básicos introdutórios dela e como funciona uma API do tipo RESTful, e ainda, faz uma pequena comparação com outras metodologias, como SOAP, por exemplo.  

A partir desse momento sempre realizamos testes, com TDD e BDD. A cada requisição importante para nossa aplicação, realizamos um teste. No front-end, também realizamos testes, os famosos `e2e - end to end`. Para testes de unidade, utilizamos o Karma e Mocha/Chai/SinonJS. Já para os testes fim a fim, no AngularJS, utilizamos o Protractor.  

Front-end e back-end prontos, bastou conectarmos o AngularJS à API REST do ExpressJS.

Com isso pronto, começou a fase de implementação de novos recursos, como por exemplo, upload de imagens com `ng-file-upload` e `connect-multiparty`.  

Tudo pronto? Não! Temos ainda uma visão sobre autorização e autenticação. O que é cada um e uma visão de alguns tipos de autenticação disponível atualmente, como por sessão, JWT, OAuth, PassportJS, MemoryStage e MongoStore. Além, é claro, de estratégias e rotas de autenticação. Afinal, em uma aplicação ecommerce não podemos deixar apenas uma opção de autenticação para o usuário.  

Uma das partes que mais fiquei surpreso foi a de checkout! Eu não fazia a mínima ideia de como isso seria desenvolvido em JS. Já vi alguns cases em PHP, mas JS não, ainda. Eis que sou apresentado ao carinha chamado `ngCart`, módulo para AngularJS. Ao invés de desenvolvermos um módulo de checkout do zero, basta utilizarmos ele no nosso front-end e voilà. No back-end, também me surpreendi pelo módulo utilizado. Foi nos apresentado o [Braintree](https://www.braintreepayments.com), para receber pagamentos via cartão de crédito/débito e PayPal.  

Pra não conhece o [Braintree](https://www.braintreepayments.com):  

*"Uma maneira simples, robusto para aceitar pagamentos ou permitir a compra de quase qualquer lugar - em seu aplicativo móvel ou online. No topo da amplitude de clientes PayPal e Venmo, nossas integrações fáceis dará acesso a vários métodos de pagamento, preços simples, proteção de alto nível e suporte de classe mundial".*  

Fiquei um pouquinho triste com ele, poxa, ainda não funciona no Brasil! Que pena! E falando nisso, não conheço um módulo nacional a nível Braintree para NodeJS. Se você conhece algum, por favor, deixe seu comentário aí! :)  


![Exemplo de tela do projeto](/assets/img/tela01.png)


![Exemplo de tela do projeto](/assets/img/tela02.png)


## Deploy do Projeto  

Como o livro foi escrito e a aplicação exemplo foi desenvolvida em meados de 2015, as versões dos pacotes e dependências utilizar são um pouco antigas. Isso causou uma certa dor de cabeça durante o deploy.  

Tentei o deploy no Heroku e DigitalOcean. No Heroku foi onde encontrei maiores problemas. O pacote `generator-angular-fullstack` sofreu com deploy no Heroku para várias pessoas, não fui o único. E a maioria das respostas que encontrei para isso é devido a versão antiga desse pacote apresenta inúmeros erros de deploy no Heroku.  

Já na DigitalOcean ainda sofri com alguns erros. Em várias tentativas, sejam em droplets com imagens prontas da MEAN Stack ou em um droplet configuranto tudo do zerto, mesmo seguindo todos os passos do livro vários processos foram **killed** durante a instalação. Isso ocorreu devido a pacotes *decrapeted* e versões antigas. Ou seja, DigitalOcean também não foi possível realizar o deploy.

Agora, o OpenShift, estou na lista de espera para liberarem meu acesso. Assim que liberarem meu acesso, tentarei efetuar o deploy lá também.  

Ou seja, já aprendi mais uma coisinha aqui, trabalhar com versões antigas de pacotes e dependências pode me trazer uma certa baita dor de cabeça futuramente, amiguinhos! rsrs'


## Tradução


![What did you say?](/assets/img/wdys.gif)


A tradução em si está boa. Porém faço algumas ressalvas. Jamais ouvi falar de **views** como **visões**, aí tá errado, eu acho. No decorrer do livro eu via **visões** e já lia **view**. Essa tradução para **visões** não foi a melhor escolha, poderia ter ficado com **view** mesmo. Assim como **factory** como **fábrica** também não fiquei satisfeito. Traduzir **controllers** para **controladores**, tudo bem.  

Outro detalhe que achei que não caiu bem foi traduzir **promises** para **promessas**! Não colou! rsrs'  

Por mais que seja termos que estejamos acostumados em uma aplicação em AngularJS, não ficou nada agradável ler dessa forma tais funcionalidades.  

Mas de uma maneira geral, a tradução do livro em si está tudo de acordo, uma ótima tradução. Inclusive, algumas notas da Novatec sobre a tradução, versões de pacotes e dependências. Show!  

Tem quem goste e ame o Grunt, tem quem odeie. Particularmente não gosto e prefiro mil vezes o Gulp. E tenho minhas opiniões a respeito de cada ferramenta.    

Mas não burro pra ficar de mimimi por qual ferramenta eu prefiro trabalhar pra deixar de aprender o que me foi proposto ou se existe uma melhor que a outra. Apesar de não gostar do Grunt, me dei bem com ele, tranquilão!  

Por que ponto negativo, então fdp? Porque se fosse eu, faria com Gulp! :p  

**Que fique claro**, eu não gosto do Grunt. Você pode gostar ou não, é com você. Afinal, não existe melhor ou pior. Existe a que cada um utiliza a tecnologia na qual se familiriza mais e na qual de adequa mais ao seu projeto.  

Não precisamos ficar discutindo à toa, de mimimi à toa, por conta disso.

Mais uma vez, **que fique claro**, para essa aplicação ecommerce, o Grunt caiu como uma luva, assim como eu tenho certeza que o Gulp também cairia!


## Próximos passos


![Now what?](/assets/img/nowwhat.gif)


Após absorver todo esse conhecimento, o que fazer, o que comer, como viver? rsrs'  

Você pode visualizar todos os códigos que utilizei no meu [repositório no GitHub](https://github.com/ednilsonamaral/livro-ecommerce-mean).E também, caso queira ver ele online, basta acessar [https://meanshopapp.herokuapp.com/](https://meanshopapp.herokuapp.com/) para ver os meus resultados. Eu segui a risca o que foi proposto no livro.  

Me deparei com situações que melhorias em algumas coisas, mas preferi deixar essas melhorias pro final, após concluir o livro.  

Se você notar, duas situações na qual está instável na aplicação publicada, login com redes sociais e checkout com Braintree não estão funcionando. O checkout não vai funcionar mesmo, com Braintree não. Já o login com redes sociais, espero implementar nas próximas semanas.  

Além disso tudo, juntamente com o [tio Suissa](https://twitter.com/osuissa) e [Eliel](https://github.com/hc3), estamos preparando uma surpresinha sobre a continuação do conteúdo abordado nesse livro. Aguardem, que em breve, teremos mais novidades! xD  

*vamos refatorar? - eis a questão*  

A partir de agora iremos dar ínico a refatoração e evolução dessa criançinha! Vamos iniciar nos próximos dias/semanas o processo de refatoração utilizando módulos atômicos! Aguarde por novidades e a continuação do primeiro ecommerce em MEAN do Brasil! =D


## Concluindo

![Chuck Norris approves!!](/assets/img/ok.gif)


O básico de uma aplicação ecommerce foi nos apresentado e cumpriu com o objetivo do livro. Porém, ele vai além. Ele nos ensina a stack MEAN, testes com TDD e BDD, ferramentas úteis que podemos utilizar para desenvolvermos qualquer aplicação; nos ensina como realizar o deploy de nossa aplicação, e ainda dá sugestões de implementação de novos recursos para enriquecer nossa aplicação. Tem mais ainda, quer automatizar o deploy? Ele ensina também, com Capistrano!  

O conteúdo do livro é excelente, de altíssimo nível. Se você estava em dúvida em [comprar](http://novatec.com.br/livros/ecommerce-mean/) ou não, apenas [compre](http://novatec.com.br/livros/ecommerce-mean/). Você aprenderá inúmeras coisas. Digo por experiência própria. Conheci a stack MEAN no último trimestre de 2015 e, agora, menos de um ano após, já aprendi a desenvolver um ecommerce com essa lindeza, vê se pode uma coisas dessa, rapaz!  

Eu era fichinha em JS, agora sou menos fichinha do que antes! :p

Esse livro não fica atrelado apenas ao título, ensinar MEAN. Esquece isso quando [comprar esse livro](http://novatec.com.br/livros/ecommerce-mean/). Ele vai muito além, te garanto!

Caso tenha alguma dúvida, sugestão, reclamação, please, entre em contato comigo, através de um simples comentário ou através das redes sociais.  

Se gostou ou não, compartilhe com seus amigos desenvolvedores, full stacks JS, front-ends, back-ends! =p

É isso aí pessoal, vaaleu, até mais! =D


![Vaaleu, Faalo!](/assets/img/vlwflw.gif)
