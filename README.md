# PharmaSys API

## 📋 Sobre

Backend do sistema PharmaSys desenvolvido com **NestJS** e **TypeScript**, seguindo princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**. Utiliza **TypeORM** para gerenciamento de banco de dados **PostgreSQL** e **JWT** para autenticação.

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas para cada módulo:

```
modules/
└── [module-name]/
    ├── [module-name].module.ts      # Configuração do módulo NestJS
    ├── application/                  # Casos de uso e DTOs
    │   ├── use-cases/               # Lógica de negócio
    │   └── dtos/                    # Data Transfer Objects
    ├── domain/                       # Entidades e interfaces
    │   ├── entities/                # Entidades do TypeORM
    │   └── interfaces/              # Contratos e interfaces
    └── infrastructure/               # Camada de infraestrutura
        ├── controllers/             # Controllers REST
        │   ├── [module]-protected.controller.ts  # Rotas protegidas
        │   └── [module]-public.controller.ts     # Rotas públicas
        └── repositories/            # Repositórios TypeORM
```

### Padrões Utilizados

- **Clean Architecture**: Separação clara de responsabilidades
- **Domain-Driven Design (DDD)**: Modelagem centrada no domínio
- **Dependency Injection**: Injeção de dependências nativa do NestJS
- **Repository Pattern**: Abstração da camada de dados
- **Use Cases**: Encapsulamento da lógica de negócio
- **DTOs com Validação**: Validação automática com `class-validator`

## 🛠️ Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript tipado
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript e JavaScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - JSON Web Tokens para autenticação
- **[Passport](http://www.passportjs.org/)** - Middleware de autenticação
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Hashing de senhas
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação baseada em decorators
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos

## 📚 Principais Módulos e Rotas

> **Nota:** Todas as rotas são prefixadas com `/api` e requerem autenticação, exceto as marcadas como públicas.

### 🔐 Autenticação (`/api/auth`)

**Rotas Públicas:**

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de novo usuário
- `POST /api/auth/logout` - Logout do usuário

**Rotas Protegidas:**

- `GET /api/auth/profile` - Buscar perfil do usuário logado

### 👥 Usuários (`/api/user`)

**As rotas podem variar de permissões com Operador ou Farmacêutico, mas Admin tem acesso em todas**

- `GET /api/user` - Listar usuários com filtros e paginação
- `GET /api/user/:uuid` - Buscar usuário por UUID
- `POST /api/user` - Criar novo usuário
- `PATCH /api/user/:uuid` - Atualizar dados do usuário
- `PUT /api/user/:uuid` - Atualizar status do usuário
- `DELETE /api/user/:uuid` - Deletar usuário

### 🏥 Empresas (`/api/company`)

- `GET /api/company` - Listar empresas com filtros
- `GET /api/company/:uuid` - Buscar empresa por UUID
- `POST /api/company` - Criar nova empresa
- `PATCH /api/company/:uuid` - Atualizar dados da empresa
- `PUT /api/company/:uuid` - Atualizar status da empresa
- `DELETE /api/company/:uuid` - Deletar empresa

### 💊 Itens/Medicamentos (`/api/item`)

- `GET /api/item` - Listar itens com paginação e filtros
- `GET /api/item/:uuid` - Buscar item por UUID
- `POST /api/item` - Cadastrar novo item
- `PATCH /api/item/:uuid` - Atualizar dados do item
- `PUT /api/item/:uuid` - Atualizar status do item
- `DELETE /api/item/:uuid` - Deletar item

### 📦 Lotes (`/api/batch`)

- `GET /api/batch` - Listar lotes com filtros
- `GET /api/batch/:uuid` - Buscar lote por UUID
- `POST /api/batch` - Criar novo lote
- `PATCH /api/batch/:uuid` - Atualizar dados do lote
- `PUT /api/batch/:uuid` - Atualizar status do lote
- `DELETE /api/batch/:uuid` - Deletar lote

### 📍 Localizações de Estoque (`/api/stock/location`)

- `GET /api/stock/location` - Listar localizações de estoque
- `GET /api/stock/location/:uuid` - Buscar localização por UUID
- `POST /api/stock/location` - Criar nova localização
- `PATCH /api/stock/location/:uuid` - Atualizar dados da localização
- `PUT /api/stock/location/:uuid` - Atualizar status da localização
- `DELETE /api/stock/location/:uuid` - Deletar localização

### 📊 Saldo de Estoque (`/api/stock/balance`)

- `GET /api/stock/balance` - Consultar saldos de estoque com filtros

> Este módulo é somente leitura, os saldos são calculados automaticamente com base nas movimentações.

### 📥 Entradas de Estoque (`/api/inventory/entry`)

- `GET /api/inventory/entry` - Listar entradas de estoque
- `GET /api/inventory/entry/:uuid` - Buscar entrada por UUID
- `POST /api/inventory/entry` - Registrar nova entrada de estoque

> Entradas não podem ser editadas após criação, apenas consultadas.

### 📤 Saídas de Estoque (`/api/inventory/exit`)

- `GET /api/inventory/exit` - Listar saídas de estoque
- `GET /api/inventory/exit/:uuid` - Buscar saída por UUID
- `POST /api/inventory/exit` - Registrar nova saída de estoque

> Saídas não podem ser editadas após criação, apenas consultadas.

### 🔄 Transferências de Estoque (`/api/stock/transfer`)

- `GET /api/stock/transfer` - Listar transferências de estoque
- `GET /api/stock/transfer/:uuid` - Buscar transferência por UUID
- `POST /api/stock/transfer` - Criar nova transferência entre locais

> Transferências não podem ser editadas após criação, apenas consultadas.

### 💊 Dispensação de Medicamentos (`/api/item/dispensation`)

- `GET /api/item/dispensation` - Listar dispensações de medicamentos
- `GET /api/item/dispensation/:uuid` - Buscar dispensação por UUID
- `POST /api/item/dispensation` - Registrar nova dispensação para paciente

> Dispensações não podem ser editadas após criação, apenas consultadas.

### 🧑‍⚕️ Pacientes (`/api/patient`)

- `GET /api/patient` - Listar pacientes com filtros
- `GET /api/patient/:uuid` - Buscar paciente por UUID
- `POST /api/patient` - Cadastrar novo paciente
- `PATCH /api/patient/:uuid` - Atualizar dados do paciente
- `PUT /api/patient/:uuid` - Atualizar status do paciente
- `DELETE /api/patient/:uuid` - Deletar paciente

### 👨‍⚕️ Prescritores (`/api/prescriptor`)

- `GET /api/prescriptor` - Listar prescritores/médicos
- `GET /api/prescriptor/:uuid` - Buscar prescritor por UUID
- `POST /api/prescriptor` - Cadastrar novo prescritor
- `PATCH /api/prescriptor/:uuid` - Atualizar dados do prescritor
- `PUT /api/prescriptor/:uuid` - Atualizar status do prescritor
- `DELETE /api/prescriptor/:uuid` - Deletar prescritor

## 🚀 Como Executar

### 📋 Pré-requisitos

- Node.js 18+ e npm
- PostgreSQL 15+
- Git

### 🐳 Executar com Docker (Recomendado)

Se você está no repositório principal do platform, basta executar:

```bash
docker-compose up -d backend
```

Para executar apenas o backend com Docker:

```bash
# No diretório pharmasys-api
docker build -t pharmasys-api -f Dockerfile.dev .

docker run -d \
  --name pharmasys-api \
  -p 3000:3000 \
  -e DB_HOST=seu_host_db \
  -e DB_PORT=5432 \
  -e DB_USERNAME=seu_usuario \
  -e DB_PASSWORD=sua_senha \
  -e DB_NAME=pharmasys_db \
  -e JWT_SECRET=sua_chave_secreta \
  -v $(pwd):/src/app \
  -v /src/app/node_modules \
  pharmasys-api
```

### 💻 Executar sem Docker

1. **Clone o repositório** (se ainda não clonou)

```bash
git clone https://github.com/Arthu085/pharmasys-api.git
cd pharmasys-api
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=pharmasys_db
DB_SCHEMA=pharmasys
DB_SSL=false

# JWT
JWT_SECRET=sua_chave_secreta_super_segura
JWT_EXPIRES_IN=4h

# Server
PORT=3000

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:5173
```

4. **Crie o banco de dados PostgreSQL**

```bash
# Conecte ao PostgreSQL e execute:
CREATE DATABASE pharmasys_db;
```

5. **Execute as migrations**

```bash
npm run migration:run
```

6. **Execute os seeds (dados iniciais)**

```bash
npm run seed:run
```

7. **Inicie o servidor**

**Modo desenvolvimento (com hot-reload):**

```bash
npm run start:dev
```

**Modo produção:**

```bash
npm run build
npm run start:prod
```

8. **Verifique se está funcionando**

Acesse: `http://localhost:3000/api`

Você deverá ver a resposta da API.

## 🗄️ Migrations e Seeds

### Criar uma nova migration

```bash
npm run migration:generate -- --name=NomeDaMigration
```

### Executar migrations

```bash
npm run migration:run
```

### Reverter última migration

```bash
npm run migration:revert
```

### Executar seeds

```bash
npm run seed:run
```

## 📝 Scripts Disponíveis

```bash
npm run start:dev      # Inicia em modo desenvolvimento
npm run start:prod     # Inicia em modo produção
npm run build          # Compila o projeto
npm run lint           # Executa o linter
npm run format         # Formata o código
npm run typeorm        # CLI do TypeORM
```

## 🔧 Configurações Importantes

### CORS

Configurado em [src/core/config/cors.config.ts](src/core/config/cors.config.ts) para aceitar requisições do frontend.

### Interceptors

- **TransformResponseInterceptor**: Padroniza todas as respostas da API no formato:

```json
{
  "success": true,
  "message": "Mensagem de sucesso",
  "data": { ... }
}
```

### Filters

- **HttpExceptionFilter**: Captura e formata exceções HTTP de forma padronizada.

### Guards

- **JwtAuthGuard**: Protege rotas que requerem autenticação
- **RolesGuard**: Controla acesso baseado em roles (Admin, User, etc.)

### Pipes

- **ValidationPipe**: Valida automaticamente DTOs usando `class-validator`

## 🔐 Autenticação

O sistema utiliza **JWT** (JSON Web Tokens) armazenados em **httpOnly cookies** para maior segurança.

**Fluxo de autenticação:**

1. Usuário faz login em `/api/auth/login` ou se registra em `/api/auth/register`
2. Backend valida credenciais e retorna um token JWT
3. Token é armazenado automaticamente em cookie httpOnly
4. Requisições subsequentes incluem automaticamente o cookie
5. Backend valida o token em rotas protegidas via JwtAuthGuard
6. Token expira em 4 horas (configurável via JWT_EXPIRES_IN)
7. Para encerrar a sessão, usar `/api/auth/logout`

**Permissões (Roles):**

- **ADMIN**: Acesso total ao sistema
- **FARMACEUTICO**: Acesso a operações farmacêuticas
- **OPERADOR**: Acesso a operações básicas de estoque

## 🔗 Links Relacionados

- [Platform Principal](https://github.com/Arthu085/pharmasys-platform)
- [Frontend](https://github.com/Arthu085/pharmasys)

---

Desenvolvido por Arthur Ghizi
