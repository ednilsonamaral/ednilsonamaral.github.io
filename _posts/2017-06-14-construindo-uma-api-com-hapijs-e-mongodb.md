---  
layout: post  
comments: true  
title: Construindo uma API com Hapi.js e MongoDB
date: 2017-06-14 19:00:00
image: '/assets/img/hapi-wallpaper.png'
description: Projeto desenvolvimento exclusivamente para o Curso da Webschool.io de Vue.js na Prática, para consumirmos essa API durante as aulas.
introduction: Projeto desenvolvimento exclusivamente para o Curso da Webschool.io de Vue.js na Prática, para consumirmos essa API durante as aulas.
---

Olá! Olá! Olá! Olá! Como é que você está?

Hoje, nesse pequenino artigo, iremos aprender como construir uma API com Hapi.js, um novo framework para Node.js, além de utilizarmos o MongoDB como nosso banco de dados, além de realizarmos o deploy no Heroku e MLab. Então, borá codar!


## O que é esse Hapi.js?

Fazendo uso da própria definição do Hapi.js, ele é:

> A rich framework for building applications and services

Ou seja, é um rico framework Node.js para criarmos aplicações e serviços! Ele é similar ao Express.js, porém, um pouco mais flexível. Ele é open source, desenvolvido por Eran Hammer, Arquiteto de Plataforma Móvel no Walmart e responsável pela construção de inúmeras APIs móveis para o Walmart.

O Hapi.js foi desenvolvido principalmente com o objetivo e resposta para os problemas enfrentados pelos desenvolvedores que utilizavam o Express.js.

Se fizermos uma comparação rápida entre Express.js vs Hapi.js, inúmeros desenvolvedores afirmam que o Hapi.js é uma escolha sábia. Eis os motivos:

- O Hapi.js usa um mecanismo de roteamento diferente, onde podemos fazer pesquisar mais ráidas, levando em consideração a ordem de registro;  
- A sua curva de aprendizado é baixíssima, comparada ao Express.js;  
- Porém, ambos, Express.js e Hapi.js são bons para resolvermos nossos problemas.

Vai de você, caro desenvolvedor, testar o Express.js e o Hapi.js, e concluir qual será melhor para você e sua aplicação!

Ah, a documentação oficial do Hapi.js possui tradução para o português, [nesse link](https://hapijs.com/tutorials?lang=pt_BR).


## Iniciando o Projeto

A API que iremos construir hoje é para um ecommerce. Iremos construir uma collection de Categorias e Produtos.

Supondo que já tenhamos criado um novo projeto com `npm init`, vamos instalar nossas dependências, com o comando a seguir: `npm install --save hapi mongoose nodemon moment`.

O Mongoose será o responsável por manipularmos nossas collections e documentos no MongoDB, enquanto o Nodemon servirá para darmos o *start* em nosso servidor. Já o Moment.js iremos trabalhar com as datas.


## Estrutura de Diretórios e Arquivos

Iremos desenvolver nossa aplicação modularizada, conforme exemplo abaixo:

```  
| config  
...| db.js  
| helpers  
...| constants.js  
| models  
...| Categorie.js  
...| Product.js  
| routes  
...| categorie.js  
...| product.js
| app.js
```

## Levantando o servidor

Primeiro de tudo, precisamos levantar o nosso servidor em Hapi.js, para isso, iremos criar um arquivo na raiz do projeto nomeado `app.js`. O nome desse arquivo fica a seu critério.

1. Importar o Hapi;  
2. Chamar uma função nativa dele, o `Hapi.Server()`;  
3. Criar as configurações de conexão do nosso servidor;  
4. Dar o *start* em nosso servidor.


```js  
const Hapi = require('hapi')
const server = new Hapi.Server()

server.connection({
	host: process.env.HOST || '0.0.0.0',
	port: process.env.PORT || 3000,
	routes: { cors: true }
})

server.start((err) => {
	if (err) {
		throw err
	}

	console.log(`Servidor rodando em ${server.info.uri}`)
})
```

Nas configurações de conexão do nosso servidor, definimos o *host*, pegando de `process.env.HOST` **OU** `0.0.0.0`. Irá fará com que o servidor funcione localmente, via `localhost`, ou então, publicado no Heroku, por exemplo. Para a porta, segue a mesma lógica. Já em `routes: { cors: true }` ativado o CORS em nossa API.

Para dar o start em nosso servidor, apenas chamamos essa função `server.start()`. Ele já sabe que se houver configurações de conexão, irá vir de `server.connection`, por isso é que não precisamos passar o `server.connection` como parâmetro para o `server.start()`.


## Criando a configuração do banco de dados

Pensando em desenvolver aplicações modularizadas, todas as configurações necessárias para o servidor, iremos criar dentro da pasta `./config`. A configuração de nosso banco de dados não será diferente, iremos criar um arquivo `./config/db.js`:

```js  
const Mongoose = require('mongoose')

const dbName = 'mongodb://localhost/webschool-vuejs-ecommerce-api'

Mongoose.connect(dbName)
Mongoose.Promise = global.Promise
const db = Mongoose.connection

db.on('error', console.error.bind(console, 'Erro de conexão!'))

db.once('open', () => {
	console.log('Conexão com banco de dados realizada com sucesso!')
})

exports = db
```

Ao definirmos nossas configurações de banco de dados, precisamos importá-la em nosso `./app.js`:

```js  
const db = require('./config/db')
```


Antes de partirmos para a etapa de definirmos os schemas, iremos criar um *helper*, chamado de `./helpers/constants.js`. Nesse arquivo iremos criar algumas **constantes** para utilizarmos em toda a nossa API e evitarmos de repetir código, com isso iremos facilitar a manutenção do mesmo.

```js  
module.exports = {
  'URI': '/api/v1'
}
```

A primeira constante que criamos é a URI. Nela poderemos definir parte da nossa URI, e, quando precisarmos alterar iremos fazer isso apenas nesse arquivo, economizando tempo demais de manutenção.

Criado esse arquivo de helper, basta importarmos ele em nosso `./app.js`:

```js  
const Constants = require('./helpers/constants')
```


## Definindo os schemas

Agora iremos definir os nossos schemas, para as **Categorias** e **Produtos**. Notem que as nomenclaturas dos códigos serão realizadas em inglês, pois é uma boa prática que venho seguindo nos últimos projetos e incentivo vocês demais a codarem em inglês. Assim, qualquer dev, no mundo todo, pode contribuir com seu código, até mesmo visualizá-lo e/ou utilizá-lo em algum projeto.

Vamos definir nosso schema de **Categorias**:


`./models/Categorie.js`  

```js  
const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const _schema = {
		name: { type: String, required: true, unique: true }
	, status: { type: Boolean, required: true }
	, created_at: Date
	, updated_at: Date
}

const CategorieSchema = new Schema(_schema)

const Model = Mongoose.model('Categorie', CategorieSchema)

module.exports = Model
```

Criamos nosso schema com alguns campos básicos, de String e Boolean, além de já exportamos ele como um Model do Mongoose, pronto para ser usados em nossas rotas.

Agora, vamos definir nosso schema de **Products**:


`./models/Product.js`  

```js  
const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const _schema = {
		name: { type: String, required: true, unique: true }
	, id_categorie: { type: Schema.Types.ObjectId, required: true, ref: 'Categorie' }
	, price: { type: Number, required: true }
	, qtd: { type: Number, min: 0, max: 999 }
	, status: { type: Boolean, required: true }
	, created_at: Date
	, updated_at: Date
}

const ProductSchema = new Schema(_schema)

const Model = Mongoose.model('Product', ProductSchema);

module.exports = Model
```


## Criando as rotas

Definido nossos schemas e já os tendo exportados como Models do Mongoose, estamos prontos para prosseguirmos e criarmos as nossas rotas.


### Categorias

As primeiras rotas que iremos criar são as de **Categorias**. Primeiramente, precisamos importar as bibliotecas e serviços que iremos utilizar durante a criação de nossas rotas.

```js  
const CONSTANTS = require('../helpers/constants')
const URI = `${CONSTANTS.URI}/categories`
const CategorieModel = require(`../models/Categorie`)

const Moment = require('moment')
const getCurrentDateWithoutTimezone = Moment().format('YYYY-MM-DDTHH:mm:ss')
```

Importamos também o **Moment.js** para tratar as nossas datas. Então, já deixaremos preparados a `getCurrentDateWithoutTimezone` que irá pegar a data atual, não do servidor, mas sim horário local, sem timezone. Muitas APIs desenvolvidas pegam a data do servidor e isso pode ser diferente do horário da região de onde o usuário está conectado. Isso pode trazer problemas. E, para não termos complicações e gerar inúmeras linhas de código para tratarmos as datas, utilizamos o [Moment.js]() que já cuida disso, facilmente. Agora, com o `getCurrentDateWithoutTimezone` podemos automatizar os campos `created_at` e `updated_at`.

Todas as rotas de **Categorias** precisaremos exportá-las para serem acessadas de nosso `./app.js`, então, iremos codar as nossas rotas dentro de um `module.exports`, sendo um array de objetos.

```js  
module.exports = [
	// Get all categories
	{
		method: 'GET',
		path: URI,
		handler: (req, reply) => {
			CategorieModel.find((error, data) => {
				if (error) {
					reply({
						error: true,
						data: error,
						statusCode: 401,
						statusText: 'NOK',
					}).code(401)
				} else {
					reply({
						error: false,
						data: data,
						statusCode: 200,
						statusText: 'OK'
					}).code(200)
				}
			})
		}
	}
]
```

O método acima é o famoso **GET**, declarado em `method`, irá retornar todas as categorias cadastradas.

Em `path` definimos qual é a URL da nossa rota. Chamamos `URI` pois já definimos a mesma lá no inicio do arquivo, visto que iremos utilizar em todas as rotas de **Categorias**. E, pensando em deixar o código mais fácil para manutenções possível, atribuir uma `const` para nossa *URI* é de extrema importância e boa prática a ser seguida.

Já o `handler` é o nosso método manipulador, uma função que aceita dois parâmetros, o `request` e `reply.` O parâmetro `request` já é conhecido por quem desenvolve APIs, ele é um objeto com todos os detalhes referentes a solicitação do usuário, como parâmetros, carga, informações de autenticação, *headers*, etc. Podemos declarar o `request` em nosso `handler` tanto como `req` ou propriamente `request`, ambas as formas ele irá funcionar corretamente.

O parâmetro `reply` é a resposta da nossa requisição. Nele, podemos mostrar um JSON seguido do `statusCode` da requisição com `.code(200)`. Dentro da nossa função do `handler`, fazemos um **.find** através mo Mongoose em `CategorieModel` que é o model da **Categoria**. Então, lançamos uma condição simples, onde se houver `error` ele dá como `reply` uma coisa, caso contrário, o `reply` será diferente. Essa condição iremos utilizar de forma idêntica nas outras rotas.

Após o nosso `GET`, vamos criar as rotas de `POST`, `PUT` e `DELETE`, além, é claro, de mais um `GET` passando o `_id` como parâmetro.

```js  
// Get categorie by id
{
	method: 'GET',
	path: URI + `/{id}`,
	handler: (req, reply) => {
		CategorieModel.findById(req.params.id, (error, data) => {
			if (error) {
				reply({
					error: true,
					data: error,
					statusCode: 401,
					statusText: 'NOK',
				}).code(401)
			} else {
				reply({
					error: false,
					data: data,
					statusCode: 200,
					statusText: 'OK'
				}).code(200)
			}
		})
	}
},

// Create a new categorie
{
	method: 'POST',
	path: URI,
	handler: (request, reply) => {
		const categorie = new CategorieModel({
				name: request.payload.name
			, status: request.payload.status
			, created_at: getCurrentDateWithoutTimezone
		})

		categorie.save((error, data) => {
			if (error) {
				if (error.index == 0) {
					reply({
						error: true,
						data: 'Já existe uma categoria registrada com esse nome!',
						statusCode: 403,
						statusText: 'NOK',
					}).code(403)
				} else {
					reply({
						error: true,
						data: error,
						statusCode: 401,
						statusText: 'NOK',
					})
				}
			} else {
				reply({
					error: false,
					data: data,
					message: 'Nova categoria cadastrada com sucesso!',
					statusCode: 201,
					statusText: 'OK'
				}).code(201)
			}
		})
	}
},

// Update a categorie by id
{
	method: 'PUT',
	path: URI + `/{id}`,
	handler: (request, reply) => {
		const _id = { _id: request.params.id }

		const categorie = {
				name: request.payload.name
			, status: request.payload.status
			, updated_at: getCurrentDateWithoutTimezone
		}

		CategorieModel.update(_id, categorie, { multi: false }, (error, data) => {
			if (error) {
				reply({
					error: true,
					data: error,
					statusCode: 401,
					statusText: 'NOK',
				}).code(401)
			} else {
				reply({
					error: false,
					data: data,
					message: 'Categoria editada com sucesso!',
					statusCode: 204,
					statusText: 'OK'
				}).code(204)
			}
		})
	}
},

// Delete a categorie by id
{
	method: 'DELETE',
	path: URI + `/{id}`,
	handler: (request, reply) => {
		const _id = { _id: request.params.id }

		CategorieModel.remove(_id, (error, data) => {
			if (error) {
				reply({
					error: true,
					data: error,
					statusCode: 401,
					statusText: 'NOK',
				}).code(401)
			} else {
				reply({
					error: false,
					data: data,
					message: 'Categoria deletada com sucesso!',
					statusCode: 200,
					statusText: 'OK'
				}).code(200)
			}
		})
	}
}
```

As demais rotas, independente do método, seguem o mesmo padrão da nossa primeira rota, o `GET`, uma ou outra coisa que será diferente.

Note que nos métodos de `PUT`, `DELETE` e nosso segundo `GET`, o nosso `path` está diferente. Ele está `path: URI + '/{id}'`, ou seja, estamos passando o `id` como parâmetro para a nossa requisição. E para "pegar" esse parâmetro e utilizá-lo nas consultas, basta utilizarmos o seguinte recurso `request.params.id`.

Visando melhorar cada vez mais nossos códigos e deixá-lo o mais modularizado possível, ainda podemos criar um `helper` para as funções que usaremos `reply`, de error e sucesso, assim não precisaremos fazer isso em toda rota, basta chamarmos a função que fará o resto. Porém, não farei isso aqui, deixarei isso como um desafio para vocês, caros amiguinhos!

Pronto, temos as rotas de **Categorias** criadas com sucesso, de uma forma simples.


### Produtos

Agora, só precisamos criar nossas rotas de **Produtos** que já podemos brincar com a nossa API. A lógica é a mesma que utilizamos na criação das rotas de **Categorias**, então, ao invés de repetir novamente as explicações, segue os códigos das rotas.

```js  
const CONSTANTS = require('../helpers/constants')
const URI = `${CONSTANTS.URI}/products`
const ProductModel = require(`../models/Product`)

const Moment = require('moment')
const getCurrentDateWithoutTimezone = Moment().format('YYYY-MM-DDTHH:mm:ss')

module.exports = [
	// Get all products
	{
		method: 'GET',
		path: URI,
		handler: (req, reply) => {
			ProductModel.find((error, data) => {
				if (error) {
					reply({
						error: true,
						data: error,
						statusCode: 401,
						statusText: 'NOK',
					}).code(401)
				} else {
					reply({
						error: false,
						data: data,
						statusCode: 200,
						statusText: 'OK'
					}).code(200)
				}
			})
		}
	},

	// Get product by id
	{
		method: 'GET',
		path: URI + `/{id}`,
		handler: (req, reply) => {
			ProductModel.findById(req.params.id, (error, data) => {
				if (error) {
					reply({
						error: true,
						data: error,
						statusCode: 401,
						statusText: 'NOK',
					}).code(401)
				} else {
					reply({
						error: false,
						data: data,
						statusCode: 200,
						statusText: 'OK'
					}).code(200)
				}
			})
		}
	},

	// Create a new product
	{
		method: 'POST',
		path: URI,
		handler: (request, reply) => {
			const product = new ProductModel({
					name: request.payload.name
				, id_categorie: request.payload.id_categorie
				, price: request.payload.price
				, qtd: request.payload.qtd
				, status: request.payload.status
				, created_at: getCurrentDateWithoutTimezone
			})

			product.save((error, data) => {
				if (error) {
					if (error.index == 0) {
						reply({
							error: true,
							data: 'Já existe um produto registrado com esse nome!',
							statusCode: 403,
							statusText: 'NOK',
						}).code(403)
					} else {
						reply({
							error: true,
							data: error,
							statusCode: 200,
							statusText: 'NOK',
						})
					}
				} else {
					reply({
						error: false,
						data: data,
						message: 'Novo produto cadastrado com sucesso!',
						statusCode: 201,
						statusText: 'OK'
					}).code(201)
				}
			})
		}
	},

	// Update a product by id
	{
		method: 'PUT',
		path: URI + `/{id}`,
		handler: (request, reply) => {
			const _id = { _id: request.params.id }

			const product = {
					name: request.payload.name
				, id_categorie: request.payload.id_categorie
				, price: request.payload.price
				, qtd: request.payload.qtd
				, status: request.payload.status
				, updated_at: getCurrentDateWithoutTimezone
			}

			ProductModel.update(_id, product, { multi: false }, (error, data) => {
				if (error) {
					reply({
						error: true,
						data: error,
						statusCode: 401,
						statusText: 'NOK',
					}).code(401)
				} else {
					reply({
						error: false,
						data: data,
						message: 'Produto editado com sucesso!',
						statusCode: 204,
						statusText: 'OK'
					}).code(204)
				}
			})
		}
	},

	// Delete a product by id
	{
		method: 'DELETE',
		path: URI + `/{id}`,
		handler: (request, reply) => {
			const _id = { _id: request.params.id }

			ProductModel.remove(_id, (error, data) => {
				if (error) {
					reply({
						error: true,
						data: error,
						statusCode: 401,
						statusText: 'NOK',
					}).code(401)
				} else {
					reply({
						error: false,
						data: data,
						message: 'Produto deletado com sucesso!',
						statusCode: 200,
						statusText: 'OK'
					}).code(200)
				}
			})
		}
	}
]
```


## Efetuando testes locais com Postman

Agora sim, temos uma API pronta para testarmos. Se executarmos no terminal o comando `nodemon app.js`, já estando com o serviço do `mongod` em execução, teremos o seguinte resultado:

![Imagem do terminal executando e levantando o servidor](/assets/img/nodemon_app_ecommerce_api.png)


Vamos então, utilizar o Postman para efetuarmos testes em nossas rotas, que criamos acima:

![Exemplo de GET Categorias via Postman](/assets/img/get_all_categories_ecommerce_api.png)

No exemplo acima, estamos fazendo um `GET` para retornar todas as categorias cadastradas em nosso banco de dados. Vamos verificar agora, como ficaria um `POST` para criarmos uma nova categoria.

![Exemplo de POST Categorias com registro duplicado via Postman](/assets/img/post_categorie_erro_ecommerce_api.png)

Vale a pena ressaltar aqui, que, tanto em `POST` e/ou `PUT` podemos enviar o *body* como um `form-data` ou `json` através do *raw*.

No exemplo desse `POST` estamos enviando uma nova categoria com o mesmo nome de uma já existente em nosso banco de dados. E, como definimos em nosso model lá no ínicio o nome é `unique: true`, ou seja, deverá ser único. Por isso, como já tratamos isso em nossas rotas, ele devolve uma mensagem amigável ao invés do erro gigantesco do banco. Já o campo `status` é do tipo `Boolean`, nele declaramos 1 para categorias **ativadas** e 0 para categorias **desativadas**.

Esses erros, como o de registro duplicado, poderiamos muito bem tratar com o Mongoose, através de suas validações e tudo mais. Porém, penso que dessa forma perderiamos em performance na nossa API, então já tratamos dela na própria API. Isso vai de desenvolvedor para desenvolvedor, se você preferir tratar os erros através do Mongoose, ok, sem problemas. Continuemos..

Mas e como ficaria um `POST` sem erros? Bâmo vê..

![Exemplo de POST Categorias via Postman](/assets/img/post_categorie_ecommerce_api.png)


Já o `PUT` ficaria da seguinte forma:

![Exemplo de PUT Categorias via Postman](/assets/img/put_categorie_ecommerce_api.png)

O `GET` *by id* e `DELETE` basta passar na URL da requisição o `_id` da categoria desejada que irá retornar os da categoria ou deletar a mesma, respectivamente.

![Exemplo de GET by id Categorias via Postman](/assets/img/get_by_id_categorie_ecommerce_api.png)

![Exemplo de DELETE Categorias via Postman](/assets/img/delete_categorie_ecommerce_api.png)


## Conclusão

Prontinho, temos nossa API desenvolvida com Hapi.js e MongoDB para consumirmos em um aplicativo web e/ou mobile. Agora, você pode realizar o *deploy* para produção no Heroku, DigitalOcean, AWS, Google Cloud, *whatever*, que irá funcionar perfeitamente.

Desenvolvemos uma API simples, aplicando os conceitos mais básicos do Hapi.js, porém conceitos importantes que te deixará preparado para desenvolver APIs de mais simples à robustas e copmlexas com Hapi.js e MongoDB.

O artigo em si ficou um pouco extenso, porém deu para mostrar a vocês a ideia de trabalharmos com essa belezinha do Hapi.js. Tem coisas nesses códigos que ainda podemos melhorar, modularizar mais algumas coisinhas, criar mais alguns *helpers*, etc. Agora é com você, de desenvolver uma API com Hapi.js e MongoDB.

Todos os códigos que utilizei nesse artigo pode ser encontrado [nesse repositório](https://github.com/ednilsonamaral/vuejs-ecommerce-api) no GitHub. Se vocês gostaram, dêem um star, fiquem à vontade para sugerir melhorias de códigos, PRs são aceitos! Também, já publiquei essa API no Heroku e o banco de dados na MLab.

Não perca tempo, comece a usar você também o Hapi.js e nos conte como foi a experiência. Caso tenha alguma dúvida, sugestão, reclamação, please, entre em contato comigo, através de um simples comentário ou via redes sociais. Se gostou ou não, compartilhe com seus amiguinhos desenvolvedores! =p

É isso aí pessoal, vaaleu, até mais! =D
