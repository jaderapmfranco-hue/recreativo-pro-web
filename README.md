# Recreativo Pro

**Plataforma profissional de treino de poker com estratégias GTO**

Recreativo Pro é uma aplicação web frontend desenvolvida com Vite + React + TypeScript para transformar jogadores recreativos em profissionais através de metodologia baseada em estratégias GTO (Game Theory Optimal).

---

## 🎯 Sobre o Projeto

O **Recreativo Pro** é um projeto **frontend puro** (sem backend) com foco em:

- **Autenticação segura** com Supabase Auth
- **Proteção de rotas** para garantir acesso apenas a usuários autenticados
- **Dashboard intuitivo** com explicação clara do conceito e navegação por módulos
- **Estrutura modular** preparada para expansão futura dos módulos de Ranges GTO, Modo Treino e Gestão de Bankroll
- **Design profissional** com sidebar de navegação e área principal de conteúdo

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **Vite** - Build tool e dev server ultra-rápido
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS 4** - Framework CSS utilitário
- **Wouter** - Roteamento leve para React
- **shadcn/ui** - Componentes UI acessíveis e customizáveis
- **Lucide React** - Ícones modernos

### Backend & Autenticação
- **Supabase** - Backend as a Service (PostgreSQL + Auth)
- **Supabase Auth** - Sistema de autenticação completo

---

## 📋 Funcionalidades Implementadas

### ✅ Sistema de Autenticação
- Login com email e senha
- Cadastro de novos usuários
- Confirmação de email obrigatória
- Logout seguro
- Persistência de sessão

### ✅ Proteção de Rotas
- Redirecionamento automático para login se não autenticado
- Verificação de sessão em todas as rotas protegidas
- Loading state durante verificação de autenticação

### ✅ Dashboard Pós-Login
- Mensagem de boas-vindas personalizada
- Explicação clara do conceito "Recreativo Pro"
- Cards interativos para módulos futuros:
  - **Ranges GTO** - Estudo de ranges otimizados
  - **Modo Treino** - Prática de decisões em cenários reais
  - **Gestão de Bankroll** - Acompanhamento de resultados financeiros

### ✅ Layout Profissional
- Sidebar de navegação com ícones
- Design limpo e responsivo
- Feedback visual para ações do usuário (toasts)
- Estados de loading e transições suaves

---

## 🗄️ Estrutura do Banco de Dados

### Tabela `training_sessions`

Preparada para armazenar sessões de treino dos usuários:

```sql
CREATE TABLE training_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Políticas de Segurança (RLS):**
- Usuários podem visualizar apenas suas próprias sessões
- Usuários podem criar apenas suas próprias sessões

---

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js 18+ instalado
- Conta no [Supabase](https://supabase.com)
- pnpm instalado (`npm install -g pnpm`)

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/recreativo-pro.git
cd recreativo-pro
```

### 2. Instale as Dependências

```bash
pnpm install
```

### 3. Configure o Supabase

#### 3.1. Crie um Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em "New Project"
3. Preencha os dados do projeto e aguarde a criação

#### 3.2. Obtenha as Credenciais

1. No painel do projeto, vá em **Settings** → **API**
2. Copie a **Project URL** (ex: `https://xyzcompany.supabase.co`)
3. Copie a **anon/public key** (chave pública)

#### 3.3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_publica_aqui
```

#### 3.4. Crie a Tabela `training_sessions`

No Supabase, vá em **SQL Editor** e execute:

```sql
CREATE TABLE training_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE training_sessions ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas suas próprias sessões
CREATE POLICY "Users can view own sessions"
  ON training_sessions FOR SELECT
  USING (auth.uid() = user_id);

-- Política para usuários criarem suas próprias sessões
CREATE POLICY "Users can create own sessions"
  ON training_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### 3.5. Configure o Email no Supabase

1. Vá em **Authentication** → **Email Templates**
2. Personalize os templates de confirmação de email (opcional)
3. Em **Authentication** → **Settings**, configure:
   - **Site URL**: `http://localhost:5173` (desenvolvimento) ou sua URL de produção
   - **Redirect URLs**: Adicione `http://localhost:5173/dashboard` e sua URL de produção

---

## 🏃 Executando o Projeto

### Modo Desenvolvimento

```bash
pnpm dev
```

Acesse: `http://localhost:5173`

### Build para Produção

```bash
pnpm build
```

Os arquivos otimizados estarão em `dist/`.

### Preview da Build

```bash
pnpm preview
```

---

## 🚀 Deploy no Vercel

### Método 1: Via Interface Web

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New Project"
3. Importe seu repositório do GitHub
4. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Clique em "Deploy"

### Método 2: Via CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

### Configuração Pós-Deploy

No Supabase, atualize as URLs de redirecionamento:

1. Vá em **Authentication** → **Settings**
2. Adicione:
   - **Site URL**: `https://seu-app.vercel.app`
   - **Redirect URLs**: `https://seu-app.vercel.app/dashboard`

---

## 📁 Estrutura do Projeto

```
recreativo-pro/
├── public/                  # Arquivos estáticos
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/              # Componentes shadcn/ui
│   │   ├── ProtectedRoute.tsx
│   │   └── ErrorBoundary.tsx
│   ├── contexts/            # Contextos React
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── lib/                 # Utilitários e configurações
│   │   ├── supabase.ts      # Cliente Supabase
│   │   └── utils.ts
│   ├── pages/               # Páginas da aplicação
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx              # Configuração de rotas
│   ├── main.tsx             # Ponto de entrada
│   └── index.css            # Estilos globais
├── index.html               # HTML principal
├── package.json
├── vite.config.ts           # Configuração do Vite
├── tailwind.config.js
├── tsconfig.json
├── todo.md                  # Checklist de funcionalidades
└── README.md
```

---

## 🎨 Design e UX

### Paleta de Cores

- **Primary**: Emerald (verde) - Representa crescimento e evolução
- **Background**: Slate (cinza escuro) - Sidebar e elementos de destaque
- **Surface**: Branco/Cinza claro - Área principal de conteúdo
- **Accent**: Blue, Purple - Cards de módulos

### Componentes UI

O projeto utiliza **shadcn/ui**, uma coleção de componentes acessíveis e customizáveis construídos com Radix UI e Tailwind CSS.

---

## 🔮 Roadmap - Próximas Funcionalidades

### Módulo Ranges GTO
- [ ] Interface de visualização de ranges (matriz de cartas)
- [ ] Filtros por posição, stack, contexto de ação
- [ ] Sistema de salvamento de ranges personalizados
- [ ] Importação/exportação de ranges

### Modo Treino
- [ ] Geração de cenários de jogo aleatórios
- [ ] Sistema de pontuação e feedback
- [ ] Histórico de sessões de treino
- [ ] Estatísticas de desempenho

### Gestão de Bankroll
- [ ] Registro de sessões de jogo
- [ ] Gráficos de evolução da banca
- [ ] Filtros por tipo de jogo e plataforma
- [ ] Relatórios de ROI e winrate

### Melhorias Gerais
- [ ] Modo escuro/claro
- [ ] Perfil de usuário editável
- [ ] Sistema de notificações
- [ ] Integração com plataformas de poker (opcional)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através do email: contato@recreativopro.com

---

## 🙏 Agradecimentos

- [Vite](https://vitejs.dev) - Build tool ultra-rápido
- [Supabase](https://supabase.com) - Backend e autenticação
- [shadcn/ui](https://ui.shadcn.com) - Componentes UI
- [Lucide](https://lucide.dev) - Ícones
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS

---

**Desenvolvido com ♠️ para jogadores de poker que buscam evolução constante.**
