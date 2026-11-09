# Aqua Adopt | Monitoramento e Conservação Marinha

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Aplicação Full Stack que conecta dados e preservação da vida marinha. O
**Aqua Adopt** reúne animais marinhos em um mapa interativo, perfis
detalhados e um sistema de apadrinhamento simbólico.

🔗 **[Veja o projeto no ar](https://aqua-adopt-8zmy.vercel.app)**

> ⚠️ **Projeto de demonstração.** Os animais, as posições no mapa e os
> apadrinhamentos são **fictícios e não representam monitoramento real**.
> Nenhuma doação é processada. O roadmap abaixo descreve como o projeto
> evolui para usar dados científicos abertos e verificáveis.

## 💡 A ideia por trás do projeto

Nasceu da vontade de ir além do "CRUD" tradicional: unir uma experiência
visual marcante, boa engenharia e um propósito, a conservação dos oceanos.
O projeto também é meu laboratório para boas práticas de um repositório
open source de verdade: migrations versionadas, seeds seguros, testes e
documentação.

## 🚀 Diferenciais técnicos

- **Next.js (App Router):** Server Components para performance e SEO,
  Client Components só onde há interatividade.
- **Server Actions:** mutações e formulários no servidor, sem rotas de API
  tradicionais.
- **Mapas com Leaflet:** posições dos animais plotadas a partir do banco.
- **PostgreSQL + Prisma:** modelagem relacional, tipagem de ponta a ponta e
  migrations versionadas.
- **Ambientes isolados:** Postgres em Docker para desenvolvimento e Neon em
  produção, com seed que se recusa a rodar fora do banco local.

## 🛠️ Stack

**Frontend / UI**

- Next.js 16 e React 19
- TypeScript
- Tailwind CSS 4
- Motion (animações)
- Leaflet e React-Leaflet (mapas)
- Lucide React (ícones)

**Backend / Dados**

- Node.js
- PostgreSQL (Docker em desenvolvimento, Neon em produção)
- Prisma ORM (schema, migrations e consultas)
- Vercel (deploy e hospedagem)

## 📌 Funcionalidades atuais

- [x] **Landing page** com visual imersivo do oceano
- [x] **Mapa** com a posição dos animais cadastrados (dados de demonstração)
- [x] **Perfis dinâmicos** em `/[id]` para cada animal
- [x] **Apadrinhamento simbólico** gravado no banco (sem pagamento)
- [~] **Reporte de avistamentos:** formulário de interface; a persistência
  chega com o item F1.1 do roadmap

## 🗺️ Roadmap

O planejamento completo, com esforço e dependências de cada item, está em
[`docs/FEATURES.md`](docs/FEATURES.md).

| Fase | Foco |
|---|---|
| 0 | Fundação e honestidade: documentação, banco e migrations, qualidade mínima, i18n |
| 1 | Núcleo funcional: avistamentos reais com moderação, autenticação, painel admin |
| 2 | Dados e telemetria: trajetórias, mapa v2, dados abertos (OBIS, GBIF, NOAA, MERMAID), API pública |
| 3 | Experiência cinematográfica: oceano 3D, scroll storytelling, conteúdo educativo |
| 4 | Open source de verdade: testes, observabilidade, segurança, comunidade |

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js 20 ou superior
- Docker com Docker Compose

### Primeira configuração

```bash
git clone https://github.com/nunoguerra1/aqua-adopt.git
cd aqua-adopt
cp .env.example .env     # no PowerShell: Copy-Item .env.example .env
npm install              # também gera o Prisma Client (postinstall)
npm run db:up            # sobe o Postgres local e espera ficar saudável
npm run db:reset         # aplica as migrations e popula com o seed
npm run dev
```

Acesse `http://localhost:3000`.

## 🗄️ Banco de dados

O projeto usa **PostgreSQL** com **Prisma**. Em desenvolvimento o banco roda
em Docker; em produção ele fica no **Neon**. Os dois ambientes nunca
compartilham dados.

### Variáveis de ambiente

| Variável | Uso | Local | Produção (Neon) |
|---|---|---|---|
| `DATABASE_URL` | Conexão do app (Prisma Client) | Postgres do Docker | URL **pooled** (host com `-pooler`) |
| `DIRECT_URL` | Conexão do Prisma CLI (migrations) | Postgres do Docker | URL **direta** (host sem `-pooler`) |

A URL de produção fica **somente** nas variáveis de ambiente da Vercel.
Nunca coloque credenciais de produção na `.env` local nem em commits.

### Scripts

| Comando | O que faz |
|---|---|
| `npm run db:up` | Sobe o Postgres local (Docker) |
| `npm run db:down` | Para o Postgres, mantendo os dados |
| `npm run db:migrate` | Cria e aplica uma migration após mudar o `schema.prisma` |
| `npm run db:deploy` | Aplica migrations pendentes (uso em produção) |
| `npm run db:seed` | Insere os animais de exemplo (idempotente) |
| `npm run db:reset` | Apaga o banco local, reaplica migrations e roda o seed |
| `npm run db:studio` | Abre o Prisma Studio |

### Alterando o schema

1. Edite `prisma/schema.prisma`.
2. Rode `npm run db:migrate -- --name descricao_curta`.
3. Revise o SQL gerado em `prisma/migrations/`.
4. Faça commit do schema e da pasta da migration juntos.

### Aplicando migrations em produção

Migrations **não** rodam automaticamente no deploy. Isso é intencional: uma
migration que falha no meio de um deploy deixaria o site fora do ar.

1. Crie uma *branch* de backup do banco no painel do Neon.
2. Exporte `DATABASE_URL` e `DIRECT_URL` apontando para produção **apenas na
   sessão atual do terminal**.
3. Rode `npm run db:deploy`.
4. Limpe as variáveis da sessão.

### Seed seguro

`prisma/seed.ts` usa `upsert` com IDs fixos: pode ser executado várias vezes
sem duplicar dados e não apaga nada. Ele se recusa a rodar contra um banco
que não seja local. Para forçar (por sua conta e risco), use
`ALLOW_REMOTE_SEED=true`.

### Problemas comuns

- **`Can't reach database server`:** o container não está de pé. Rode
  `npm run db:up` e confira com `docker compose ps`.
- **Porta 5432 ocupada:** há outro Postgres na máquina. Pare-o ou troque a
  porta no `docker-compose.yml` e nas URLs da `.env`.
- **O seed foi bloqueado:** sua `DATABASE_URL` não aponta para `localhost`.
  Confira a `.env` e as variáveis exportadas no terminal.
- **Drift detectado no `migrate dev`:** o banco local foi alterado fora das
  migrations. Rode `npm run db:reset`.

## 🤝 Contribuindo

Contribuições são bem-vindas. Veja o [roadmap](docs/FEATURES.md) para
escolher um item. Mudanças pequenas, com PR e testes, são preferidas.

## 📄 Licença

MIT.