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
