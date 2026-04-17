import { Star } from 'lucide-react'

const GOLD = '#C19A6B'
const GOLD_DIM = '#8B6B3D'
const TEXT_DIM = '#6B6B80'

export default function Sidebar({ darkMode, lang, t, leagues, activeLeague, setActiveLeague, favorites, setFavorites }) {
  const bg = darkMode ? '#0A0A0F' : '#FAFAFA'
  const border = darkMode ? '#1E1E2E' : '#E5E5E0'
  const textColor = darkMode ? '#E8E8F0' : '#111111'

  return (
    <div style={{ width: 200, flexShrink: 0, background: bg, borderRight: `1px solid ${border}`, overflowY: 'auto', padding: '12px 0' }}>
      <div style={{ fontSize: 8, color: GOLD, fontWeight: 700, letterSpacing: 2, padding: '0 16px 8px', textTransform: 'uppercase' }}>
        {t.leagues}
      </div>

      {leagues.map(league => {
        const name = lang === 'tr' ? league.name : league.nameEn
        const isActive = activeLeague === league.id
        return (
          <div
            key={league.id}
            onClick={() => setActiveLeague(isActive ? null : league.id)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '9px 16px', cursor: 'pointer',
              background: isActive ? (darkMode ? '#0F0F1A' : '#F0F0E8') : 'transparent',
              borderLeft: isActive ? `2px solid ${GOLD}` : '2px solid transparent',
              transition: 'all 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = darkMode ? '#0A0A14' : '#F5F5EE'}
            onMouseLeave={e => e.currentTarget.style.background = isActive ? (darkMode ? '#0F0F1A' : '#F0F0E8') : 'transparent'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13 }}>{league.country}</span>
              <span style={{ fontSize: 11, color: isActive ? GOLD : textColor, fontWeight: isActive ? 700 : 400 }}>
                {name}
              </span>
            </div>
            <span style={{ fontSize: 9, color: TEXT_DIM, fontFamily: 'monospace' }}>{league.count}</span>
          </div>
        )
      })}

      {/* Favoriler */}
      {favorites.length > 0 && (
        <>
          <div style={{ height: 1, background: darkMode ? '#1E1E2E' : '#E5E5E0', margin: '12px 0' }} />
          <div style={{ fontSize: 8, color: GOLD, fontWeight: 700, letterSpacing: 2, padding: '0 16px 8px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={9} fill={GOLD} color={GOLD} />
            {lang === 'tr' ? 'Favoriler' : 'Favorites'}
          </div>
          {favorites.map(fav => (
            <div key={fav.id} style={{ padding: '8px 16px', fontSize: 11, color: textColor, borderLeft: '2px solid transparent' }}>
              <div style={{ fontWeight: 600 }}>{fav.home} vs {fav.away}</div>
              <div style={{ fontSize: 9, color: TEXT_DIM, marginTop: 2 }}>{fav.time}</div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}