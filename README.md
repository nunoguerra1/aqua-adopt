# Aqua Adopt | Monitoramento e Conservação Marinha

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

Uma aplicação Full Stack moderna desenvolvida para conectar a ciência de dados e a preservação da vida marinha. O **Aqua Adopt** permite o monitoramento de animais marinhos através de mapas interativos, relatórios de avistamento e um sistema de apadrinhamento virtual.

🔗 **[Acesse o projeto rodando ao vivo aqui!](https://aqua-adopt-8zmy.vercel.app)**

## 💡 A Intuição por trás do Projeto
A ideia nasceu da vontade de criar uma aplicação que fosse além do tradicional "CRUD". Eu queria construir uma experiência imersiva e visualmente impactante, provando que é possível unir **tecnologia de ponta, performance e um propósito nobre** (a conservação dos oceanos). O desafio foi integrar elementos complexos de UI (como renderização 3D e mapas em tempo real) com um backend robusto e escalável.

## 🚀 Diferenciais Técnicos
* **Arquitetura Full Stack no Next.js (App Router):** Separação clara entre *Server Components* (para SEO e performance) e *Client Components* (para interatividade).
* **Server Actions:** Manipulação de dados e formulários diretamente no servidor, dispensando a criação de rotas de API tradicionais.
* **Integração 3D & Mapas:** Uso de `React Three Fiber` para o background imersivo e `Leaflet` para a plotagem geográfica de dados vindos do banco.
* **Banco de Dados em Nuvem & ORM:** Modelagem de dados relacional com PostgreSQL e tipagem estática de ponta a ponta com o Prisma.

## 🛠️ Stacks

**Frontend / UI:**
* **Next.js 14+** (React framework)
* **TypeScript** (Tipagem forte e prevenção de erros)
* **Tailwind CSS** (Estilização utilitária e responsiva)
* **Framer Motion** (Animações fluidas de interface)
* **React Three Fiber / Drei** (Renderização 3D no navegador)
* **Leaflet / React-Leaflet** (Mapas interativos)
* **Lucide React** (Ícones SVG)

**Backend / Dados:**
* **Node.js** (Ambiente de execução)
* **PostgreSQL** (Banco de Dados Relacional em Nuvem)
* **Prisma ORM** (Modelagem, migrações e consultas ao banco)
* **Vercel** (Deploy contínuo e hospedagem)

## 📌 Funcionalidades Principais
- [x] **Dashboard Imersivo:** Landing page com background 3D interativo do oceano.
- [x] **Mapa de Telemetria:** Visualização geográfica em tempo real dos animais monitorados.
- [x] **Reporte de Avistamentos:** Formulário dinâmico para usuários registrarem quando encontrarem animais.
- [x] **Sistema de Apadrinhamento:** Fluxo de adoção simbólica integrado com o banco de dados.
- [x] **Páginas Dinâmicas:** Geração de rotas `/[id]` para os perfis detalhados de cada animal.

## ⚙️ Como rodar o projeto localmente

1. Clone o repositório:
```bash
git clone [https://github.com/nunoguerra1/aqua-adopt.git](https://github.com/nunoguerra1/aqua-adopt.git)
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione sua string de conexão do PostgreSQL:
```env
DATABASE_URL="sua_url_do_banco_aqui"
```

4. Rode as migrações e gere o client do Prisma:
```bash
npx prisma generate
npx prisma db push
```

5. Popule o banco com dados iniciais (Seed):
```bash
npm run seed
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
