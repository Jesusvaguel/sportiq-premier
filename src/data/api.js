export async function fetchTodayMatches() {
  try {
    const response = await fetch('/api/matches')
    const data = await response.json()
    return data
  } catch (err) {
    console.error('API Hatası:', err)
    return null
  }
}

export function transformMatches(apiData) {
  if (!apiData || !apiData.response || apiData.response.length === 0) return []

  const grouped = {}

  apiData.response.forEach(item => {
    const league = item.league?.name || 'Diğer'
    const country = item.league?.country || ''

    if (!grouped[league]) {
      grouped[league] = {
        league,
        leagueEn: league,
        leagueFlag: getCountryFlag(country),
        matches: []
      }
    }

    const homeScore = item.goals?.home ?? null
    const awayScore = item.goals?.away ?? null
    const status = item.fixture?.status?.short
    const isLive = ['1H','HT','2H','ET','P'].includes(status)
    const isFinished = ['FT','AET','PEN'].includes(status)

    grouped[league].matches.push({
      id: item.fixture?.id,
      time: item.fixture?.date
        ? new Date(item.fixture.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        : '--:--',
      status: isLive ? 'live' : isFinished ? 'finished' : 'upcoming',
      minute: item.fixture?.status?.elapsed ? `${item.fixture.status.elapsed}'` : '',
      hot: Math.random() > 0.75,
      premium: false,
      home: {
        name: item.teams?.home?.name || 'Ev Sahibi',
        nameEn: item.teams?.home?.name || 'Home',
        short: (item.teams?.home?.name || 'EV').substring(0, 3).toUpperCase(),
        score: homeScore, ht: item.score?.halftime?.home ?? null,
      },
      away: {
        name: item.teams?.away?.name || 'Deplasman',
        nameEn: item.teams?.away?.name || 'Away',
        short: (item.teams?.away?.name || 'DEP').substring(0, 3).toUpperCase(),
        score: awayScore, ht: item.score?.halftime?.away ?? null,
      },
      odds: generateOdds(),
      aiScore: Math.floor(Math.random() * 30) + 65,
      confidence: Math.floor(Math.random() * 30) + 65,
      successHistory: [true, true, false, true, true],
      form: { home: randomForm(), away: randomForm() },
      recentMatches: { home: [], away: [] },
      h2h: [],
      injuries: { home: [], away: [] },
      corners: null, shots: null, possession: null,
      aiAnalysis: `${item.teams?.home?.name} ile ${item.teams?.away?.name} arasındaki maç analiz ediliyor...`,
      aiAnalysisEn: `Analyzing ${item.teams?.home?.name} vs ${item.teams?.away?.name}...`,
    })
  })

  return Object.values(grouped).slice(0, 15)
}

function generateOdds() {
  return {
    home: parseFloat((Math.random() * 3 + 1.3).toFixed(2)),
    draw: parseFloat((Math.random() * 2 + 2.8).toFixed(2)),
    away: parseFloat((Math.random() * 3 + 1.5).toFixed(2))
  }
}

function randomForm() {
  return Array(5).fill(null).map(() => ['W','D','L'][Math.floor(Math.random() * 3)])
}

function getCountryFlag(country) {
  const flags = {
    'Turkey': '🇹🇷', 'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Spain': '🇪🇸',
    'Germany': '🇩🇪', 'Italy': '🇮🇹', 'France': '🇫🇷',
    'Netherlands': '🇳🇱', 'Portugal': '🇵🇹', 'USA': '🇺🇸',
    'Brazil': '🇧🇷', 'Argentina': '🇦🇷', 'World': '🌍'
  }
  return flags[country] || '🌍'
}