---  
layout: post  
comments: true  
title: Desenvolvendo componentes com Vue.js 2
date: 2017-02-02 01:36:00
image: '/assets/img/vue-wallpaper.jpg'
description: Desenvolvi esse projeto com o objetivo de praticar Vue.js, especificamente o desenvolvimento de componentes com Vue.js 2.
introduction: Desenvolvi esse projeto com o objetivo de praticar Vue.js, especificamente o desenvolvimento de componentes com Vue.js 2.
---

Olá! Olá! Olá! Olá! Como é que você está?

Depois de meses sem postar nada no blog, passando dias e mais dias com a mentalidade **preciso melhorar meu tema e postar mais artigos** todo dia e deixando de lado, 2017 não vai acontecer isso! Em 2017, tracei como **meta** postar no mínimo dois artigos por mês, exceto janeiro, que já era (rsrsrs), independente da disponibilidade de tempo devido aos trabalhos.

E nada melhor que começar o "ano" falando sobre o meu mais novo queridinho, **Vue.js**!!


## O que é Vue.js?  

Primeiramente vamos aprender a pronúncia correta. Fala-se **view** (/vjuː/) e não **vue**. Ele foi criado pelo [Evan You](https://github.com/yyx990803) em 2014.

O Vue.js é um framework javascript progressivo, para desenvolvermos interfaces web robustas e complexas. Ele é baseado em componentes reativos para aplicações web modernas. Com ele, como já citado, podemos criar aplicações web iterativas, complexas e robustas.

Ele não é considerado um framework full stack, ou seja do back-end ao front-end. Ele é focado **exclusivamente** para a camada da **view**!

Podemos construir uma aplicação complexa facilmente com Vue.js e trabalhar o back-end bem como entendermos, em qualquer stack.

O Vue.js destaca-se entre outros frameworks principalmente pela sua simplicidade e métodos de como trabalhar, baseado em componentes e focado apenas na view da sua aplicação.

Não irei entrar em detalhes do que é e como ele funciona. Para isso, meu amigo [Igor Luiz](https://github.com/Halfeld) e eu estamos desenvolvendo um curso prático de Vue.js pela Webschool.io e estará disponível nas próximas semanas, ainda nesse mês de fevereiro. Então, você não conhece Vue.js? Poderá **estudar de graça**! Assim que as aulas estiverem disponíveis ao público, irei postar um artigo especial aqui no blog! :D

Esse artigo tratará apenas de desenvolvimento de componentes básicos com Vue.js. É necessário ter uma familiriadade básica com Vue.js para dar continuidade na leitura..


## O que são componentes? Como pensar em componentes?  

Tudo são e pode ser um componente(s)! Vejamos a imagem abaixo e vamos analisar com calma.

![Exemplo de Componentes](/assets/img/vue-compoentes.png)

1. O **header**, com o logo e um menu simples é um **COMPONENTE**. No Vue.js, se formos pensar em modularização, poderiamos criar mais 2 componentes, 1 para o logotipo e título e mais 1 para o menu ao lado.  

2. O **main content**, com o texto e botão é um **COMPONENTE**. Aqui, também poderia dividir em mais 3 componentes: título, texto e botão.  

3. O **footer**, com os créditos do projeto é um **COMPONENTE**.  

Um simples exemplo de componentes, **tudo pode ser componente, tudo**! No começo pode ser um pouquinho complicado entender esse conceito, mas depois que entender, vai que vai, filhão. Trabalhar com componentes no Vue.js irá facilitar o desenvolvimento de nossa aplicação em 110%. **O Vue.js é para componentes!**


## vue-cli  

Nesse projeto, utilizei o template do webpack disponibilizado pelo **vue-cli**.  

É uma ferramenta com o intuito de facilitar a criação de projetos. Responsável por criar alguns templates para projetos em Vue.js.

Para instalar o **vue-cli** basta executar o seguinte comando: `npm install -g vue-cli`.

Para visualizar os templates disponíveis basta executar o seguinte comando: `vue list`. E para criar um projeto com um template padrão do **vue-cli**, basta executar o seguinte comando: `vue init nome_template nome_projeto`, por exemplo, `vue init webpack vue-webpack`.

Ele irá instalar o projeto dividido em vários arquivos e pastas, vamos descobrir o que cada pasta possui e qual é sua responsabilidade.

* `build`: possui os arquivos de configuração que irão fazer o build da aplicação;
* `dist`: após realizar `npm run build` o webpack irá compilar o seu projeto para produção, minificando e concatenando todos os arquivos;  
* `config`: alguns arquivos que precisamos alterar uma coisa ou outra em nosso ambiente;
* `src`: é o nosso CÓDIGO FONTE, onde iremos brincar pra caramba.


## Criando os componentes  

Para criar um componente em um projeto Vue.js é muito simples. Basta criarmos um arquivo com o nome do nosso componente, por exemplo `Blog.vue` e importarmos ele no componente global ou especifico, ou nas configurações da nossa rota. O `Blog.vue` possui como código:


```html  
<template>
  <div>
    <h2>Blog</h2>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
h2{
  font-weight: bold;
  color: #c39e88;
}
</style>
```

Onde, dentro das tags:  

* `<template></template>` irá conter o nosso HTML;  
* `<script></script>` irá conter o nosso Javascript, onde a mágica acontece;  
* `<style></style>` irá conter o nosso CSS. Caso você declare *scoped* como no exemplo acima, as declarações poderão ser utilizadas **apenas** nesse componente.

Esse é o padrão para criarmos componentes com Vue.js. Podemos criar quantos componentes quisermos, à vontade! E, é fácil e simples! ;)


## vue-router  

Como eu crio as rotas com Vue.js? No Angular.js eu sei fazer, mas e aqui, manolo? Com o **vue-router**!!

Já sabemos que para desenvolver um projeto em Vue.js é simples, com **vue-router** é mais simples ainda! Também já sabemos que estamos compondo nossa aplicação com componentes. Então, ao adicionarmos o **vue-router** ao nosso projeto, o que precisamos fazer é mapear os nossos componentes para as suas respectivas rotas e deixar que o **vue-router** identifique onde deverá rendelizá-las.

Para instalar o **vue-router** na nossa aplicação, basta executarmos os seguintes comandos: `npm install --save vue-router`.

Feito isso, precisamos informar a nossa aplicação:  

* Quais são as rotas;  
* Informar ao Vue.js que iremos trabalhar/usar o vue-router;  
* Criar as rotas necessárias do projeto;  
* Chamar as rotas na nossa instância Vue.js.


1. Primeiramente, devemos importar o **vue-router** ao projeto, mais especificamente em `main.js`;  
2. Informamos ao Vue.js que iremos utilizar/trabalhar como **vue-router**;  
3. Então, criamos as rotas;  
4. Por fim, chamamos as rotas na nossa instância Vue.js.

Os 4 passos acima, você pode visualizar com mais calma no código abaixo:  

```js  
// Importanto o Vue e vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

// Importanto os componentes da nossa aplicação
import App from './App.vue'
import CcAbout from './components/About.vue'
import CcBlog from './components/Blog.vue'
import CcContact from './components/Contact.vue'

// Informamos ao Vue.js que iremos utilizar/trabalhar como vue-router
Vue.use(VueRouter)

// Então, criamos as rotas
const routes = [
  {
    path: '/about',
    component: CcAbout
  },
  {
    path: '/blog',
    component: CcBlog
  },
  {
    path: '/contact',
    component: CcContact
  }
]

const router = new VueRouter({ routes })

// Por fim, chamamos as rotas na nossa instância Vue.js
new Vue({
  router, // Por fim, chamamos as rotas na nossa instância Vue.js
  // el: '#app',
  render: h => h(App)
}).$mount('#app')
```

Pronto, as nossas rotas estão prontas! Apenas com isso aí? Sim, só isso! Lógico, se seu projeto possui mais rotas, isso vai aumentar. Mas basicamente é assim que criamos rotas com **Vue.js** e **vue-router**! Muito fácil, né?!


## Build for production

Criei os componentes, populei eles com o conteúdo que gostaria; criei as rotas e mapeei os meus componentes. O que falta agora? Verificar o resultado final e publicar!

Se utilizarmos o webpack com vue-cli, temos um NPM Script chamado `npm run build` que irá fazer todo o build do seu projeto, minificando e concatenando os arquivos de seu projeto e deixá-los prontos para colocar em produção. Não precisa instalar **NADA** no servidor, basta copiar esses arquivos e já era! Após o webpack realizar o build, ele irá salvar os arquivos necessários na pasta **dist**!


## Concluindo

Esse projeto foi apenas um pequeno exemplo de desenvolvimento de componentes com **Vue.js** e **vue-router**. É muito simples e muito fácil. E nada melhor do que praticar desenvolvendo projetos pequenos, entendendo as possibilidades e poderes que temos em mãos para utilizarmos. Com o passar do tempo, conseguiremos desenvolver projetos mais complexos, com inúmeros componentes e rotas, com **Vue.js** e **vue-router**.

O artigo foi simples, porém espero ter deixado a minha ideia! Não quis entrar a fundo com os poderes do vue-router, apenas o básico e essencial, assim bem como o básico e essencial de desenvolver componentes com Vue.js.  

Qualquer dúvida, sugestão, reclamação, crítica, por favor, deixe um comentário abaixo que lhe responderei rapidinho!

Você também pode visualizar o resultado final desse projeto através [desse link](http://ednilsonamaral.me/vue-components-example/#/) e ver os códigos completos em seu [repositório oficial](https://github.com/ednilsonamaral/vue-components-example) no GitHub.

Abraços, até mais! =D
