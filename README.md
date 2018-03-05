# Chatty API

**Pré-requisitos:**

- Você deve ter instalado o MongoDB
- Você deve ter instalado o NodeJS a partir da versão 8.9.x

_Obs¹:_ Caso já tenha uma versão anterior, instale o ([nvm](https://gist.github.com/d2s/372b5943bce17b964a79)) 
vai te ajudar a trocar de versão de maneira humana.

_Obs²:_ Deve ter o MongoDB iniciado na sua maquina e caso ele tenha senha, troque a string de conexão 
colocando a sua senha no arquivo config/config.js, deve se parecer com isso:
```
mongodb://username:password@host:port/chatty
```

_Obs³:_ O banco é criado automaticamente a medida que dados vão sendo inseridos usando o NODE_ENV como sufixo, 
caso não tenha NODE_ENV, não tem problema o default e _dev, você pode conferir mais sobre isso em config/config.js

_Obs Final_: Troquei o .yaml do swagger para a url: localhost:3000, então só dar o **make publish-documentation** 
dentro da raiz do projeto


**Instalando o projeto:**

- faça o clone do projeto e entre na pasta dele
- npm install
- node app.js

Feito! Estará rodando na porta 3000
