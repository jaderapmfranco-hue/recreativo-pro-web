// Estrutura de dados para perguntas do Quiz Iniciante

export interface ActionSequence {
  position: string
  action: 'fold' | 'call' | 'raise' | 'check'
  amount?: string
}

export interface QuizQuestion {
  quiz_id: string
  table_type: '9max'
  matrix: 'matrix_3'
  hero_position: 'BTN' | 'SB' | 'BB' | 'UTG' | 'UTG+1' | 'MP' | 'MP+1' | 'HJ' | 'CO'
  hero_stack: string
  street: 'preflop' | 'flop' | 'turn' | 'river'
  hero_hand: string
  action_sequence: ActionSequence[]
  awaiting_action: 'HERO' | string
  question_text: string
  options: string[]
  correct_answer: string
  feedback: {
    [key: string]: string
  }
}

// Pergunta teste obrigatória (teste_001)
export const QUIZ_TESTE_001: QuizQuestion = {
  quiz_id: 'teste_001',
  table_type: '9max',
  matrix: 'matrix_3',
  hero_position: 'CO',
  hero_stack: '30bb',
  street: 'preflop',
  hero_hand: 'AKs',
  action_sequence: [
    { position: 'UTG', action: 'fold' },
    { position: 'UTG+1', action: 'fold' },
    { position: 'MP', action: 'fold' }
  ],
  awaiting_action: 'HERO',
  question_text: 'Você está no Cutoff (CO) em um torneio MTT com 30bb efetivos.\n\nUTG folda.\nUTG+1 folda.\nMP folda.\n\nA ação chega até você.\n\nQual é a melhor decisão pré-flop?',
  options: ['Fold', 'Call', 'Raise'],
  correct_answer: 'Raise',
  feedback: {
    'Raise': 'Correto. No CO, com 30bb e AKs, você tem posição e uma mão forte para abrir o pote.',
    'Call': 'Jogar passivamente em posição final com uma mão forte perde valor e iniciativa.',
    'Fold': 'AKs é uma mão forte demais para ser foldada no CO com 30bb.'
  }
}
