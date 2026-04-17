import { useState } from 'react'
import { X, TrendingUp, CheckCircle } from 'lucide-react'

const GOLD = '#C19A6B'
const GOLD_DIM = '#8B6B3D'
const BORDER_GOLD = '#2A2210'
const BG2 = '#0A0A0F'
const BG3 = '#0F0F18'
const BORDER = '#1E1E2E'
const TEXT = '#E8E8F0'
const TEXT_DIM = '#6B6B80'
const TEXT_MID = '#A0A0B8'

function FormBadge({ result }) {
  const colors = {
    W: { bg: '#0A2A1A', text: '#22C55E', border: '#166534' },
    D: { bg: '#1A1A0A', text: '#EAB308', border: '#854D0E' },
    L: { bg: '#2A0A0A', text: '#EF4444', border: '#991B1B' }
  }
  const c = colors[result]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: 4, background: c.bg, color: c.text, border: `1px solid ${c.border}`, fontSize: 10, fontWeight: 700, fontFamily: 'monospace' }}>
      {result}
    </span>
  )
}

function RecentMatchBox({ match, darkMode }) {
  const color = match.result === 'W' ? '#22C55E' : match.result === 'L' ? '#EF4444' : '#EAB308'
  const bg = match.result === 'W' ? '#0A2A1A' : match.result === 'L' ? '#2A0A0A' : '#1A1A0A'
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: darkMode ? bg : '#F5F5F0', borderRadius: 6, border: `1px solid ${darkMode ? BORDER : '#E0E0D8'}`, marginBottom: 5 }}>
      <span style={{ fontSize: 10, color: darkMode ? TEXT_MID : '#666', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{match.opponent}</span>
      <span style={{ fontSize: 11, fontWeight: 700, color: darkMode ? TEXT : '#111', fontFamily: 'monospace' }}>{match.score}</span>
      <span style={{ fontSize: 9, fontWeight: 800, color, background: bg, padding: '2px 6px', borderRadius: 4 }}>{match.result}</span>
    </div>
  )
}

function ConfidenceMeter({ confidence, t, darkMode }) {
  const color = confidence >= 85 ? '#22C55E' : confidence >= 70 ? GOLD : '#EF4444'
  const label = confidence >= 85 ? t.strongValue : confidence >= 70 ? t.goodValue : t.moderateValue
  return (
    <div style={{ background: darkMode ? BG3 : '#F5F5F0', border: `1px solid ${darkMode ? BORDER : '#E0E0D8'}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <TrendingUp size={12} color={GOLD} />
          <span style={{ fontSize: 9, color: GOLD, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>{t.confidence}</span>
        </div>
        <span style={{ fontSize: 9, color, fontWeight: 700, letterSpacing: 1 }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 6, background: darkMode ? BORDER : '#E0E0D8', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${confidence}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 0.5s' }} />
        </div>
        <span style={{ fontSize: 16, fontWeight: 900, color, fontFamily: 'monospace', minWidth: 40 }}>{confidence}%</span>
      </div>
    </div>
  )
}

function SuccessRate({ history, t, darkMode }) {
  const wins = history.filter(Boolean).length
  return (
    <div style={{ background: darkMode ? BG3 : '#F5F5F0', border: `1px solid ${darkMode ? BORDER : '#E0E0D8'}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 9, color: GOLD, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>{t.successRate}</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: '#22C55E', fontFamily: 'monospace' }}>{wins}/5</span>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {history.map((success, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <CheckCircle size={16} color={success ? '#22C55E' : TEXT_DIM} fill={success ? '#0A2A1A' : 'none'} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: success ? '#22C55E' : TEXT_DIM }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DetailPanel({ match, lang, t, darkMode, onClose }) {
  const [tab, setTab] = useState('analiz')

  const bg = darkMode ? BG2 : '#FAFAFA'
  const border = darkMode ? BORDER : '#E5E5E0'
  const textColor = darkMode ? TEXT : '#111111'
  const textDim = darkMode ? TEXT_DIM : '#888888'

  if (!match) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12, background: bg }}>
      <div style={{ fontSize: 32, opacity: 0.1, color: GOLD }}>◈</div>
      <div style={{ color: textDim, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>{t.selectMatch}</div>
    </div>
  )

  const tabs = ['analiz', 'form', 'h2h', 'sakatlık']
  const tabLabels = {
    analiz: t.aiAnalysis, form: t.form, h2h: t.h2h, sakatlık: t.injuries
  }
  const analysis = lang === 'en' ? match.aiAnalysisEn : match.aiAnalysis
  const homeName = lang === 'en' ? match.home.nameEn : match.home.name
  const awayName = lang === 'en' ? match.away.nameEn : match.away.name

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: bg }}>

      {/* Panel Header */}
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${border}`, background: bg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 8, color: GOLD, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{t.detailAnalysis}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: textDim, cursor: 'pointer', fontSize: 16, padding: 0, display: 'flex' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: textColor }}>
            {homeName} <span style={{ color: GOLD }}>vs</span> {awayName}
          </div>
          {match.home.score !== null && (
            <div style={{ fontSize: 26, fontWeight: 900, color: GOLD, fontFamily: 'monospace', margin: '6px 0' }}>
              {match.home.score} — {match.away.score}
            </div>
          )}
          {match.home.ht !== null && (
            <span style={{ fontSize: 10, color: textDim, fontFamily: 'monospace' }}>{t.halfTime}: {match.home.ht}-{match.away.ht}</span>
          )}
        </div>

        {/* Canlı İstatistikler */}
        {match.status === 'live' && match.possession && (
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              { label: lang === 'tr' ? 'Top Kontrolü' : 'Possession', home: match.possession.home, away: match.possession.away, unit: '%' },
              { label: lang === 'tr' ? 'Şut' : 'Shots', home: match.shots.home, away: match.shots.away, unit: '' },
              { label: lang === 'tr' ? 'Korner' : 'Corners', home: match.corners.home, away: match.corners.away, unit: '' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: textDim, marginBottom: 3 }}>
                  <span style={{ fontFamily: 'monospace', color: textColor }}>{stat.home}{stat.unit}</span>
                  <span style={{ letterSpacing: 1, textTransform: 'uppercase' }}>{stat.label}</span>
                  <span style={{ fontFamily: 'monospace', color: textColor }}>{stat.away}{stat.unit}</span>
                </div>
                <div style={{ display: 'flex', height: 3, borderRadius: 2, overflow: 'hidden', background: darkMode ? BG3 : '#E0E0D8' }}>
                  <div style={{ width: `${stat.home / (stat.home + stat.away) * 100}%`, background: GOLD }} />
                  <div style={{ flex: 1, background: '#1E3A5F' }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tab Nav */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${border}`, background: bg }}>
        {tabs.map(tab_ => (
          <button key={tab_} onClick={() => setTab(tab_)} style={{
            flex: 1, padding: '9px 0', background: 'none', border: 'none',
            borderBottom: tab === tab_ ? `2px solid ${GOLD}` : '2px solid transparent',
            color: tab === tab_ ? GOLD : textDim,
            cursor: 'pointer', fontSize: 8, fontWeight: 700, letterSpacing: 1.5,
            textTransform: 'uppercase', transition: 'all 0.15s'
          }}>
            {tabLabels[tab_]}
          </button>
        ))}
      </div>

      {/* Tab İçeriği */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>

        {tab === 'analiz' && (
          <div>
            <ConfidenceMeter confidence={match.confidence} t={t} darkMode={darkMode} />
            <SuccessRate history={match.successHistory} t={t} darkMode={darkMode} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: GOLD }} />
              <span style={{ fontSize: 8, color: GOLD, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>SportIQ Premier AI</span>
            </div>
            <div style={{ background: darkMode ? BORDER_GOLD : '#FFF8F0', border: `1px solid ${GOLD_DIM}`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: textColor, lineHeight: 1.8 }}>{analysis}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
              {[
                { label: t.homeTeam, val: match.odds.home?.toFixed(2), key: '1' },
                { label: t.draw, val: match.odds.draw?.toFixed(2) || '—', key: 'X' },
                { label: t.awayTeam, val: match.odds.away?.toFixed(2), key: '2' },
              ].map(o => (
                <div key={o.key} style={{ background: darkMode ? BG3 : '#F5F5F0', border: `1px solid ${border}`, borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 8, color: textDim, marginBottom: 3 }}>{o.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: GOLD, fontFamily: 'monospace' }}>{o.val}</div>
                  <div style={{ fontSize: 8, color: textDim, marginTop: 2 }}>{o.key}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'form' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { name: homeName, form: match.form.home, recent: match.recentMatches.home },
              { name: awayName, form: match.form.away, recent: match.recentMatches.away },
            ].map(team => (
              <div key={team.name}>
                <div style={{ fontSize: 10, color: darkMode ? TEXT_MID : '#666', fontWeight: 700, marginBottom: 8 }}>{team.name}</div>
                <div style={{ display: 'flex', gap: 5, marginBottom: 6 }}>
                  {team.form.map((r, i) => <FormBadge key={i} result={r} />)}
                </div>
                <div style={{ fontSize: 9, color: textDim, marginBottom: 10 }}>
                  W: {team.form.filter(r=>r==='W').length} · D: {team.form.filter(r=>r==='D').length} · L: {team.form.filter(r=>r==='L').length}
                </div>
                <div style={{ fontSize: 8, color: GOLD, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>
                  {t.lastPredictions}
                </div>
                {team.recent.map((m, i) => <RecentMatchBox key={i} match={m} darkMode={darkMode} />)}
              </div>
            ))}
          </div>
        )}

        {tab === 'h2h' && (
          <div>
            <div style={{ fontSize: 8, color: GOLD, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>{t.h2h}</div>
            {match.h2h.map((game, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: darkMode ? BG3 : '#F5F5F0', borderRadius: 6, border: `1px solid ${border}`, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: textDim, fontFamily: 'monospace' }}>{game.date}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: textColor, fontFamily: 'monospace' }}>{game.result}</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: game.winner === 'home' ? '#22C55E' : game.winner === 'away' ? '#EF4444' : '#EAB308' }}>
                  {game.winner === 'home' ? match.home.short : game.winner === 'away' ? match.away.short : 'D'}
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === 'sakatlık' && (
          <div>
            {[{ name: homeName, list: match.injuries.home }, { name: awayName, list: match.injuries.away }].map(team => (
              <div key={team.name} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: darkMode ? TEXT_MID : '#666', fontWeight: 700, marginBottom: 8 }}>{team.name}</div>
                {team.list.length === 0
                  ? <div style={{ fontSize: 11, color: textDim }}>{t.noInjuries} ✓</div>
                  : team.list.map((player, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: darkMode ? '#1A0A0A' : '#FFF5F5', border: `1px solid ${darkMode ? '#2A1515' : '#FFD0D0'}`, borderRadius: 6, marginBottom: 5 }}>
                      <X size={10} color='#EF4444' />
                      <span style={{ fontSize: 11, color: textColor }}>{player}</span>
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}