import { Star, Flame, Lock, Clock, CheckCircle } from 'lucide-react'

const GOLD = '#C19A6B'
const GOLD_DIM = '#8B6B3D'
const BG3 = '#0F0F18'
const BORDER = '#1E1E2E'
const TEXT = '#E8E8F0'
const TEXT_DIM = '#6B6B80'
const TEXT_MID = '#A0A0B8'

function AIScoreBadge({ score }) {
  const color = score >= 85 ? '#22C55E' : score >= 70 ? GOLD : '#EF4444'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <div style={{ fontSize: 8, color: GOLD, fontWeight: 700, letterSpacing: 1 }}>AI</div>
      <div style={{ fontSize: 12, fontWeight: 800, color, fontFamily: 'monospace' }}>{score}</div>
    </div>
  )
}

export default function MatchRow({ match, lang, t, darkMode, isSelected, onClick, isFavorite, onToggleFavorite }) {
  const statusColor = match.status === 'live' ? '#EF4444' : match.status === 'finished' ? TEXT_DIM : TEXT_MID
  const bg = darkMode ? '#050507' : '#F5F5F0'
  const cardBg = darkMode ? '#0A0A0F' : '#FFFFFF'
  const border = darkMode ? BORDER : '#E5E5E0'
  const textColor = darkMode ? TEXT : '#111111'
  const textMid = darkMode ? TEXT_MID : '#666666'

  const StatusIcon = () => {
    if (match.status === 'live') return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', animation: 'pulse 1.5s infinite', boxShadow: '0 0 6px #EF4444' }} />
        <span style={{ fontSize: 10, fontWeight: 700, color: '#EF4444', fontFamily: 'monospace' }}>{match.minute}</span>
      </div>
    )
    if (match.status === 'finished') return <CheckCircle size={12} color='#6B6B80' />
    return <Clock size={12} color={TEXT_MID} />
  }

  if (match.premium) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '24px 24px 52px 1fr 90px 80px 40px', alignItems: 'center', padding: '10px 16px', borderBottom: `1px solid ${border}`, background: darkMode ? '#080810' : '#F8F8F8', opacity: 0.7, position: 'relative', cursor: 'pointer' }}
        onClick={onClick}
      >
        <div />
        <div />
        <div style={{ fontSize: 10, color: TEXT_DIM, fontFamily: 'monospace' }}>{match.time}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: textMid }}>{match.home.name}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: textMid }}>{match.away.name}</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[match.odds.home, match.odds.draw, match.odds.away].map((odd, i) => (
            odd !== null ? (
              <div key={i} style={{ background: darkMode ? BG3 : '#F0F0F0', border: `1px solid ${border}`, borderRadius: 4, padding: '3px 5px', textAlign: 'center', minWidth: 26, filter: 'blur(3px)' }}>
                <div style={{ fontSize: 7, color: TEXT_DIM }}>{['1','X','2'][i]}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: textColor, fontFamily: 'monospace' }}>{odd.toFixed(2)}</div>
              </div>
            ) : <div key={i} style={{ minWidth: 26 }} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, filter: 'blur(3px)' }}>
          <div style={{ fontSize: 8, color: GOLD, fontWeight: 700 }}>AI</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: GOLD, fontFamily: 'monospace' }}>{match.aiScore}</div>
        </div>
        {/* Premium Overlay */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: darkMode ? 'rgba(5,5,7,0.6)' : 'rgba(245,245,240,0.7)', backdropFilter: 'blur(1px)' }}>
          <Lock size={14} color={GOLD} />
          <span style={{ fontSize: 11, color: GOLD, fontWeight: 700, letterSpacing: 0.5 }}>{t.vipRequired}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      style={{
        display: 'grid', gridTemplateColumns: '24px 24px 52px 1fr 90px 80px 40px',
        alignItems: 'center', padding: '10px 16px', cursor: 'pointer',
        borderBottom: `1px solid ${border}`,
        background: isSelected ? (darkMode ? '#0D0D1A' : '#F0F0F8') : 'transparent',
        borderLeft: isSelected ? `2px solid ${GOLD}` : '2px solid transparent',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = darkMode ? '#080810' : '#F8F8F8' }}
      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
    >
      {/* Favori Yıldız */}
      <div onClick={e => { e.stopPropagation(); onToggleFavorite(match) }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Star size={13} color={isFavorite ? GOLD : TEXT_DIM} fill={isFavorite ? GOLD : 'none'} />
      </div>

      {/* Hot / Boş */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {match.hot && <Flame size={13} color='#EF4444' fill='#EF4444' />}
      </div>

      {/* Saat / Durum */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <StatusIcon />
        {match.status !== 'live' && (
          <span style={{ fontSize: 10, color: statusColor, fontFamily: 'monospace', fontWeight: 700 }}>
            {match.status === 'finished' ? (t.finished) : match.time}
          </span>
        )}
      </div>

      {/* Takımlar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: textColor }}>{lang === 'en' ? match.home.nameEn : match.home.name}</span>
          {match.home.score !== null && (
            <span style={{ fontSize: 13, fontWeight: 800, color: match.home.score > match.away.score ? GOLD : textColor, fontFamily: 'monospace' }}>{match.home.score}</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: textMid }}>{lang === 'en' ? match.away.nameEn : match.away.name}</span>
          {match.away.score !== null && (
            <span style={{ fontSize: 13, fontWeight: 800, color: match.away.score > match.home.score ? GOLD : textMid, fontFamily: 'monospace' }}>{match.away.score}</span>
          )}
        </div>
      </div>

      {/* Oranlar */}
      <div style={{ display: 'flex', gap: 3 }}>
        {[match.odds.home, match.odds.draw, match.odds.away].map((odd, i) => (
          odd !== null ? (
            <div key={i} style={{ background: darkMode ? BG3 : '#F0F0F0', border: `1px solid ${border}`, borderRadius: 4, padding: '3px 4px', textAlign: 'center', minWidth: 24 }}>
              <div style={{ fontSize: 7, color: TEXT_DIM, marginBottom: 1 }}>{['1','X','2'][i]}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: textColor, fontFamily: 'monospace' }}>{odd.toFixed(2)}</div>
            </div>
          ) : <div key={i} style={{ minWidth: 24 }} />
        ))}
      </div>

      {/* AI Skoru */}
      <AIScoreBadge score={match.aiScore} />

      {/* Ok */}
      <div style={{ color: isSelected ? GOLD : TEXT_DIM, fontSize: 12, textAlign: 'center' }}>›</div>
    </div>
  )
}