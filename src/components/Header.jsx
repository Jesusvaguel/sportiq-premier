import { useState } from 'react'
import { Search, Menu, X, Globe, LogIn, UserPlus, Moon, Sun } from 'lucide-react'

const GOLD = '#C19A6B'
const GOLD_DIM = '#8B6B3D'
const TEXT_DIM = '#6B6B80'

export default function Header({ darkMode, setDarkMode, lang, setLang, t, activeSport, setActiveSport }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')

  const sports = [
    { key: 'all', label: t.all },
    { key: 'football', label: t.football },
    { key: 'basketball', label: t.basketball },
    { key: 'tennis', label: t.tennis },
  ]

  const bg = darkMode ? '#080810' : '#FFFFFF'
  const border = darkMode ? '#1A1A2E' : '#E0E0D8'
  const textColor = darkMode ? '#E8E8F0' : '#111111'
  const inputBg = darkMode ? '#0F0F1A' : '#F5F5F0'
  const inputBorder = darkMode ? '#2A2A3E' : '#E0E0D8'

  return (
    <>
      <div style={{ height: 52, background: bg, borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, position: 'sticky', top: 0, zIndex: 200 }}>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: TEXT_DIM, cursor: 'pointer', padding: 6, borderRadius: 6, display: 'flex', alignItems: 'center' }}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 4 }}>
          <span style={{ fontSize: 15, fontWeight: 900, color: GOLD, letterSpacing: -0.5 }}>SPORT<span style={{ color: TEXT_DIM }}>IQ</span></span>
          <span style={{ fontSize: 7, background: GOLD, color: '#000', padding: '2px 5px', borderRadius: 3, fontWeight: 800, letterSpacing: 1 }}>PREMIER</span>
        </div>

        {/* Search */}
        <div style={{ flex: 1, position: 'relative', maxWidth: 300 }}>
          <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: TEXT_DIM }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.search}
            style={{ width: '100%', background: inputBg, border: `1px solid ${inputBorder}`, borderRadius: 6, padding: '7px 12px 7px 30px', color: textColor, fontSize: 11, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Sports Nav */}
        <div style={{ display: 'flex', gap: 2 }}>
          {sports.map(s => (
            <button key={s.key} onClick={() => setActiveSport(s.key)} style={{ background: activeSport === s.key ? GOLD : 'transparent', color: activeSport === s.key ? '#000' : TEXT_DIM, border: 'none', borderRadius: 5, padding: '5px 10px', cursor: 'pointer', fontSize: 11, fontWeight: 700, transition: 'all 0.15s' }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Dil Seçici */}
          <button onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: `1px solid ${darkMode ? '#2A2A3E' : '#E0E0D8'}`, color: GOLD, borderRadius: 5, padding: '4px 8px', cursor: 'pointer', fontSize: 10, fontWeight: 700 }}>
            <Globe size={11} />
            {lang === 'tr' ? 'TR' : 'EN'}
          </button>

          {/* Dark/Light Mode */}
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: 'none', border: `1px solid ${darkMode ? '#2A2A3E' : '#E0E0D8'}`, color: TEXT_DIM, borderRadius: 5, padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {darkMode ? <Sun size={13} /> : <Moon size={13} />}
          </button>

          {/* VIP Badge */}
          <div style={{ fontSize: 9, color: GOLD, fontWeight: 700, letterSpacing: 1.5, border: `1px solid ${GOLD_DIM}`, padding: '4px 8px', borderRadius: 4 }}>VIP</div>

          {/* Login / Register */}
          <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: `1px solid ${darkMode ? '#2A2A3E' : '#E0E0D8'}`, color: TEXT_DIM, borderRadius: 5, padding: '5px 10px', cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>
            <LogIn size={12} />
            {t.login}
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: GOLD, border: 'none', color: '#000', borderRadius: 5, padding: '5px 10px', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}>
            <UserPlus size={12} />
            {t.register}
          </button>
        </div>
      </div>

      {/* Hamburger Menu Dropdown */}
      {menuOpen && (
        <div style={{ position: 'fixed', top: 52, left: 0, width: 220, background: darkMode ? '#0A0A0F' : '#FFFFFF', border: `1px solid ${darkMode ? '#1E1E2E' : '#E0E0D8'}`, borderTop: 'none', zIndex: 300, padding: 12 }}>
          <div style={{ fontSize: 8, color: GOLD, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>{t.sports}</div>
          {sports.map(s => (
            <div key={s.key} onClick={() => { setActiveSport(s.key); setMenuOpen(false) }} style={{ padding: '9px 12px', cursor: 'pointer', borderRadius: 6, color: activeSport === s.key ? GOLD : (darkMode ? '#E8E8F0' : '#111'), fontWeight: activeSport === s.key ? 700 : 400, fontSize: 12 }}>
              {s.label}
            </div>
          ))}
          <div style={{ height: 1, background: darkMode ? '#1E1E2E' : '#E0E0D8', margin: '8px 0' }} />
          <div style={{ fontSize: 8, color: GOLD, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>{t.settings}</div>
          <div onClick={() => setDarkMode(!darkMode)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', cursor: 'pointer', borderRadius: 6, color: darkMode ? '#E8E8F0' : '#111', fontSize: 12 }}>
            {darkMode ? <Sun size={13} /> : <Moon size={13} />}
            {darkMode ? t.lightMode : t.darkMode}
          </div>
        </div>
      )}
    </>
  )
}