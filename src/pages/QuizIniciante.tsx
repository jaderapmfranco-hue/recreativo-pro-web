import { useState } from 'react'
import { useLocation } from 'wouter'
import { ChevronLeft, CheckCircle2, XCircle, Info, ArrowLeft, ArrowRight } from 'lucide-react'
import PokerTable9Max from '../components/PokerTable9Max'
import { QUIZ_QUESTIONS } from '../types/quiz'

export default function QuizIniciante() {
  const [, setLocation] = useLocation()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex]
  const totalQuestions = QUIZ_QUESTIONS.length
  
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    setShowFeedback(true)
  }
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }
  
  const handleTryAgain = () => {
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
              <p className="text-sm text-slate-400">
                Pergunta {currentQuestionIndex + 1} de {totalQuestions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Mesa de Poker */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <PokerTable9Max
              hero_label={currentQuestion.hero_position}
              hero_zone_color={currentQuestion.hero_zone_color}
              dealer_position={currentQuestion.dealer_position}
              hero_cards={currentQuestion.hero_cards}
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
            <h3 className="text-lg font-bold mb-4">Escolha sua resposta:</h3>
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
              
              <div className="flex justify-end gap-3 mt-4">
                {!isCorrect && (
                  <button
                    onClick={handleTryAgain}
                    className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded-lg font-medium transition-colors"
                  >
                    Tentar Novamente
                  </button>
                )}
                {currentQuestionIndex < totalQuestions - 1 && (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    Próxima Pergunta
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {currentQuestionIndex === totalQuestions - 1 && isCorrect && (
                  <button
                    onClick={() => setLocation('/dashboard')}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
                  >
                    Finalizar Quiz
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Navegação entre Questões */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentQuestionIndex === 0
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>
            
            <div className="text-center">
              <div className="flex gap-2">
                {Array.from({ length: totalQuestions }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentQuestionIndex
                        ? 'bg-blue-500'
                        : index < currentQuestionIndex
                        ? 'bg-green-500'
                        : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentQuestionIndex === totalQuestions - 1
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              Próxima
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
