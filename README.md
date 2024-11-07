# Purchaseway Music

Este repositório contém uma aplicação de gerenciamento de playlists de músicas construída com Node.js e TypeScript. A aplicação utiliza diversas tecnologias e bibliotecas, incluindo Express, MongoDB, Mongoose, JSON Web Token, Cookie-Parser, BcryptJS, CORS, EJS, UUID e ZingChart.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Instalação Local](#instalação-local)
  - [Pré-requisitos](#pré-requisitos)
  - [Passos de Instalação](#passos-de-instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Documentação dos Endpoints da API](#documentação-dos-endpoints-da-api)
  - [Músicas](#músicas)
    - [Listar músicas](#listar-músicas)
    - [Adicionar música](#adicionar-música)
    - [Atualizar música](#atualizar-música)
    - [Deletar música](#deletar-música)
  - [Usuários](#usuários)
    - [Listar usuários](#listar-usuários)
    - [Adicionar usuário](#adicionar-usuário)
    - [Login do usuário](#login-do-usuário)
    - [Logout do usuário](#logout-do-usuário)
    - [Obter detalhes do usuário](#obter-detalhes-do-usuário)
    - [Atualizar usuário](#atualizar-usuário)
    - [Deletar usuário](#deletar-usuário)
  - [Funcionalidades do Usuário](#funcionalidades-do-usuário)
    - [Atualizar músicas favoritas](#atualizar-músicas-favoritas)
    - [Atualizar histórico de músicas](#atualizar-histórico-de-músicas)
    - [Atualizar playlist selecionada](#atualizar-playlist-selecionada)
    - [Obter playlists do usuário](#obter-playlists-do-usuário)
    - [Adicionar playlist do usuário](#adicionar-playlist-do-usuário)
    - [Atualizar playlist do usuário](#atualizar-playlist-do-usuário)
    - [Deletar playlist do usuário](#deletar-playlist-do-usuário)
    - [Adicionar música à playlist do usuário](#adicionar-música-à-playlist-do-usuário)
    - [Deletar música da playlist do usuário](#deletar-música-da-playlist-do-usuário)
    - [Atualizar tema do usuário](#atualizar-tema-do-usuário)
    - [Atualizar foto de perfil do usuário](#atualizar-foto-de-perfil-do-usuário)
  - [Playlists](#playlists)
    - [Obter detalhes da playlist](#obter-detalhes-da-playlist)
    - [Selecionar playlist](#selecionar-playlist)
    - [Adicionar playlist](#adicionar-playlist)
    - [Atualizar playlist](#atualizar-playlist)
    - [Deletar playlist](#deletar-playlist)
    - [Deletar playlist e músicas](#deletar-playlist-e-músicas)
    - [Obter dados de todas as músicas e playlists](#obter-dados-de-todas-as-músicas-e-playlists)
- [Ativação de Usuário Admin](#ativação-de-usuário-admin)
  - [Passos para Ativar um Usuário Admin](#passos-para-ativar-um-usuário-admin)
  - [Benefícios dos Usuários Admin](#benefícios-dos-usuários-admin)
- [Capturas de telas](#capturas-de-telas)
  - [Desktop](#desktop)
  - [Mobile](#mobile)
- [Licença](#licença)

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript server-side.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática.
- **Express**: Framework web rápido, flexível e minimalista para Node.js.
- **MongoDB**: Banco de dados NoSQL orientado a documentos.
- **Mongoose**: Biblioteca para modelagem de dados do MongoDB com Node.js.
- **jsonwebtoken**: Implementação de JSON Web Tokens para autenticação.
- **cookie-parser**: Middleware para analisar cookies.
- **bcryptjs**: Biblioteca para hashing de senhas.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **ejs**: Motor de templates para gerar HTML com dados dinâmicos.
- **uuid**: Biblioteca para gerar identificadores únicos universais (UUID).
- **ZingChart**: Biblioteca de gráficos para visualização de dados.

## Funcionalidades

- Autenticação de usuários com JWT.
- Criação, leitura, atualização e exclusão de playlists.
- Adição e remoção de músicas nas playlists.
- Interface web com EJS para interação do usuário.
- Visualização de dados com gráficos utilizando ZingChart.

## Instalação Local

Siga as instruções abaixo para configurar e executar a aplicação localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/) v14 ou superior.
- [MongoDB](https://www.mongodb.com/try/download/community) instalado e em execução.

### Passos de Instalação

1. **Clone o repositório:**

    ```sh
    git clone https://github.com/KevinWillyan456/purchaseway-music.git
    ```

2. **Acesse o diretório do projeto:**

    ```sh
    cd purchaseway-music
    ```

3. **Instale as dependências:**

    ```sh
    npm install
    ```

4. **Configure as variáveis de ambiente:**

    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```env
    # Database connection string for MongoDB
    DATABASE_URL=

    # JWT Secret key for token generation
    JWT_SECRET=

    # Port for the server to run on
    PORT=

    # Youtube API key for fetching videos
    API_YOUTUBE_KEY=
    ```

5. **Execute a aplicação:**

    ```sh
    npm run dev
    ```

    O servidor será iniciado em `http://localhost:3000`.

## Estrutura do Projeto

- **public/**: Arquivos CSS e JavaScript estáticos para o front-end.
- **src/controllers/**: Controladores com a lógica das rotas.
- **src/middleware/**: Middlewares para processamento de requisições.
- **src/models/**: Modelos Mongoose para as entidades do MongoDB.
- **src/utils/**: Funções utilitárias.
- **src/views/**: Arquivos de template EJS.
- **src/database.ts**: Conexão com o banco de dados MongoDB.
- **src/index.ts**: Inicialização do servidor.
- **src/routes.ts**: Definições de rotas da aplicação.

## Documentação dos Endpoints da API

### Músicas

#### Listar músicas

**GET** `/songs`

- Retorna a lista de todas as músicas.
- **Resposta**: JSON com a lista de músicas.

#### Adicionar música

**POST** `/songs`

- Adiciona uma nova música.
- **Middleware**: `eAdminManagerRequest`
- **Requisição**: JSON com os detalhes da música.
- **Resposta**: JSON com a música adicionada.

#### Atualizar música

**PUT** `/songs/:id`

- Atualiza os detalhes de uma música existente.
- **Middleware**: `eAdminManagerRequest`, `getMusic`
- **Requisição**: JSON com os novos detalhes da música.
- **Resposta**: JSON com a música atualizada.

#### Deletar música

**DELETE** `/songs/:id`

- Deleta uma música.
- **Middleware**: `eAdminManagerRequest`, `getMusic`
- **Resposta**: JSON confirmando a exclusão.

#### Incrementar contagem de visualizações

**PUT** `/songs-view-count/:id`

- Incrementa a contagem de visualizações de uma música.
- **Middleware**: `incrementViewCount`
- **Resposta**: JSON confirmando a atualização.

### Usuários

#### Listar usuários

**GET** `/users`

- Retorna a lista de todos os usuários.
- **Middleware**: `eAdminManagerRequest`
- **Resposta**: JSON com a lista de usuários.

#### Adicionar usuário

**POST** `/users`

- Adiciona um novo usuário.
- **Requisição**: JSON com os detalhes do usuário.
- **Resposta**: JSON com o usuário adicionado.

#### Login do usuário

**POST** `/login`

- Realiza o login do usuário.
- **Requisição**: JSON com as credenciais do usuário.
- **Resposta**: JSON com o token de autenticação.

#### Logout do usuário

**POST** `/logout/:id`

- Realiza o logout do usuário.
- **Resposta**: JSON confirmando o logout.

#### Obter detalhes do usuário

**GET** `/users/:id`

- Retorna os detalhes de um usuário específico.
- **Middleware**: `getUser`
- **Resposta**: JSON com os detalhes do usuário.

#### Atualizar usuário

**PUT** `/users/:id`

- Atualiza os detalhes de um usuário específico.
- **Middleware**: `getUser`
- **Requisição**: JSON com os novos detalhes do usuário.
- **Resposta**: JSON com o usuário atualizado.

#### Deletar usuário

**DELETE** `/users/:id`

- Deleta um usuário específico.
- **Middleware**: `getUser`
- **Resposta**: JSON confirmando a exclusão.

### Funcionalidades do Usuário

#### Atualizar músicas favoritas

**PUT** `/songs-favorite/:id`

- Atualiza as músicas favoritas do usuário.
- **Middleware**: `getUser`
- **Requisição**: JSON com a lista de músicas favoritas.
- **Resposta**: JSON confirmando a atualização.

#### Atualizar histórico de músicas

**PUT** `/songs-historic/:id`

- Atualiza o histórico de músicas do usuário.
- **Middleware**: `getUser`
- **Requisição**: JSON com o histórico de músicas.
- **Resposta**: JSON confirmando a atualização.

#### Atualizar playlist selecionada

**PUT** `/playlists-historic/:id`

- Atualiza a playlist selecionada no histórico do usuário.
- **Middleware**: `getUser`
- **Requisição**: JSON com a playlist selecionada.
- **Resposta**: JSON confirmando a atualização.

#### Obter playlists do usuário

**GET** `/users-playlist/:id`

- Retorna as playlists de um usuário específico.
- **Middleware**: `getUser`
- **Resposta**: JSON com as playlists do usuário.

#### Adicionar playlist do usuário

**POST** `/users-playlist/:id`

- Adiciona uma nova playlist para o usuário.
- **Middleware**: `getUser`
- **Requisição**: JSON com os detalhes da playlist.
- **Resposta**: JSON com a playlist adicionada.

#### Atualizar playlist do usuário

**PUT** `/users-playlist/:id/:pid`

- Atualiza uma playlist específica do usuário.
- **Middleware**: `getUser`
- **Requisição**: JSON com os novos detalhes da playlist.
- **Resposta**: JSON com a playlist atualizada.

#### Deletar playlist do usuário

**DELETE** `/users-playlist/:id/:pid`

- Deleta uma playlist específica do usuário.
- **Middleware**: `getUser`
- **Resposta**: JSON confirmando a exclusão.

#### Adicionar música à playlist do usuário

**POST** `/users-playlist-song/:id/:pid`

- Adiciona uma música a uma playlist específica do usuário.
- **Middleware**: `getUser`
- **Requisição**: JSON com os detalhes da música.
- **Resposta**: JSON confirmando a adição.

#### Deletar música da playlist do usuário

**DELETE** `/users-playlist-song/:id/:pid/:sid`

- Deleta uma música específica de uma playlist do usuário.
- **Middleware**: `getUser`
- **Resposta**: JSON confirmando a exclusão.

#### Atualizar tema do usuário

**PATCH** `/users-theme/:id`

- Atualiza o tema do usuário.
- **Middleware**: `getUser`
- **Requisição**: JSON com os detalhes do novo tema.
- **Resposta**: JSON confirmando a atualização.

#### Atualizar foto de perfil do usuário

**PUT** `/users-profile-picture/:id`

- Atualiza a foto de perfil do usuário.
- **Requisição**: URL de imagem.
- **Resposta**: JSON confirmando a atualização.

### Playlists

#### Obter detalhes da playlist

**GET** `/playlists/:id`

- Retorna os detalhes de uma playlist específica.
- **Middleware**: `getUser`
- **Resposta**: JSON com os detalhes da playlist.

#### Selecionar playlist

**GET** `/playlists-select/:id`

- Seleciona uma playlist específica.
- **Middleware**: `getUser`
- **Resposta**: JSON confirmando a seleção.

#### Adicionar playlist

**POST** `/playlists`

- Adiciona uma nova playlist.
- **Middleware**: `eAdminManagerRequest`
- **Requisição**: JSON com os detalhes da playlist.
- **Resposta**: JSON com a playlist adicionada.

#### Atualizar playlist

**PUT** `/playlists/:id`

- Atualiza os detalhes de uma playlist existente.
- **Middleware**: `eAdminManagerRequest`, `getPlaylist`
- **Requisição**: JSON com os novos detalhes da playlist.
- **Resposta**: JSON com a playlist atualizada.

#### Deletar playlist

**DELETE** `/playlists/:id`

- Deleta uma playlist.
- **Middleware**: `eAdminManagerRequest`, `getPlaylist`
- **Resposta**: JSON confirmando a exclusão.

#### Deletar playlist e músicas

**DELETE** `/songs-playlists/:id`

- Deleta uma playlist e todas as músicas associadas.
- **Middleware**: `eAdminManagerRequest`, `getPlaylist`
- **Resposta**: JSON confirmando a exclusão.

#### Obter dados de todas as músicas e playlists

**GET** `/songs-playlists`

- Retorna todos os dados de músicas e playlists.
- **Resposta**: JSON com os dados de músicas e playlists.

## Ativação de Usuário Admin

Atualmente, a ativação de um usuário como admin é feita manualmente através da alteração direta no banco de dados MongoDB.

### Passos para Ativar um Usuário Admin

1. **Acesse o MongoDB**:

    Utilize uma ferramenta como o MongoDB Compass ou conecte-se via linha de comando.

2. **Navegue até a Coleção de Usuários**:

    Selecione a base de dados e acesse a coleção `users`.

3. **Encontre o Usuário**:

    Localize o documento do usuário a ser promovido.

4. **Atualize o Tipo do Usuário**:

    Altere o campo `type` para `"admin"`:

    ```json
    {
        "$set": { "type": "admin" }
    }
    ```

5. **Salve a Alteração**:

    Confirme e salve as mudanças.

### Benefícios dos Usuários Admin

Usuários com tipo `admin` têm acesso a funcionalidades como:

- Acesso à página de configuração (`/config`).
- Permissão para gerenciar playlists e músicas.

## Capturas de telas

### Desktop

![inicio](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/189b8771-f002-4560-ad2c-09c17a97c3f9)
_Tela Inicial_

![home](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/7a13590c-e8a6-411c-a9fa-eed5982e110a)
_Tela Home_

![home-profile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/7b209178-1833-4e06-a644-856fa67ab71f)
_Tela Home - Perfil_

![home-playlists](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/79d7f92f-1735-4075-bb30-7b1921eff20a)
_Tela Home - Playlists_

![config](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/c1746459-86dc-421d-988a-7edabf3947fb)
_Tela Config_

![config-add-playlist](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/1cafd295-ba91-4dea-8e68-fa5eaa828d02)
_Tela Config - Adicionar playlist_

![config-playlist](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/173e1e02-e58a-48b0-a19f-c414535df89a)
_Tela Config - Playlist_

![config-add-song-playlist](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/0312caea-8176-4da4-bd70-8222f4e7e0c4)
_Tela Config - Adicionar música na playlist_

![config-playlist-song](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/502a44a0-c556-4f55-acce-576fd49e52b4)
_Tela Config - Visualizar música na playlist_

![denied](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/1c157a78-7a1d-4aaf-9e91-4a4e726f3815)
_Tela Denied_

![login](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/7785747e-5a04-4ae6-83f0-ef09024f7223)
_Tela Login_

![singup](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/02d3b927-af56-4527-87b0-0f51d0a63314)
_Tela Signup_

### Mobile

![inicio-mobile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/34555d65-bcde-43f3-bd3b-6edd82750a42)
_Tela Inicial Mobile_

![home-mobile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/221747fe-9a8e-41b2-8916-a36e4c5781f6)
_Tela Home Mobile_

![home-profile-mobile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/7ec2b4c1-283f-4bf3-a70a-a324eb2cd0a4)
_Tela Home Mobile - Perfil_

![home-playlists-mobile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/7a6104eb-8034-47fa-a3c2-df273dc747d8)
_Tela Home Mobile - Playlists_

![home-display-mobile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/9897737e-7c4e-4080-994a-89ef398b3730)
_Tela Home Mobile - Display_

![config-mobile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/9983fc9f-292d-4b95-a876-08a522c9cca9)
_Tela Config Mobile_

![config-add-playlist-mobile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/0f6d79e2-e05a-4493-83d2-02c97744ca30)
_Tela Config Mobile - Adicionar playlist_

![config-playlist-mobile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/9c334acf-27f5-405a-9c27-c1dc2000f57e)
_Tela Config Mobile - Playlist_

![config-add-song-playlist-mobile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/27801ebd-97fd-49d3-9067-7283b6a115a9)
_Tela Config Mobile - Adicionar música na playlist_

![config-playlist-song-mobile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/e8fecf4f-e665-4432-bd4a-53b07fcacc8c)
_Tela Config Mobile - Visualizar música na playlist_

![denied-mobile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/6f113a61-15c2-4598-9d0c-64a73840bed4)
_Tela Denied Mobile_

![login-mobile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/28be8f48-bcdf-4803-b774-cb2f5a4c8a32)
_Tela Login Mobile_

![singup-mobile](https://github.com/KevinWillyan456/purchaseway-music/assets/115520107/d2aa8530-7920-4a68-8680-085ddfcfd561)
_Tela Signup Mobile_

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

_Desenvolvido por [Kevin Souza](https://github.com/KevinWillyan456)._
