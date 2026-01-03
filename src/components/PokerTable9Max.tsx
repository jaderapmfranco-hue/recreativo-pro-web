/**
 * PokerTable9Max - Componente de mesa 9-max dinâmico
 * 
 * Motor universal para todas as questões do quiz.
 * S0 (inferior central) é sempre fixo como Hero.
 * 
 * Props dinâmicos:
 * - hero_label: Texto dentro do assento S0 (ex: BTN, SB, UTG)
 * - hero_zone_color: Cor do anel (Red, Blue, Green)
 * - dealer_position: ID do assento onde chip "D" aparece (S0-S8)
 */

interface PokerTable9MaxProps {
  hero_label: string
  hero_zone_color: 'Red' | 'Blue' | 'Green'
  dealer_position: 'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8'
  hero_cards?: string // ex: "A♠ K♠"
}

/**
 * Coordenadas fixas dos 9 assentos (NUNCA MUDAM)
 */
const SEAT_COORDINATES: Record<string, { x: number; y: number }> = {
  'S0': { x: 300, y: 255 }, // Hero (inferior central)
  'S1': { x: 400, y: 255 }, // Direita inferior
  'S2': { x: 480, y: 230 }, // Direita meio-inferior
  'S3': { x: 515, y: 150 }, // Direita meio
  'S4': { x: 440, y: 55 },  // Direita superior
  'S5': { x: 300, y: 45 },  // Centro superior
  'S6': { x: 160, y: 55 },  // Esquerda superior
  'S7': { x: 85, y: 150 },  // Esquerda meio
  'S8': { x: 160, y: 245 }  // Esquerda inferior
}

/**
 * Labels padrão para cada assento (ordem horária a partir de S0)
 */
const DEFAULT_SEAT_LABELS: Record<string, string> = {
  'S0': 'Hero', // Será substituído por hero_label
  'S1': 'SB',
  'S2': 'BB',
  'S3': 'UTG',
  'S4': 'UTG+1',
  'S5': 'MP',
  'S6': 'MP+1',
  'S7': 'HJ',
  'S8': 'CO'
}

/**
 * Mapeamento de cores para classes CSS
 */
const ZONE_COLOR_CLASS: Record<string, string> = {
  'Red': 'rr',
  'Blue': 'rb',
  'Green': 'rg'
}

export default function PokerTable9Max({
  hero_label,
  hero_zone_color,
  dealer_position,
  hero_cards = 'A♠ K♠'
}: PokerTable9MaxProps) {
  const zoneClass = ZONE_COLOR_CLASS[hero_zone_color]
  const dealerCoords = SEAT_COORDINATES[dealer_position]
  
  // Renderizar assento de vilão (S1-S8)
  const renderVillainSeat = (seatId: string) => {
    const coords = SEAT_COORDINATES[seatId]
    const label = DEFAULT_SEAT_LABELS[seatId]
    
    return (
      <g key={seatId} transform={`translate(${coords.x},${coords.y})`}>
        {/* Círculo do assento */}
        <circle r="16" className="st" filter="url(#shadow)"/>
        {/* Label da posição */}
        <text className="lb" y="-22">{label}</text>
        {/* Cartas fechadas (verso azul) */}
        <g transform="translate(-8, 5)">
          <rect x="0" y="0" width="7" height="10" rx="1" fill="#1e40af" stroke="#1e3a8a" strokeWidth="0.5"/>
          <rect x="9" y="0" width="7" height="10" rx="1" fill="#1e40af" stroke="#1e3a8a" strokeWidth="0.5"/>
        </g>
      </g>
    )
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" />
            <feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <style>{`
            .tb { fill: #0f5132; } /* table-border */
            .tf { fill: #1e7f3b; } /* table-felt */
            .st { fill: #ffffff; stroke: #333; stroke-width: 1; } /* seat */
            .hs { fill: #ffd966; stroke: #b8860b; stroke-width: 2.5; } /* hero-seat */
            .lb { font-family: 'Segoe UI', Arial; font-size: 9px; font-weight: bold; text-anchor: middle; dominant-baseline: middle; fill: #333; }
            .rr { fill: none; stroke: #ff4d4d; stroke-width: 3; opacity: 0.8; } /* ring-red */
            .rb { fill: none; stroke: #4d94ff; stroke-width: 3; opacity: 0.8; } /* ring-blue */
            .rg { fill: none; stroke: #4dff88; stroke-width: 3; opacity: 0.8; } /* ring-green */
            .card-text { font-family: 'Segoe UI', Arial; font-size: 7px; font-weight: bold; text-anchor: middle; dominant-baseline: middle; }
          `}</style>
        </defs>
        
        {/* Mesa */}
        <rect x="70" y="60" width="460" height="180" rx="90" className="tb" />
        <rect x="75" y="65" width="450" height="170" rx="85" className="tf" />

        {/* Assentos dos Vilões (S1-S8) */}
        {['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'].map(renderVillainSeat)}

        {/* Assento do Hero (S0) - Fixo */}
        <g id="hero_seat" transform={`translate(${SEAT_COORDINATES.S0.x},${SEAT_COORDINATES.S0.y})`}>
          <circle r="20" className={zoneClass}/>
          <circle r="16" className="hs" filter="url(#shadow)"/>
          <text className="lb">{hero_label}</text>
          
          {/* Cartas do Hero (abertas) */}
          <g transform="translate(-12, 5)">
            {/* Primeira carta */}
            <rect x="0" y="0" width="10" height="14" rx="1" fill="#ffffff" stroke="#333" strokeWidth="0.5"/>
            <text className="card-text" x="5" y="7" fill="#000">{hero_cards.split(' ')[0]}</text>
            
            {/* Segunda carta */}
            <rect x="14" y="0" width="10" height="14" rx="1" fill="#ffffff" stroke="#333" strokeWidth="0.5"/>
            <text className="card-text" x="19" y="7" fill="#000">{hero_cards.split(' ')[1]}</text>
          </g>
        </g>

        {/* Chip Dealer (D) - Dinâmico */}
        <g id="dealer_chip" transform={`translate(${dealerCoords.x},${dealerCoords.y - 25})`}>
          <circle r="7" fill="#fff" stroke="#333" strokeWidth="1"/>
          <text className="lb" fontSize="8">D</text>
        </g>
      </svg>
    </div>
  )
}
