import { useState } from 'react'
import { useLocation } from 'wouter'
import { ChevronLeft, CheckCircle2, XCircle, Info } from 'lucide-react'
import PokerTable from '../components/PokerTable'
import { QUIZ_TESTE_001, QuizQuestion } from '../types/quiz'
import { assignPositionsToSlots } from '../utils/positionRotation'

export default function QuizIniciante() {
  const [, setLocation] = useLocation()
  const [currentQuestion] = useState<QuizQuestion>(QUIZ_TESTE_001)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  
  // Calcular atribuições de slots usando MATRIZ 3
  const slotAssignments = assignPositionsToSlots(currentQuestion.hero_position)
  
  // Construir texto da ação até o momento
  const buildActionText = () => {
    if (currentQuestion.action_sequence.length === 0) {
      return 'Ação inicia'
    }
    
    const actions = currentQuestion.action_sequence.map(seq => {
      const actionText = seq.action === 'fold' ? 'folda' : 
                        seq.action === 'call' ? 'call' :
                        seq.action === 'raise' ? `raise ${seq.amount || ''}` :
                        'check'
      return `${seq.position} ${actionText}`
    })
    
    return actions.join(', ')
  }
  
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    setShowFeedback(true)
  }
  
  const handleNextQuestion = () => {
    // Por enquanto, apenas reseta (futuramente vai para próxima pergunta)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }
  
  const isCorrect = selectedAnswer === currentQuestion.correct_answer
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setLocation('/dashboard')}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Voltar ao Dashboard</span>
            </button>
            <div className="text-right">
              <h1 className="text-xl font-bold">Quiz Iniciante</h1>
              <p className="text-sm text-slate-400">Pergunta 1 de 1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Mesa de Poker */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <PokerTable
              torneio="MTT"
              fase="Meio"
              stackEfetivo={currentQuestion.hero_stack}
              acaoAteOMomento={buildActionText()}
              slotAssignments={slotAssignments}
              heroHand={currentQuestion.hero_hand}
            />
          </div>

          {/* Pergunta */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-start gap-3 mb-4">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold mb-2">Situação</h2>
                <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                  {currentQuestion.question_text}
                </p>
              </div>
            </div>
          </div>

          {/* Opções de Resposta */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold mb-4">Escolha sua ação:</h3>
            <div className="grid gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option
                const isThisCorrect = option === currentQuestion.correct_answer
                
                let buttonClass = 'w-full p-4 rounded-lg border-2 transition-all text-left font-medium '
                
                if (!showFeedback) {
                  buttonClass += isSelected
                    ? 'border-blue-500 bg-blue-500/20 text-white'
                    : 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-600'
                } else {
                  if (isThisCorrect) {
                    buttonClass += 'border-green-500 bg-green-500/20 text-white'
                  } else if (isSelected && !isCorrect) {
                    buttonClass += 'border-red-500 bg-red-500/20 text-white'
                  } else {
                    buttonClass += 'border-slate-600 bg-slate-700 text-slate-400'
                  }
                }
                
                return (
                  <button
                    key={option}
                    onClick={() => !showFeedback && handleAnswerSelect(option)}
                    disabled={showFeedback}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showFeedback && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Feedback */}
          {showFeedback && selectedAnswer && (
            <div className={`rounded-xl p-6 border-2 ${
              isCorrect
                ? 'bg-green-500/10 border-green-500'
                : 'bg-red-500/10 border-red-500'
            }`}>
              <div className="flex items-start gap-3 mb-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                )}
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    {isCorrect ? '✅ Resposta Correta!' : '❌ Resposta Incorreta'}
                  </h3>
                  <p className="text-slate-200 leading-relaxed">
                    {currentQuestion.feedback[selectedAnswer]}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
