# Aqua Adopt 2.0 — Catálogo de features

Atualizado em 09/11/2026 · baseado no briefing de 06/11/2026

## Como ler este catálogo

- **IDs:** `F*` = itens do roadmap (numeração mantida). `C*` = ciência e ONGs. `S*` = comunidade (social). `V*` = experiência visual. `T*` = técnico.
- **Origem:** Roadmap (já existia) ou NOVA (ideia adicionada neste catálogo).
- **Esforço:** P (pequeno), M (médio), G (grande). Para as ideias novas é uma estimativa inicial, a revisar.
- **Prioridade e ordem:** não definidas aqui; ver seção 4.
- **Status:** tudo está como *Ideia*, exceto F0.1 (parcial).
- **Princípios que valem para tudo:** honestidade dos dados (selo «Simulação»), coordenadas de espécies ameaçadas arredondadas (~10 km), LGPD, fatias pequenas com PR e testes, cada linha precisa ser explicável.

## 1. Roadmap atual

### Fase 0 — Fundação e honestidade

| ID | Feature | Resumo | Esforço | Depende de |
|---|---|---|---|---|
| F0.1 | Documentação e transparência | README real, aviso «demonstração» no site todo, trocar promessas de «tempo real» e «doação», .env.example, LICENSE (MIT), CONTRIBUTING (parcial) | P | — |
| F0.2 | Banco e migrations | Postgres local (Docker), baseline no Supabase, `prisma migrate`, URL pooled vs direta, seed seguro | P | — |
| F0.3 | Páginas lendo o banco | Remover mocks do perfil, corrigir `revalidatePath`, cores de status, coordenada da Luna | P | F0.2 |
| F0.4 | Qualidade mínima | Prettier, `tsc --noEmit`, GitHub Actions, Vitest, smoke test Playwright | M | — |
| F0.5 | i18n pt-BR e en | next-intl, textos fora dos componentes, status traduzidos | M | — |

### Fase 1 — Núcleo funcional

| ID | Feature | Resumo | Esforço | Depende de |
|---|---|---|---|---|
| F1.1 | Avistamentos de verdade | Modelo Sighting, zod, geolocalização, clique no mapa, upload com remoção de EXIF, honeypot, Turnstile, rate limit, moderação PENDING/APPROVED/REJECTED | G | F0.2 |
| F1.2 | Autenticação e papéis | Link mágico por e-mail, papéis USER e ADMIN, rotas /admin protegidas | M | F0.2 |
| F1.3 | Apadrinhamento sério | Adoption ligada ao User, unicidade (userId, animalId), e-mail de confirmação, certificado público com Open Graph, cancelamento; sem pagamento no início | M | F1.2 |
| F1.4 | Painel admin | CRUD de animais e StatusUpdates, fila de moderação, importação por CSV | M | F1.2 |

### Fase 2 — Dados e telemetria

| ID | Feature | Resumo | Esforço | Depende de |
|---|---|---|---|---|
| F2.1 | Trajetória | Tabela Position (SIMULATED/REAL/IMPORTED), índice (animalId, recordedAt) | M | F0.2 |
| F2.2 | Simulador honesto | Vercel Cron gera passos plausíveis sem atravessar terra, selo «Simulação» | M | F2.1 |
| F2.3 | Mapa v2 | Trilhas com gradiente, slider de tempo, clusters, camadas; avaliar MapLibre e globo 3D | G | F2.1 |
| F2.4 | Dados reais abertos | OBIS/GBIF, NOAA Coral Reef Watch, Copernicus, MERMAID; job de ingestão com fonte e licença; possível FastAPI | G | F2.1 |
| F2.5 | API pública | /api/v1, OpenAPI, rate limit, chaves, cliente Python e notebook | M | F2.1, F1.1 |
| F2.6 | Ingestão de dispositivos (opcional) | POST /api/v1/ingest com chave por dispositivo, zod, idempotência | M | F2.5 |

### Fase 3 — Experiência cinematográfica

| ID | Feature | Resumo | Esforço | Depende de |
|---|---|---|---|---|
| F3.1 | Herói 3D do oceano | React Three Fiber, shader de água, raios de luz, plâncton, fallback estático | G | — |
| F3.2 | Scroll storytelling | GSAP ScrollTrigger + Lenis, da superfície ao fundo | G | F3.1 (visual) |
| F3.3 | Perfil imersivo | Linha do tempo, mapa da trilha, gráficos (rotulados como simulados enquanto forem) | M | F2.1 |
| F3.4 | Design system e polimento | Tokens, serif + sans, grain, transições, skeletons, WCAG AA, PWA | M | — |
| F3.5 | Conteúdo educativo | Páginas de espécies com status IUCN real e fonte; enum passa a usar categorias IUCN | P | — |

### Fase 4 — Open source de verdade

| ID | Feature | Resumo | Esforço | Depende de |
|---|---|---|---|---|
| F4.1 | Testes e observabilidade | Playwright (adotar, reportar, moderar), Sentry, Analytics, Lighthouse CI | M | F0.4 |
| F4.2 | Segurança | Headers, validação em toda borda, revisão de envs e permissões do banco | P | — |
| F4.3 | Documentação e comunidade | Diagrama Mermaid, ADRs, good first issues, roadmap público | P | — |

*Ideias futuras já citadas no briefing:* alertas por e-mail/Telegram, assistente de espécies com LLM (só fontes verificadas), painel para ONG com PDF, exportação Darwin Core, gamificação leve. Foram desdobradas nas ideias novas abaixo (C1, C2, C3, S2, T3, T4).

## 2. Ideias novas

### 2.1 ONGs e ciência (C)

| ID | Ideia | O que é | Esforço | Depende de | Cuidados |
|---|---|---|---|---|---|
| C1 | Exportação Darwin Core | Exportar avistamentos aprovados em Darwin Core (CSV/DwC-A) compatível com OBIS/GBIF | M | F1.1 | Só dados aprovados e com coordenadas já arredondadas para ameaçadas; validar o formato nas docs oficiais |
| C2 | Relatórios em PDF | Relatório mensal por animal, região ou ONG, com mapa, avistamentos e fontes | M | F1.4, F2.1 | Marcar dados simulados |
| C3 | Painel de organização (multi-ONG) | Cada organização com seus animais, equipe e moderadores | G | F1.2, F1.4 | Muda o modelo de dados (Organization); decidir antes de F1.2 |
| C4 | Nível de confiança do avistamento | Score por foto, revisão por pares e histórico do relator | M | F1.1 | Evitar excluir iniciantes |
| C5 | Checagem de plausibilidade | Comparar o avistamento com ocorrências OBIS/GBIF da espécie e da região e sinalizar casos estranhos para o moderador | G | F1.1, F2.4 | Só apoio ao moderador, nunca rejeição automática |
| C6 | Integração MERMAID | Importar sítios e dados de recifes e mostrar camadas | G | F2.4 | Verificar API e licença; depende do contato com o MERMAID |
| C7 | Alertas por região | Usuário assina uma região e recebe aviso de branqueamento ou temperatura anômala | M | F1.2, F2.4 | Limite de envios e opt-out (LGPD) |
| C8 | Página «Fontes de dados» | Lista de cada fonte, licença, data da última atualização e metodologia | P | F2.4 | Verificar termos de cada API |
| C9 | Áreas marinhas protegidas | Camada de AMPs no mapa e indicação de quando o animal está dentro de uma | M | F2.3 | Fonte e licença do polígono |
| C10 | Foto-identificação de indivíduos | Reconhecer o mesmo animal por fotos (marcas naturais) | G | F1.1 | Exploratória; pode ser só pesquisa por ora |

### 2.2 Comunidade (S)

| ID | Ideia | O que é | Esforço | Depende de | Cuidados |
|---|---|---|---|---|---|
| S1 | Perfil do cidadão cientista | Página pública opcional com contribuições aprovadas | M | F1.2, F1.1 | Opt-in, mínimo de dados |
| S2 | Selos e conquistas | Primeiro avistamento, 5 aprovados, 3 espécies, etc. | M | S1 | Gamificação leve, sem pressionar relatos falsos |
| S3 | Ranking opt-in por região | Placar de contribuições aprovadas | P | S1 | Pode incentivar spam; decidir se vale |
| S4 | Seguir um animal | Receber e-mail quando um StatusUpdate novo for publicado | M | F1.2 | Opt-out fácil |
| S5 | Certificado e card compartilhável | Imagem OG/9:16 do apadrinhamento para redes sociais | P | F1.3 | Sem dados pessoais além do nome escolhido |
| S6 | «Encontrei um animal encalhado» | Guia por estado com contatos oficiais e passo a passo | M | F3.5 | Contatos e orientações precisam de fonte oficial; conferir fatos |
| S7 | Campanhas sazonais | Ex.: temporada de baleias-jubarte, com mapa e metas | M | F1.1 | Conteúdo editorial contínuo |
| S8 | Modo escola | Quiz, plano de aula e material para professores | M | F3.5 | Revisão científica do conteúdo |
| S9 | Newsletter | Resumo periódico dos animais e da comunidade | P | F1.2 | Consentimento explícito |
| S10 | Comentários moderados no perfil | Mensagens de apoio ao animal | M | F1.2, F1.4 | Custo de moderação; avaliar se compensa |

### 2.3 Experiência visual (V)

| ID | Ideia | O que é | Esforço | Depende de | Cuidados |
|---|---|---|---|---|---|
| V1 | Replay cinematográfico da jornada | Câmera 3D ou 2D acompanha a trilha do animal com narração em texto | G | F2.1, F2.3 | Rotular simulado vs real |
| V2 | Zonas do oceano | Paleta, partículas e fauna mudam por profundidade/zona | M | F3.2 | Pode ficar pesado; fallback estático |
| V3 | Som ambiente opt-in | Sons de oceano, mudo por padrão | P | F3.1 | Direitos dos áudios; acessibilidade |
| V4 | Silhuetas e ilustrações animadas | Ilustração SVG/Lottie por espécie | M | F3.4 | Direitos de imagem; substituir fotos de terceiros |
| V5 | Comparador de migração | Sobrepor trilhas de dois ou mais animais | M | F2.3 | Poucos animais com dados reais |
| V6 | Camada animada de temperatura | Mapa de temperatura do mar com animação no tempo | G | F2.4, F2.3 | Tamanho dos dados; fonte e licença |
| V7 | Transições entre páginas | View Transitions e elementos compartilhados entre cartão e perfil | M | F3.4 | Respeitar reduced-motion |
| V8 | Perfil como história | Capítulos por animal (resgate, soltura, jornada) em scroll | M | F3.3 | Honestidade: história fictícia precisa de selo |

### 2.4 Técnico (T)

| ID | Ideia | O que é | Esforço | Depende de | Cuidados |
|---|---|---|---|---|---|
| T1 | Reporte offline (PWA) | Registrar o avistamento sem sinal e sincronizar depois | G | F1.1, F3.4 | Conflito de sincronização, fila local |
| T2 | Sugestão de espécie por foto | Modelo sugere a espécie, o humano confirma | G | F1.1 | Só sugestão; custo e precisão; Python pode agregar aqui |
| T3 | Assistente de espécies com LLM | Responde só com fontes verificadas e citadas | G | F3.5 | Risco de alucinação; custo |
| T4 | Bot de Telegram/e-mail | Reportar avistamento ou receber alertas por bot | M | F1.1, C7 | Spam e LGPD |
| T5 | Busca e filtros | Por espécie, status, região e período | M | F0.3 | — |
| T6 | Feeds abertos | GeoJSON, RSS e webhooks dos dados públicos | P | F2.5 | Respeitar arredondamento de coordenadas |
| T7 | Importação de telemetria | Importar CSV/GPX/KML de transmissores reais | M | F2.1, F1.4 | Formatos variam por fabricante |
| T8 | Painel de saúde dos jobs | Status da ingestão, falhas, última atualização | M | F2.4, F4.1 | — |
| T9 | Meus dados (LGPD) | Exportar e excluir os dados do usuário | M | F1.2 | Obrigação legal; definir retenção |
| T10 | Feature flags e modo Simulação global | Ligar/desligar recursos e selo de simulação em um lugar | P | F0.3 | — |
| T11 | Cache de mapa e ISR | Performance do mapa e das páginas de animal | M | F2.1 | — |

## 3. Mapa de dependências (visão rápida)

- **Base de tudo:** F0.2 (migrations) → F0.3 (mocks fora).
- **Contas:** F1.2 libera F1.3, F1.4, S1, S4, C7, T9.
- **Dados de posição:** F2.1 libera F2.2, F2.3, F3.3, C2, V1, V5, T7, T11.
- **Avistamentos:** F1.1 libera C1, C4, C5, S7, T1, T2, T4.
- **Dados abertos:** F2.4 libera C5, C6, C8, V6.

## 4. Pontos a decidir (ainda em aberto)

1. Prioridade e ordem das ideias novas em relação às fases do roadmap.
2. Multi-ONG (C3): entra já no modelo de dados de F1.2 ou fica para depois?
3. Ranking (S3) e comentários (S10): vale o custo de moderação e o risco de spam?
4. Foto-ID (C10) e sugestão por foto (T2): ficam como pesquisa ou entram no roadmap?
5. Onde usar Python (T2, F2.4, notebook da API) ou manter tudo em TypeScript.
6. Fotos dos animais: trocar links de terceiros por ilustração própria, fotos licenciadas ou outra solução.
7. Quais ideias viram issues `good first issue` no repositório (F4.3).