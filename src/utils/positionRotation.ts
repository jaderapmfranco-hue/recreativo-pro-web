// MATRIZ 3: Sistema de rotação de posições para mesa 9-max
// Hero sempre no S0 (embaixo), posições rotacionam seguindo ordem oficial

/**
 * Ordem oficial das posições em mesa 9-max:
 * BTN → SB → BB → UTG → UTG+1 → MP → MP+1 → HJ → CO → BTN (volta ao início)
 */
const POSITION_ORDER_9MAX = ['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO']

/**
 * Regra das cores por posição (TRAVADA):
 * 🔴 Vermelho: SB, BB, UTG, UTG+1
 * 🔵 Azul: MP, MP+1
 * 🟢 Verde: HJ, CO, BTN
 */
export const POSITION_COLORS: Record<string, 'red' | 'blue' | 'green'> = {
  'SB': 'red',
  'BB': 'red',
  'UTG': 'red',
  'UTG+1': 'red',
  'MP': 'blue',
  'MP+1': 'blue',
  'HJ': 'green',
  'CO': 'green',
  'BTN': 'green'
}

/**
 * Slots fixos da mesa (NUNCA MUDAM):
 * S0 = hero (fixo, embaixo)
 * S1 a S8 = outros jogadores
 */
export interface SlotAssignment {
  slot: number
  position: string
  color: 'red' | 'blue' | 'green'
  isHero: boolean
  isDealer: boolean
}

/**
 * Atribui posições aos slots seguindo a MATRIZ 3:
 * 1. Hero sempre no S0
 * 2. Atribui hero_position ao S0
 * 3. Preenche S1-S8 seguindo ordem oficial (BTN → SB → BB...)
 * 4. Cores aplicadas por posição (não por slot)
 * 5. Dealer sempre acompanha o BTN
 */
export function assignPositionsToSlots(heroPosition: string): SlotAssignment[] {
  const assignments: SlotAssignment[] = []
  
  // Encontrar índice da posição do hero na ordem oficial
  const heroIndex = POSITION_ORDER_9MAX.indexOf(heroPosition)
  
  if (heroIndex === -1) {
    throw new Error(`Posição inválida: ${heroPosition}`)
  }
  
  // Atribuir posições aos 9 slots
  for (let slot = 0; slot < 9; slot++) {
    // Calcular qual posição vai neste slot
    // S0 = hero, S1 = próxima posição na ordem, etc.
    const positionIndex = (heroIndex + slot) % 9
    const position = POSITION_ORDER_9MAX[positionIndex]
    const color = POSITION_COLORS[position]
    const isHero = slot === 0
    const isDealer = position === 'BTN'
    
    assignments.push({
      slot,
      position,
      color,
      isHero,
      isDealer
    })
  }
  
  return assignments
}

/**
 * Retorna a posição do dealer (sempre BTN)
 */
export function getDealerSlot(assignments: SlotAssignment[]): number {
  const dealerAssignment = assignments.find(a => a.isDealer)
  return dealerAssignment?.slot ?? 0
}

/**
 * Formata o stack para exibição (ex: "30bb" → "30bb")
 */
export function formatStack(stack: string): string {
  return stack
}

/**
 * Valida se uma posição é válida para 9-max
 */
export function isValidPosition(position: string): boolean {
  return POSITION_ORDER_9MAX.includes(position)
}
