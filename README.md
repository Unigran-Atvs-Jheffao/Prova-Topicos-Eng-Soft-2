# 📦 Aplicação Node.js + PostgreSQL (Dockerizada)

Este projeto é uma **API REST** simples em **Node.js + Express** que se conecta a um banco de dados **PostgreSQL**, tudo rodando dentro de containers Docker.

## 🚀 Funcionalidades

- Criar tabela `users` automaticamente (se não existir).
- Endpoints REST para:
  - **Listar usuários** (`GET /users`)
  - **Inserir usuário** (`POST /users`)
  - **Atualizar usuário** (`PUT /users/:id`)
  - **Remover usuário** (`DELETE /users/:id`)

---

## 🐳 Executando com Docker Compose

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/)

### Subir os containers

Na raiz do projeto, execute:

```bash
docker-compose up --build
```

Isso vai subir dois serviços:

- **api** → aplicação Node.js rodando na porta `3000`
- **db** → PostgreSQL 15 rodando na porta `5432`

### Encerrar os containers

```bash
docker-compose down
```

Se quiser também apagar volumes/dados:

```bash
docker-compose down -v
```

---

## ⚙️ Configuração da API

A API usa variáveis de ambiente definidas no arquivo `.env`.  
Crie um arquivo `.env` dentro da pasta `app/` com o seguinte conteúdo:

```env
PORT=3000
DB_USER=prova
DB_PASS=prova
DB_NAME=main
DB_HOST=db
```

> ⚠️ Note que o `DB_HOST` deve ser `db`, que é o nome do serviço no `docker-compose.yml`.

---

## 📡 Endpoints da API

### `GET /`
Retorna mensagem de status.

### `GET /users`
Lista todos os usuários.

### `POST /users`
Cria um novo usuário.  
Exemplo de body (JSON):

```json
{
  "name": "Maria Silva",
  "email": "maria@example.com"
}
```

### `PUT /users/:id`
Atualiza usuário pelo **ID**.  
Exemplo:

```json
{
  "name": "Maria Atualizada",
  "email": "maria@newmail.com"
}
```

### `DELETE /users/:id`
Remove usuário pelo **ID**.

---

## 🗃️ Banco de Dados

O banco PostgreSQL é configurado com:

- **Usuário:** `prova`
- **Senha:** `prova`
- **Banco:** `main`
- **Porta:** `5432`

Os dados são persistidos em um volume Docker chamado `db_data`.

---

## 📂 Estrutura do Projeto

```
.
├── app/
│   ├── index.js        # Código principal da API
│   ├── package.json
│   ├── .env.example    # Exemplo de variáveis de ambiente
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## ✅ Testando com cURL

Criar usuário:
```bash
curl -X POST http://localhost:3000/users   -H "Content-Type: application/json"   -d '{"name":"João","email":"joao@example.com"}'
```

Listar usuários:
```bash
curl http://localhost:3000/users
```

Atualizar usuário:
```bash
curl -X PUT http://localhost:3000/users/1   -H "Content-Type: application/json"   -d '{"name":"João Alterado","email":"joao@novo.com"}'
```

Remover usuário:
```bash
curl -X DELETE http://localhost:3000/users/1
```

---

⚡ Agora tua API está pronta para rodar em containers e conversar com o PostgreSQL!
