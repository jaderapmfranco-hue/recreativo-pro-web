# Recreativo Pro - TODO

## Funcionalidades Obrigatórias

- [x] Sistema de autenticação completo com Supabase Auth (email + senha)
- [x] Tela de login e cadastro
- [x] Confirmação de email obrigatória
- [x] Proteção de rotas (usuários não autenticados não acessam dashboard)
- [x] Dashboard pós-login com mensagem de boas-vindas
- [x] Explicação do conceito "Recreativo Pro" no dashboard
- [x] Cards/botões placeholder para Módulo Ranges
- [x] Cards/botões placeholder para Modo Treino
- [x] Cards/botões placeholder para Gestão de Bankroll
- [x] Integração com Supabase via variáveis de ambiente
- [x] Tabela training_sessions no banco Supabase (id, user_id, created_at)
- [x] Layout visual com sidebar de navegação
- [x] Design limpo e profissional
- [x] Estrutura modular e escalável
- [x] Documentação no README (projeto, setup, variáveis, deploy)

## Funcionalidades Futuras (Não Implementar Agora)

- [ ] Lógica de poker
- [ ] Ranges GTO funcionais
- [ ] Modo treino funcional
- [ ] Gestão de bankroll funcional


## Conversão para Frontend Puro

- [x] Remover pasta server/ e toda estrutura de backend
- [x] Remover dependências de backend (Express, tRPC, etc)
- [x] Ajustar package.json para scripts Vite puros
- [x] Mover index.html para raiz do projeto
- [x] Reorganizar estrutura src/ para padrão Vite
- [x] Atualizar vite.config.ts para configuração frontend pura
- [x] Remover referências a tRPC no código
- [x] Atualizar README para refletir estrutura frontend pura
- [x] Testar build e dev server


## Push para GitHub

- [ ] Configurar remote do repositório GitHub
- [ ] Criar .gitignore apropriado
- [ ] Fazer commit inicial do código frontend
- [ ] Push para repositório remoto
- [ ] Documentar processo de deploy no Vercel


## 🎴 Mesa de Poker SVG - Modo Treino

### Componente PokerTable
- [x] Criar componente PokerTable.tsx com SVG fornecido
- [x] Implementar mesa oval horizontal (460x180, rx=90)
- [x] Adicionar 9 posições: SB, BB, UTG, UTG+1, MP, MP+1, HJ, CO, BTN
- [x] Implementar anéis coloridos (vermelho, azul, verde)
- [x] Adicionar cartas do herói (visíveis - A♠ K♠)
- [x] Adicionar cartas dos oponentes (verso azul)
- [x] Implementar dealer button (no BTN)
- [x] Adicionar sombras e filtros SVG
- [x] Garantir responsividade (max-w-4xl mx-auto)

### Integração no Modo Treino
- [x] Integrar PokerTable no Dashboard (activeSection === 'training')
- [x] Adicionar Card com título e descrição
- [x] Remover toast placeholder do botão Modo Treino
- [x] Testar visualização da mesa
- [x] Validar posições e cores

### Validação
- [x] Build de produção sem erros
- [x] TypeScript sem erros
- [x] Mesa renderizando corretamente


## 📝 Contexto Textual - Modo Treino

### Área de Contexto
- [x] Adicionar seção de contexto acima da mesa SVG
- [x] Exibir Torneio (ex: MTT)
- [x] Exibir Fase (ex: Bolha)
- [x] Exibir Stack Efetivo (ex: 45 BB)
- [x] Exibir Ação até o momento (ex: "UTG fold, MP raise 2.5BB, ação no SB")
- [x] Usar layout em grid responsivo (2 cols mobile, 4 cols desktop)
- [x] Estilizar com bg-slate-100 e border para clareza visual
- [x] Adicionar interface PokerTableProps com props opcionais
- [x] Valores padrão definidos no componente

### Validação
- [x] Build de produção sem erros
- [x] TypeScript sem erros
- [x] Contexto renderizando corretamente acima da mesa


## 🎯 Quiz Iniciante - MATRIZ 3

### Contexto Geral
- [x] Remover completamente qualquer mesa/lógica/perguntas anteriores
- [x] Mesa SVG como fonte visual oficial
- [x] Lógica vem exclusivamente das perguntas
- [x] Mesa apenas reflete o estado da pergunta

### MATRIZ 3 (Travada)
- [x] Layout físico nunca muda
- [x] Coordenadas nunca mudam
- [x] Hero sempre no slot S0 (embaixo)
- [x] Dealer sempre acompanha o BTN
- [x] Cartas do hero sempre abertas
- [x] Cartas dos vilões sempre fechadas

### Slots Fixos (9 posições)
- [x] S0 = hero (fixo, embaixo)
- [x] S1 a S8 = outros jogadores
- [x] Slots nunca mudam de lugar
- [x] Nunca associar slot a posição de poker

### Ordem Oficial das Posições (9-max)
- [x] BTN → SB → BB → UTG → UTG+1 → MP → MP+1 → HJ → CO → BTN
- [x] Implementar lógica de rotação
- [x] Atribuir hero_position ao S0
- [x] Preencher demais slots seguindo ordem oficial
- [x] Aplicar apenas substituição de rótulos

### Regra das Cores (Travada)
- [x] 🔴 Vermelho: SB, BB, UTG, UTG+1
- [x] 🔵 Azul: MP, MP+1
- [x] 🟢 Verde: HJ, CO, BTN
- [x] 🟡 Dealer: sempre acompanha BTN
- [x] Cores dependem do rótulo, nunca do slot

### Pergunta Teste (Obrigatória)
- [x] Implementar pergunta teste_001
- [x] Hero no CO com 30bb e AKs
- [x] Sequência: UTG fold, UTG+1 fold, MP fold
- [x] Opções: Fold, Call, Raise
- [x] Resposta correta: Raise

### Feedback Automático
- [x] Raise: "Correto. No CO, com 30bb e AKs..."
- [x] Call: "Jogar passivamente..."
- [x] Fold: "AKs é uma mão forte demais..."

### Regras Finais (Não Negociáveis)
- [x] Nunca inventar posições
- [x] Nunca mover slots
- [x] Nunca aplicar cor por slot
- [x] Nunca gerar mesa sem pergunta
- [x] Nunca alterar a MATRIZ 3

### Validação
- [x] Build de produção sem erros
- [x] TypeScript sem erros
- [x] Quiz funcionando corretamente


## 🎲 Componente Mesa 9-Max Dinâmico (Motor Universal)

### Objetivo
- [x] Criar componente base para TODAS as questões do quiz
- [x] S0 (inferior central) sempre fixo como Hero
- [x] Aceitar props dinâmicos para controlar aparência

### Props Dinâmicos
- [x] hero_label: Texto dentro do assento S0 (ex: BTN, SB, UTG)
- [x] hero_zone_color: Cor do anel (Red, Blue, Green)
- [x] dealer_position: ID do assento onde chip "D" aparece (S0-S8)

### Implementação
- [x] Criar PokerTable9Max.tsx baseado no código MATRIZ fornecido
- [x] Manter layout SVG fixo (viewBox 0 0 600 380)
- [x] Aplicar classes CSS dinâmicas (.rr, .rb, .rg)
- [x] Posicionar chip "D" dinamicamente em qualquer assento
- [x] Manter filtros de sombra e estética profissional

### Integração
- [x] Atualizar QuizIniciante para usar novo componente
- [x] Remover lógica de rotação complexa (simplificar)
- [x] Passar apenas hero_label, hero_zone_color e dealer_position

### Validação
- [x] Build de produção sem erros
- [x] TypeScript sem erros
- [x] Mesa renderizando corretamente com props dinâmicos


## 🪑 Adicionar 8 Assentos Restantes (S1-S8)

### Objetivo
- [x] Completar mesa 9-max com todos os assentos visíveis
- [x] Manter coordenadas fixas para cada assento
- [x] Adicionar labels padrão das posições de poker

### Assentos a Adicionar
- [x] S1: Direita inferior (label padrão: SB)
- [x] S2: Direita meio-inferior (label padrão: BB)
- [x] S3: Direita meio (label padrão: UTG)
- [x] S4: Direita superior (label padrão: UTG+1)
- [x] S5: Centro superior (label padrão: MP)
- [x] S6: Esquerda superior (label padrão: MP+1)
- [x] S7: Esquerda meio (label padrão: HJ)
- [x] S8: Esquerda inferior (label padrão: CO)

### Implementação
- [x] Adicionar círculos brancos (.st) para cada assento
- [x] Adicionar labels de texto para cada posição
- [x] Adicionar cartas fechadas (verso azul) para vilões
- [x] Manter filtros de sombra
- [x] Garantir que labels sejam dinâmicos (não hardcoded)

### Validação
- [x] Build de produção sem erros
- [x] TypeScript sem erros
- [x] Mesa 9-max completa renderizando corretamente


## 🎓 5 Questões de Identificação de Posições

### Objetivo
- [x] Implementar 5 questões educacionais usando motor PokerTable9Max
- [x] Sistema de navegação entre questões (Anterior/Próxima)
- [x] Contador de progresso (Pergunta X de 5)
- [x] Feedback educacional para cada resposta

### Questões a Implementar
- [x] Q1: Identificação do Botão (BTN, Verde, D em S0)
- [x] Q2: Primeiro a Agir - UTG (UTG, Vermelho, D em S6)
- [x] Q3: Small Blind (SB, Vermelho, D em S8)
- [x] Q4: Big Blind e Zonas (BB, Vermelho, D em S7)
- [x] Q5: O Corte - Cutoff (CO, Verde, D em S1)

### Implementação
- [x] Criar array QUIZ_QUESTIONS em src/types/quiz.ts
- [x] Adicionar interface QuizQuestion com dealer_position
- [x] Atualizar QuizIniciante com useState para currentQuestionIndex
- [x] Adicionar botões Anterior/Próxima Pergunta
- [x] Implementar lógica de navegação
- [x] Integrar com PokerTable9Max usando variáveis dinâmicas

### Validação
- [x] Build de produção sem erros
- [x] TypeScript sem erros
- [x] Navegação entre questões funcionando
- [x] Feedback correto para cada resposta


## 🐛 Correção de Erro 404 nos Cards

### Problema
- [x] Cards do sistema retornam erro 404: NOT_FOUND ao clicar

### Investigação
- [x] Verificar rotas no App.tsx
- [x] Verificar vinculação dos cards no Dashboard
- [x] Verificar configuração SPA no index.html
- [x] Verificar se arquivos de componentes existem

### Correções
- [x] Corrigir rotas no App.tsx se necessário
- [x] Corrigir links dos cards no Dashboard
- [x] Adicionar configuração SPA se necessário
- [x] Criar arquivos de componentes faltantes

### Validação
- [x] Build de produção sem erros
- [x] Navegação entre páginas funcionando
- [x] Cards redirecionando corretamente
