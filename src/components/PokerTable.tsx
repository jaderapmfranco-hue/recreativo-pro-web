import { SlotAssignment } from '../utils/positionRotation'

interface PokerTableProps {
  torneio?: string
  fase?: string
  stackEfetivo?: string
  acaoAteOMomento?: string
  // Novos props para estado dinâmico (MATRIZ 3)
  slotAssignments?: SlotAssignment[]
  heroHand?: string // Ex: "AKs" → renderiza A♠ K♠
}

/**
 * Coordenadas fixas dos slots (NUNCA MUDAM)
 * S0 = hero (embaixo)
 * S1-S8 = outros jogadores
 */
const SLOT_COORDINATES: Record<number, { x: number; y: number }> = {
  0: { x: 300, y: 255 }, // S0 - hero (embaixo)
  1: { x: 400, y: 255 }, // S1
  2: { x: 480, y: 230 }, // S2
  3: { x: 515, y: 150 }, // S3
  4: { x: 440, y: 55 },  // S4
  5: { x: 300, y: 45 },  // S5
  6: { x: 160, y: 55 },  // S6
  7: { x: 85, y: 150 },  // S7
  8: { x: 160, y: 245 }  // S8
}

/**
 * Parseia a mão do hero (ex: "AKs" → ["A♠", "K♠"])
 */
function parseHeroHand(hand: string): [string, string] {
  if (!hand || hand.length < 2) return ['A♠', 'K♠']
  
  const rank1 = hand[0].toUpperCase()
  const rank2 = hand[1].toUpperCase()
  const suited = hand.includes('s')
  
  // Se suited, ambas espadas; se offsuit, primeira espadas e segunda copas
  const suit1 = '♠'
  const suit2 = suited ? '♠' : '♥'
  
  return [`${rank1}${suit1}`, `${rank2}${suit2}`]
}

export default function PokerTable({
  torneio = 'MTT',
  fase = 'Início',
  stackEfetivo = '60 BB',
  acaoAteOMomento = 'Fold até o herói',
  slotAssignments,
  heroHand = 'AKs'
}: PokerTableProps) {
  const [card1, card2] = parseHeroHand(heroHand)
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Contexto Textual */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-slate-100 rounded-lg border border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1">Torneio</p>
          <p className="text-sm font-bold text-slate-900">{torneio}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1">Fase</p>
          <p className="text-sm font-bold text-slate-900">{fase}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1">Stack Efetivo</p>
          <p className="text-sm font-bold text-slate-900">{stackEfetivo}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="text-xs font-medium text-slate-500 mb-1">Ação</p>
          <p className="text-sm font-bold text-slate-900">{acaoAteOMomento}</p>
        </div>
      </div>

      {/* Mesa SVG */}
      <div className="p-4">
      <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" />
            <feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <style>{`
            .table-border { fill: #0f5132; }
            .table-felt { fill: #1e7f3b; }
            .seat { fill: #ffffff; stroke: #333; stroke-width: 1; }
            .hero-seat { fill: #ffd966; stroke: #b8860b; stroke-width: 2.5; }
            .label { font-family: 'Segoe UI', Arial; font-size: 9px; font-weight: bold; text-anchor: middle; dominant-baseline: middle; }
            .card-back { fill: #1e3a8a; stroke: #fff; stroke-width: 0.5; rx: 1.5; width: 10px; height: 15px; }
            .card-white { fill: #fff; stroke: #000; stroke-width: 0.8; rx: 2; width: 22px; height: 32px; }
            .suit-black { fill: #000; font-family: Arial; font-size: 12px; font-weight: bold; text-anchor: middle; }
            .suit-red { fill: #dc2626; font-family: Arial; font-size: 12px; font-weight: bold; text-anchor: middle; }
            
            .ring-red { fill: none; stroke: #ff4d4d; stroke-width: 3; opacity: 0.8; }
            .ring-blue { fill: none; stroke: #4d94ff; stroke-width: 3; opacity: 0.8; }
            .ring-green { fill: none; stroke: #4dff88; stroke-width: 3; opacity: 0.8; }
          `}</style>
        </defs>

        {/* Mesa */}
        <rect x="70" y="60" width="460" height="180" rx="90" className="table-border" />
        <rect x="75" y="65" width="450" height="170" rx="85" className="table-felt" />

        {/* Renderizar slots dinamicamente se slotAssignments fornecido */}
        {slotAssignments ? (
          slotAssignments.map((assignment) => {
            const coords = SLOT_COORDINATES[assignment.slot]
            const ringClass = `ring-${assignment.color}`
            const isHero = assignment.isHero
            const seatClass = isHero ? 'hero-seat' : 'seat'
            
            return (
              <g key={assignment.slot} transform={`translate(${coords.x},${coords.y})`}>
                {/* Anel colorido */}
                <circle r={isHero ? 20 : 18} className={ringClass}/>
                
                {/* Assento */}
                <circle r={isHero ? 16 : 14} className={seatClass} filter={isHero ? 'url(#shadow)' : undefined}/>
                
                {/* Label da posição */}
                <text className="label">{assignment.position}</text>
                
                {/* Dealer button se for BTN */}
                {assignment.isDealer && (
                  <>
                    <circle cx="0" cy="-25" r="7" fill="#fff" stroke="#333" strokeWidth="1"/>
                    <text x="0" y="-25" className="label" fontSize="8">D</text>
                  </>
                )}
                
                {/* Cartas */}
                {isHero ? (
                  // Hero: cartas abertas
                  <>
                    <rect x="-24" y="22" className="card-white"/>
                    <text x="-13" y="42" className={card1.includes('♥') || card1.includes('♦') ? 'suit-red' : 'suit-black'}>{card1}</text>
                    <rect x="2" y="22" className="card-white"/>
                    <text x="13" y="42" className={card2.includes('♥') || card2.includes('♦') ? 'suit-red' : 'suit-black'}>{card2}</text>
                  </>
                ) : (
                  // Vilões: cartas fechadas
                  <>
                    <rect x="-8" y="-44" className="card-back" transform="rotate(-5)"/>
                    <rect x="2" y="-44" className="card-back" transform="rotate(5)"/>
                  </>
                )}
              </g>
            )
          })
        ) : (
          // Modo estático (fallback para compatibilidade)
          <>
            {/* SB (Herói) */}
            <g transform="translate(300,255)">
              <circle r="20" className="ring-red"/>
              <circle r="16" className="hero-seat" filter="url(#shadow)"/><text className="label">SB</text>
              <rect x="-24" y="22" className="card-white"/><text x="-13" y="42" className="suit-black">A♠</text>
              <rect x="2" y="22" className="card-white"/><text x="13" y="42" className="suit-black">K♠</text>
            </g>

            {/* BB */}
            <g transform="translate(160,245)">
              <circle r="18" className="ring-red"/><circle r="14" className="seat"/><text className="label">BB</text>
              <rect x="15" y="-15" className="card-back" transform="rotate(10)"/><rect x="22" y="-12" className="card-back" transform="rotate(20)"/>
            </g>

            {/* UTG */}
            <g transform="translate(85,150)">
              <circle r="18" className="ring-red"/><circle r="14" className="seat"/><text className="label">UTG</text>
              <rect x="18" y="-5" className="card-back" transform="rotate(80)"/><rect x="18" y="2" className="card-back" transform="rotate(90)"/>
            </g>

            {/* UTG+1 */}
            <g transform="translate(160,55)">
              <circle r="18" className="ring-red"/><circle r="14" className="seat"/><text className="label">UTG+1</text>
              <rect x="5" y="16" className="card-back" transform="rotate(-10)"/><rect x="-5" y="16" className="card-back" transform="rotate(10)"/>
            </g>

            {/* MP */}
            <g transform="translate(300,45)">
              <circle r="18" className="ring-blue"/><circle r="14" className="seat"/><text className="label">MP</text>
              <rect x="-12" y="16" className="card-back"/><rect x="2" y="16" className="card-back"/>
            </g>

            {/* MP+1 */}
            <g transform="translate(440,55)">
              <circle r="18" className="ring-blue"/><circle r="14" className="seat"/><text className="label">MP+1</text>
              <rect x="-10" y="16" className="card-back" transform="rotate(10)"/><rect x="0" y="16" className="card-back" transform="rotate(-10)"/>
            </g>

            {/* HJ */}
            <g transform="translate(515,150)">
              <circle r="18" className="ring-green"/><circle r="14" className="seat"/><text className="label">HJ</text>
              <rect x="-28" y="2" className="card-back" transform="rotate(-90)"/><rect x="-28" y="-5" className="card-back" transform="rotate(-80)"/>
            </g>

            {/* CO */}
            <g transform="translate(480,230)">
              <circle r="18" className="ring-green"/><circle r="14" className="seat"/><text className="label">CO</text>
              <rect x="-24" y="-10" className="card-back" transform="rotate(-20)"/><rect x="-32" y="-12" className="card-back" transform="rotate(-10)"/>
            </g>

            {/* BTN */}
            <g transform="translate(400,255)">
              <circle r="18" className="ring-green"/><circle r="14" className="seat"/><text className="label">BTN</text>
              <circle cx="0" cy="-25" r="7" fill="#fff" stroke="#333" strokeWidth="1"/>
              <text x="0" y="-25" className="label" fontSize="8">D</text>
              <rect x="-8" y="-44" className="card-back" transform="rotate(-5)"/><rect x="2" y="-44" className="card-back" transform="rotate(5)"/>
            </g>
          </>
        )}

      </svg>
      </div>
    </div>
  )
}
