// Estrutura de dados para perguntas do Quiz Iniciante

export interface ActionSequence {
  position: string
  action: 'fold' | 'call' | 'raise' | 'check'
  amount?: string
}

export interface QuizQuestion {
  quiz_id: string
  question_type: 'position_identification' | 'decision_making'
  hero_position: 'BTN' | 'SB' | 'BB' | 'UTG' | 'UTG+1' | 'MP' | 'MP+1' | 'HJ' | 'CO'
  hero_zone_color: 'Red' | 'Blue' | 'Green'
  dealer_position: 'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8'
  hero_cards?: string
  question_text: string
  options: string[]
  correct_answer: string
  feedback: {
    [key: string]: string
  }
}

// 5 Questões de Identificação de Posições
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Q1: Identificação do Botão
  {
    quiz_id: 'q1_btn',
    question_type: 'position_identification',
    hero_position: 'BTN',
    hero_zone_color: 'Green',
    dealer_position: 'S0',
    question_text: 'O botão de Dealer (D) está posicionado sobre você (Hero).\n\nQual o nome da sua posição e a cor da sua zona?',
    options: [
      'A) SB - Zona Vermelha',
      'B) BTN - Zona Verde',
      'C) BB - Zona Vermelha',
      'D) UTG - Zona Vermelha'
    ],
    correct_answer: 'B) BTN - Zona Verde',
    feedback: {
      'A) SB - Zona Vermelha': 'Incorreto. O Small Blind (SB) fica à esquerda do botão, não sobre ele.',
      'B) BTN - Zona Verde': 'Correto! O BTN (Button/Botão) é a melhor posição da mesa, representada pela Zona Verde. Você age por último em todas as rodadas pós-flop.',
      'C) BB - Zona Vermelha': 'Incorreto. O Big Blind (BB) fica duas posições à esquerda do botão.',
      'D) UTG - Zona Vermelha': 'Incorreto. UTG (Under the Gun) é a primeira posição a agir, muito distante do botão.'
    }
  },
  
  // Q2: O Primeiro a Agir (UTG)
  {
    quiz_id: 'q2_utg',
    question_type: 'position_identification',
    hero_position: 'UTG',
    hero_zone_color: 'Red',
    dealer_position: 'S6',
    question_text: 'Você é o primeiro a agir na rodada antes do Flop (Under the Gun).\n\nQual o nome abreviado da sua posição?',
    options: [
      'A) MP',
      'B) CO',
      'C) UTG',
      'D) BTN'
    ],
    correct_answer: 'C) UTG',
    feedback: {
      'A) MP': 'Incorreto. MP (Middle Position) fica depois de UTG e UTG+1.',
      'B) CO': 'Incorreto. CO (Cutoff) é uma posição tardia, próxima ao botão.',
      'C) UTG': 'Correto! UTG (Under the Gun) é a primeira posição a agir pré-flop, logo após o Big Blind. É a posição mais difícil da mesa (Zona Vermelha).',
      'D) BTN': 'Incorreto. BTN (Button) é a última posição a agir, a melhor da mesa.'
    }
  },
  
  // Q3: Small Blind
  {
    quiz_id: 'q3_sb',
    question_type: 'position_identification',
    hero_position: 'SB',
    hero_zone_color: 'Red',
    dealer_position: 'S8',
    question_text: 'O botão (D) está à sua direita imediata e você deve postar o blind menor.\n\nQual sua posição?',
    options: [
      'A) BB',
      'B) SB - Small Blind',
      'C) BTN',
      'D) CO'
    ],
    correct_answer: 'B) SB - Small Blind',
    feedback: {
      'A) BB': 'Incorreto. O BB (Big Blind) fica à esquerda do Small Blind e posta o blind maior.',
      'B) SB - Small Blind': 'Correto! O SB (Small Blind) fica imediatamente à esquerda do botão e posta metade do blind obrigatório. É uma posição difícil (Zona Vermelha) pois você age primeiro pós-flop.',
      'C) BTN': 'Incorreto. O BTN (Button) é quem tem o chip "D", não quem está à sua esquerda.',
      'D) CO': 'Incorreto. O CO (Cutoff) fica à direita do botão, não à esquerda.'
    }
  },
  
  // Q4: Big Blind e Zonas
  {
    quiz_id: 'q4_bb',
    question_type: 'position_identification',
    hero_position: 'BB',
    hero_zone_color: 'Red',
    dealer_position: 'S7',
    question_text: 'Você postou a aposta obrigatória maior (Big Blind).\n\nQual cor representa sua zona de risco na mesa?',
    options: [
      'A) Vermelha - Posição Inicial',
      'B) Azul - Posição Média',
      'C) Verde - Posição Final',
      'D) Amarela'
    ],
    correct_answer: 'A) Vermelha - Posição Inicial',
    feedback: {
      'A) Vermelha - Posição Inicial': 'Correto! O BB (Big Blind) está na Zona Vermelha junto com SB, UTG e UTG+1. São posições difíceis pois você age cedo nas rodadas pós-flop, com menos informação.',
      'B) Azul - Posição Média': 'Incorreto. A Zona Azul representa MP e MP+1 (Middle Positions).',
      'C) Verde - Posição Final': 'Incorreto. A Zona Verde representa HJ, CO e BTN (posições tardias/finais).',
      'D) Amarela': 'Incorreto. Não existe Zona Amarela no sistema de cores. As zonas são: Vermelha (inicial), Azul (média) e Verde (final).'
    }
  },
  
  // Q5: O Corte (Cutoff)
  {
    quiz_id: 'q5_co',
    question_type: 'position_identification',
    hero_position: 'CO',
    hero_zone_color: 'Green',
    dealer_position: 'S1',
    question_text: 'Você está sentado logo à direita do botão (BTN), na última posição da Zona Verde.\n\nQual sua posição?',
    options: [
      'A) HJ',
      'B) CO - Cutoff',
      'C) SB',
      'D) UTG'
    ],
    correct_answer: 'B) CO - Cutoff',
    feedback: {
      'A) HJ': 'Incorreto. O HJ (Hijack) fica à direita do CO, não entre o CO e o BTN.',
      'B) CO - Cutoff': 'Correto! O CO (Cutoff) é a penúltima posição da mesa, logo à direita do botão. É uma excelente posição (Zona Verde) com muita informação e flexibilidade estratégica.',
      'C) SB': 'Incorreto. O SB (Small Blind) fica à esquerda do botão, não à direita.',
      'D) UTG': 'Incorreto. UTG é a primeira posição a agir, muito longe do botão.'
    }
  }
]
