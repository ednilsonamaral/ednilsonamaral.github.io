---  
layout: post  
comments: true  
title: Padrões de Indentação com EditorConfig
date: 2016-07-29 10:21:00  
image: '/assets/img/indentacao.jpeg'
description: Chega de sofrimentos entre equipes com relação a guerra mortal de TABS VS ESPAÇOS, cada IDE, cada membro da equipe com configurações diferentes e a cada push um arquivo com espaçamentos diferentes.
introduction: Chega de sofrimentos entre equipes com relação a guerra mortal de TABS VS ESPAÇOS, cada IDE, cada membro da equipe com configurações diferentes e a cada push um arquivo com espaçamentos diferentes.
---

Salve salve seres humaninhos, tudo na paz?! :)

Quem aí nunca sofreu ao fazer um *pull* no repositório que está trabalhando e se deparou com uma indentação horrível, certos arquivos com 2 espaços, outros com 4 espaços, outros espaços misturado? Quem nunca?

E o pior disso tudo, quanto mais membros na equipe, maior esse problema será encontrado se não houver um padrão para todos.

Tudo bem, a equipe pode muito bem decidir ter as mesmas configurações nos editores para o projeto X, aí não haveria problemas disso e tal. Mas não tem como automatizar isso?

Sim, tem!!! =D

Aqui entra em cena o [EditorConfig](http://editorconfig.org/). Ele ajuda nós, desenvolvedores, a mantermos um padrão e uma certa consistência nos estilos de nossos códigos, independente da IDE ou do editor de código que trabalhemos.

Em uma equipe de desenvolvimento é comum cada um trabalhar com sua IDE ou editor de código preferido. E cada IDE ou editor de código possui uma configuração diferente.

Mas, se no inicio de nosso projeto, já utilizarmos o EditorConfig, esses problemas acabam.

Vejamos abaixo como usufruir desse queridinho..

Trabalhar com o EditorConfig é muito simples, alguns editores não necessitam de plugin para que ele funcione. Outros já necessitam.


## Instalando o plugin no Atom

No Atom, você pode instalar de duas maneiras:

* Via terminal, com o comando `apm install editorconfig`;  
* Através do menu `Configurações > Instalar > Pesquisar` por `editorconfig`.

Após instalado, basta reiniciar o Atom que ele já funcionará normalmente! :)


## Instalando o plugin no Sublime

O queridinho das américas, Sublime, também é muito simples instalar o plugin do EditorConfig:

* Basta pressionar `CTRL + SHIFT + P` e ir até o *Package Control* e procurar por EditorConfig.

Assim como no Atom, após instalado basta reiniciar o Sublime que irá funcionar! :)


## Instalando o plugin em outros editores de código e IDEs

Atualmente, a infinidade de IDEs e editores de código que possuem plugin para o EditorConfig é um pouquinho grande. Pow, tem plugin até pra Notepad++ e NetBeans.

Basta ir no site oficial e [ver a lista](http://editorconfig.org/#download) de IDEs e editores de código que possuem o plugin, seguir as instruções de instalação e serem felizes! :)


## Usufruindo dessa belezinha

Para usufruir dessa belezinha é muito simples, na raiz do diretório do projeto, basta criarmos um arquivo nomeado `.editorconfig` e setarmos as configurações.

Abaixo, um exemplo de configuração básica dele:

```js
# EditorConfig is awesome: http://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,py}]
charset = utf-8

# 4 space indentation
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified)
[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory
[*.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

Visualizando o código acima, temos:

* Linha 4: seta a configuração de `root = true` para que o editor de código ou IDE aceite as configurações do `.editorconfig` em todos os arquivos, acima das configurações da IDE ou editor de código;  

* Nele, podemos definir como as quebras de linha serão representadas, através dos `lf`, `cr` ou `crlf`;  

* Podemos definir nosso *charset*;  

* No trecho `[*.py]`, definimos que todos os arquivos que possuem a extensão `.py` terão 4 espaços, representados pela **tecla de espaço**;  

* Enquanto nos trechos `[*.js]` e `[{package.json,.travis.yml}]` definimos que todos os arquivos de JS, o `package.json` e o arquivo `travis.yml` irá ter 2 espaços representado pela **tecla de espaço**.


Agora, vamos a um exemplo com outros tipos de arquivo:

```js
# EditorConfig is awesome: http://EditorConfig.org

# top-most EditorConfig file
root = true

# Quebra de linhas
[*]
end_of_line = lf
insert_final_newline = true

# Definindo charset
[*.{js,pug,html}]
charset = utf-8

# Indentação via TAB, para pug e html
[*.{pug,html}]
indent_style = tab
indent_size = 4

# Arquivos JS e CSS
[*.{js,css,styl}]
indent_style = tab
indent_size = 2

# Demais arquivos importantes
[*.json]
indent_style = tab
indent_size = 2
```

Ficou mais claro nesse exemplo? Acho que sim, né! Bom, vamos a explicação desse exemplo:

* Nele, defino o *charset* de arquivos JS, PUG (Jade) e HTML;  

* Defino também, 4 espaços para arquivos PUG (Jade) e HTML, representados pela **tecla de TAB**;

* E para os arquivos de CSS, Stylus e JS, defino 2 espaços, representados pela **tecla de TAB**;  

* Assim como para os demais arquivos com extensão `.json`, defino 2 espaços, representados pela **tecla de TAB**.


Viu como é simples, sem complicações? Agora, você tem o poder em suas mãos. Seja em equipe ou sozinho, o EditorConfig é **indispensável**!

Caso você queira explorar ainda mais os poderes do EditorConfig, basta entrar no site e dar uma olhada na [documentação oficial](http://editorconfig.org/) dele.


## Concluindo

O poder que o EditorConfig nos fornece pode parecer muito simples, mas não é. Ele em si, é simples. Porém o que podemos fazer com ele é de muito valor para nossos projetos de desenvolvimento.

Sua configuração é muito simples, em poucos minutos você padroniza os espaçamentos com facilidade. A curva de aprendizado para utilizar o EditorConfig é muito baixa.

Hoje em dia, a cada novo projeto que estou/contribuo, um dos primeiros arquivos que crio é o `.editorconfig`.

Não perca tempo, comece a usar você também! =D

Caso tenha alguma dúvida, sugestão, reclamação, please, entre em contato comigo, através de um simples comentário ou através das redes sociais.

Se gostou ou não, compartilhe com seus amigos front-end e desenvolvedores em geral! =p

É isso aí pessoal, vaaleu, até mais! =D
