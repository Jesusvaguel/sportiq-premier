import { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MatchRow from './components/MatchRow'
import DetailPanel from './components/DetailPanel'
import { translations } from './i18n/translations'
import { leagues, matchData } from './data/matches'
import { fetchTodayMatches, transformMatches } from './data/api'

const GOLD = '#C19A6B'
const BORDER = '#1E1E2E'
const TEXT_DIM = '#6B6B80'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [lang, setLang] = useState('tr')
  const [activeSport, setActiveSport] = useState('all')
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [activeLeague, setActiveLeague] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [apiMatches, setApiMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [useRealData, setUseRealData] = useState(false)

  const t = translations[lang]
  const bg = darkMode ? '#050507' : '#F5F5F0'
  const border = darkMode ? BORDER : '#E5E5E0'

  // API'den veri çek
  useEffect(() => {
    async function loadMatches() {
      setLoading(true)
      try {
        const data = await fetchTodayMatches()
        if (data && data.data && data.data.length > 0) {
          const transformed = transformMatches(data)
          setApiMatches(transformed)
          setUseRealData(true)
        }
      } catch (err) {
        console.log('API bağlanamadı, örnek veri kullanılıyor')
      } finally {
        setLoading(false)
      }
    }
    loadMatches()

    // Her 60 saniyede güncelle
    const interval = setInterval(loadMatches, 60000)
    return () => clearInterval(interval)
  }, [])

  const displayData = useRealData ? apiMatches : matchData

  const allMatches = displayData.flatMap(l => l.matches)
  const selectedMatchData = allMatches.find(m => m.id === selectedMatch)

  const handleToggleFavorite = (match) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === match.id)
      if (exists) return prev.filter(f => f.id !== match.id)
      return [...prev, {
        id: match.id,
        home: lang === 'en' ? match.home.nameEn : match.home.name,
        away: lang === 'en' ? match.away.nameEn : match.away.name,
        time: match.time
      }]
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: bg, fontFamily: "'SF Pro Display', 'Segoe UI', system-ui, sans-serif" }}>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        lang={lang}
        setLang={setLang}
        t={t}
        activeSport={activeSport}
        setActiveSport={setActiveSport}
      />

      <div style={{ display: 'flex', height: 'calc(100vh - 52px)' }}>

        <Sidebar
          darkMode={darkMode}
          lang={lang}
          t={t}
          leagues={leagues}
          activeLeague={activeLeague}
          setActiveLeague={setActiveLeague}
          favorites={favorites}
          setFavorites={setFavorites}
        />

        {/* Orta Feed */}
        <div style={{ flex: 1, overflowY: 'auto', borderRight: selectedMatch ? `1px solid ${border}` : 'none' }}>

          {/* Durum Çubuğu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: darkMode ? '#080810' : '#F0F0E8', borderBottom: `1px solid ${border}` }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: useRealData ? '#22C55E' : GOLD }} />
            <span style={{ fontSize: 9, color: useRealData ? '#22C55E' : GOLD, fontWeight: 700, letterSpacing: 1 }}>
              {loading ? (lang === 'tr' ? 'VERİ YÜKLENİYOR...' : 'LOADING DATA...') : useRealData ? (lang === 'tr' ? 'CANLI VERİ' : 'LIVE DATA') : (lang === 'tr' ? 'ÖRNEK VERİ' : 'DEMO DATA')}
            </span>
            {useRealData && (
              <span style={{ fontSize: 9, color: TEXT_DIM, marginLeft: 'auto' }}>
                {lang === 'tr' ? 'Her 60sn güncellenir' : 'Updates every 60s'}
              </span>
            )}
          </div>

          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, flexDirection: 'column', gap: 12 }}>
              <div style={{ width: 24, height: 24, border: `2px solid ${GOLD}`, borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: 11, color: TEXT_DIM }}>{lang === 'tr' ? 'Maçlar yükleniyor...' : 'Loading matches...'}</span>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            displayData.map(group => {
              const leagueName = lang === 'en' ? group.leagueEn : group.league
              return (
                <div key={group.league}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px', background: darkMode ? '#0F0F18' : '#F5F5F0', borderBottom: `1px solid ${border}`, position: 'sticky', top: 0, zIndex: 10 }}>
                    <span style={{ fontSize: 12 }}>{group.leagueFlag}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: darkMode ? '#E8E8F0' : '#111' }}>{leagueName}</span>
                    <div style={{ flex: 1, height: 1, background: border, marginLeft: 8 }} />
                    <span style={{ fontSize: 9, color: TEXT_DIM, fontFamily: 'monospace' }}>{group.matches.length} {lang === 'tr' ? 'maç' : 'matches'}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '24px 24px 52px 1fr 90px 80px 40px', padding: '4px 16px', borderBottom: `1px solid ${border}` }}>
                    {['', '', t.time, t.teams, t.odds, t.ai, ''].map((h, i) => (
                      <div key={i} style={{ fontSize: 8, color: TEXT_DIM, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', textAlign: i === 5 ? 'center' : 'left' }}>{h}</div>
                    ))}
                  </div>

                  {group.matches.map(match => (
                    <MatchRow
                      key={match.id}
                      match={match}
                      lang={lang}
                      t={t}
                      darkMode={darkMode}
                      isSelected={selectedMatch === match.id}
                      onClick={() => setSelectedMatch(selectedMatch === match.id ? null : match.id)}
                      isFavorite={!!favorites.find(f => f.id === match.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              )
            })
          )}
        </div>

        {/* Sağ Detay Paneli */}
        {selectedMatch && (
          <div style={{ width: 320, flexShrink: 0, borderLeft: `1px solid ${border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <DetailPanel
              match={selectedMatchData}
              lang={lang}
              t={t}
              darkMode={darkMode}
              onClose={() => setSelectedMatch(null)}
            />
          </div>
        )}
      </div>
    </div>
  )
}