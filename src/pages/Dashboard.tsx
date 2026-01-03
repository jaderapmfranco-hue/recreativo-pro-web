import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { BarChart3, BookOpen, LogOut, Settings, Spade, Target, TrendingUp, Wallet } from 'lucide-react';
import PokerTable from '@/components/PokerTable';
import { useState } from 'react';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('home');

  const handleLogout = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso!');
  };

  const handlePlaceholderClick = (feature: string) => {
    toast.info(`${feature} em breve!`, {
      description: 'Esta funcionalidade será implementada nas próximas versões.',
    });
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Spade className="h-8 w-8 text-emerald-500" />
            <h1 className="text-xl font-bold">Recreativo Pro</h1>
          </div>
          <p className="text-sm text-slate-400">Treino de Poker GTO</p>
        </div>

        <Separator className="bg-slate-700" />

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveSection('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'home'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Target className="h-5 w-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => {
              setActiveSection('ranges');
              handlePlaceholderClick('Módulo Ranges');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'ranges'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span>Ranges GTO</span>
          </button>

          <button
            onClick={() => {
              setActiveSection('training');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'training'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <TrendingUp className="h-5 w-5" />
            <span>Modo Treino</span>
          </button>

          <button
            onClick={() => {
              setActiveSection('bankroll');
              handlePlaceholderClick('Gestão de Bankroll');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'bankroll'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Wallet className="h-5 w-5" />
            <span>Bankroll</span>
          </button>

          <Separator className="bg-slate-700 my-4" />

          <button
            onClick={() => {
              setActiveSection('settings');
              handlePlaceholderClick('Configurações');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'settings'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Configurações</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="mb-3">
            <p className="text-sm text-slate-400">Logado como:</p>
            <p className="text-sm font-medium truncate">{user?.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="w-full" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8 overflow-auto">
        {activeSection === 'home' && (
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Cabeçalho */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Bem-vindo ao Recreativo Pro! 👋
              </h2>
              <p className="text-slate-600">
                Sua plataforma completa para treinar poker com estratégias GTO
              </p>
            </div>

            {/* Card de Explicação */}
            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-900">
                  <BarChart3 className="h-5 w-5" />
                  O que é o Recreativo Pro?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-700 space-y-3">
                <p>
                  O <strong>Recreativo Pro</strong> é uma plataforma de treino de poker projetada para
                  transformar jogadores recreativos em profissionais através de metodologia baseada em
                  estratégias GTO (Game Theory Optimal).
                </p>
                <p>
                  Aqui você terá acesso a <strong>ranges otimizados</strong>, modo de treino interativo
                  para praticar decisões em diferentes cenários, e ferramentas de gestão de bankroll para
                  acompanhar sua evolução financeira.
                </p>
                <p className="text-sm text-slate-600">
                  💡 <em>Dica:</em> Comece explorando os módulos de Ranges GTO para entender as mãos
                  recomendadas em cada posição, depois pratique no Modo Treino!
                </p>
              </CardContent>
            </Card>

            {/* Cards de Módulos */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Módulos Disponíveis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card Ranges */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handlePlaceholderClick('Módulo Ranges')}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>Ranges GTO</CardTitle>
                    <CardDescription>
                      Estude ranges otimizados para diferentes posições, stacks e contextos de jogo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Acessar Ranges
                    </Button>
                  </CardContent>
                </Card>

                {/* Card Treino */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handlePlaceholderClick('Modo Treino')}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                      <TrendingUp className="h-6 w-6 text-emerald-600" />
                    </div>
                    <CardTitle>Modo Treino</CardTitle>
                    <CardDescription>
                      Pratique decisões em cenários reais e receba feedback instantâneo sobre suas jogadas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Iniciar Treino
                    </Button>
                  </CardContent>
                </Card>

                {/* Card Bankroll */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handlePlaceholderClick('Gestão de Bankroll')}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                      <Wallet className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle>Gestão de Bankroll</CardTitle>
                    <CardDescription>
                      Acompanhe seus resultados, gerencie sua banca e tome decisões financeiras inteligentes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Gerenciar Banca
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Informação sobre desenvolvimento */}
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="pt-6">
                <p className="text-sm text-slate-600 text-center">
                  🚀 Os módulos estão em desenvolvimento e serão liberados em breve. Fique atento às atualizações!
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'training' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Modo Treino 🎯
              </h2>
              <p className="text-slate-600">
                Pratique suas decisões em cenários reais de poker
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Mesa de Poker</CardTitle>
                <CardDescription>
                  Visualize a mesa e tome suas decisões
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PokerTable 
                  torneio="MTT"
                  fase="Bolha"
                  stackEfetivo="45 BB"
                  acaoAteOMomento="UTG fold, MP raise 2.5BB, ação no SB"
                />
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
