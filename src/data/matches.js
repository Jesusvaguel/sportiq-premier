export const leagues = [
  { id: 'tr1', name: 'Süper Lig', nameEn: 'Super Lig', country: '🇹🇷', count: 4 },
  { id: 'en1', name: 'Premier League', nameEn: 'Premier League', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', count: 6 },
  { id: 'es1', name: 'La Liga', nameEn: 'La Liga', country: '🇪🇸', count: 5 },
  { id: 'de1', name: 'Bundesliga', nameEn: 'Bundesliga', country: '🇩🇪', count: 3 },
  { id: 'it1', name: 'Serie A', nameEn: 'Serie A', country: '🇮🇹', count: 4 },
  { id: 'fr1', name: 'Ligue 1', nameEn: 'Ligue 1', country: '🇫🇷', count: 2 },
  { id: 'nba', name: 'NBA', nameEn: 'NBA', country: '🇺🇸', count: 5 },
  { id: 'ten', name: 'ATP Turu', nameEn: 'ATP Tour', country: '🌍', count: 3 },
]

export const matchData = [
  {
    league: 'Süper Lig', leagueEn: 'Super Lig', leagueFlag: '🇹🇷',
    matches: [
      {
        id: 1, time: '19:00', status: 'live', minute: "67'",
        hot: true, premium: false,
        home: { name: 'Galatasaray', nameEn: 'Galatasaray', short: 'GAL', score: 2, ht: 1 },
        away: { name: 'Fenerbahçe', nameEn: 'Fenerbahce', short: 'FEN', score: 1, ht: 0 },
        odds: { home: 1.72, draw: 3.60, away: 4.80 },
        aiScore: 87,
        successHistory: [true, true, true, false, true],
        form: { home: ['W','W','D','W','W'], away: ['W','L','W','D','L'] },
        recentMatches: {
          home: [
            { opponent: 'Trabzonspor', score: '3-1', result: 'W' },
            { opponent: 'Beşiktaş', score: '2-2', result: 'D' },
            { opponent: 'Başakşehir', score: '1-0', result: 'W' },
          ],
          away: [
            { opponent: 'Kasımpaşa', score: '2-0', result: 'W' },
            { opponent: 'Sivasspor', score: '1-2', result: 'L' },
            { opponent: 'Ankaragücü', score: '3-1', result: 'W' },
          ],
        },
        h2h: [
          { date: '2024-03', result: '2-1', winner: 'home' },
          { date: '2023-11', result: '0-0', winner: 'draw' },
          { date: '2023-04', result: '1-3', winner: 'away' },
        ],
        injuries: { home: ['Torreira (kas)', 'Mertens (ayak)'], away: ['Dzeko (diz)', 'Tadic (sırt)'] },
        corners: { home: 5, away: 3 },
        shots: { home: 12, away: 7 },
        possession: { home: 58, away: 42 },
        aiAnalysis: 'Galatasaray bu sezon iç sahada rakip tanımıyor. Son 8 ev maçında 7 galibiyet. Fenerbahçe deplasmanı zayıf, Dzeko\'nun sakatlığı hücumu ciddi kısıtlıyor. %73 olasılıkla Galatasaray galibiyeti bekleniyor.',
        aiAnalysisEn: 'Galatasaray is dominant at home this season. 7 wins in last 8 home games. Fenerbahce struggle away, Dzeko injury significantly limits their attack. 73% probability of Galatasaray victory expected.',
        confidence: 88,
      },
      {
        id: 2, time: '21:45', status: 'upcoming',
        hot: false, premium: false,
        home: { name: 'Beşiktaş', nameEn: 'Besiktas', short: 'BJK', score: null, ht: null },
        away: { name: 'Trabzonspor', nameEn: 'Trabzonspor', short: 'TRA', score: null, ht: null },
        odds: { home: 2.10, draw: 3.20, away: 3.40 },
        aiScore: 71,
        successHistory: [true, false, true, true, false],
        form: { home: ['W','D','W','L','W'], away: ['L','W','W','D','L'] },
        recentMatches: {
          home: [
            { opponent: 'Fenerbahçe', score: '1-1', result: 'D' },
            { opponent: 'Sivasspor', score: '2-0', result: 'W' },
            { opponent: 'Konyaspor', score: '3-0', result: 'W' },
          ],
          away: [
            { opponent: 'Galatasaray', score: '0-2', result: 'L' },
            { opponent: 'Alanyaspor', score: '1-0', result: 'W' },
            { opponent: 'Hatayspor', score: '2-1', result: 'W' },
          ],
        },
        h2h: [
          { date: '2024-01', result: '1-1', winner: 'draw' },
          { date: '2023-09', result: '3-2', winner: 'home' },
          { date: '2023-02', result: '0-1', winner: 'away' },
        ],
        injuries: { home: ['Vida (kırmızı kart)'], away: ['Onuachu (diz)'] },
        corners: null, shots: null, possession: null,
        aiAnalysis: 'Beşiktaş son 4 iç saha maçında rakibine gol yemedi. Trabzonspor deplasmanda tutarsız. Toplam gol sayısının 2 altında kalma ihtimali %61.',
        aiAnalysisEn: 'Besiktas kept a clean sheet in last 4 home games. Trabzonspor inconsistent away. 61% probability of under 2 total goals.',
        confidence: 71,
      },
    ]
  },
  {
    league: 'Premier League', leagueEn: 'Premier League', leagueFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    matches: [
      {
        id: 3, time: '22:00', status: 'upcoming',
        hot: true, premium: false,
        home: { name: 'Arsenal', nameEn: 'Arsenal', short: 'ARS', score: null, ht: null },
        away: { name: 'Man City', nameEn: 'Man City', short: 'MCI', score: null, ht: null },
        odds: { home: 2.60, draw: 3.40, away: 2.55 },
        aiScore: 94,
        successHistory: [true, true, true, true, false],
        form: { home: ['W','W','W','D','W'], away: ['W','W','L','W','W'] },
        recentMatches: {
          home: [
            { opponent: 'Chelsea', score: '2-0', result: 'W' },
            { opponent: 'Tottenham', score: '3-2', result: 'W' },
            { opponent: 'Liverpool', score: '1-1', result: 'D' },
          ],
          away: [
            { opponent: 'Real Madrid', score: '1-3', result: 'L' },
            { opponent: 'Everton', score: '2-0', result: 'W' },
            { opponent: 'Brighton', score: '4-0', result: 'W' },
          ],
        },
        h2h: [
          { date: '2024-02', result: '0-1', winner: 'away' },
          { date: '2023-10', result: '1-0', winner: 'home' },
          { date: '2023-04', result: '4-1', winner: 'away' },
        ],
        injuries: { home: ['Timber (diz)'], away: ['De Bruyne (hamstring)', 'Stones (kalça)'] },
        corners: null, shots: null, possession: null,
        aiAnalysis: 'Sezonun en kritik maçı. De Bruyne\'nin yokluğu City\'nin yaratıcılığını %40 düşürüyor. Karşılıklı gol oranı %78.',
        aiAnalysisEn: 'The most critical match of the season. De Bruyne absence reduces City creativity by 40%. Both teams to score probability 78%.',
        confidence: 94,
      },
      {
        id: 4, time: '19:30', status: 'finished',
        hot: false, premium: false,
        home: { name: 'Liverpool', nameEn: 'Liverpool', short: 'LIV', score: 3, ht: 1 },
        away: { name: 'Chelsea', nameEn: 'Chelsea', short: 'CHE', score: 1, ht: 1 },
        odds: { home: 1.85, draw: 3.80, away: 4.20 },
        aiScore: 82,
        successHistory: [true, true, false, true, true],
        form: { home: ['W','W','W','W','D'], away: ['L','D','W','L','W'] },
        recentMatches: {
          home: [
            { opponent: 'Man City', score: '2-1', result: 'W' },
            { opponent: 'Arsenal', score: '1-1', result: 'D' },
            { opponent: 'Everton', score: '3-0', result: 'W' },
          ],
          away: [
            { opponent: 'Arsenal', score: '0-2', result: 'L' },
            { opponent: 'Man Utd', score: '1-1', result: 'D' },
            { opponent: 'Wolves', score: '2-0', result: 'W' },
          ],
        },
        h2h: [
          { date: '2024-01', result: '4-1', winner: 'home' },
          { date: '2023-08', result: '1-1', winner: 'draw' },
          { date: '2023-04', result: '2-2', winner: 'draw' },
        ],
        injuries: { home: [], away: ['Caicedo (sakatlık)'] },
        corners: { home: 7, away: 4 }, shots: { home: 18, away: 9 }, possession: { home: 62, away: 38 },
        aiAnalysis: 'AI öngörüsü doğrulandı. Liverpool üstün oyunla galip geldi.',
        aiAnalysisEn: 'AI prediction confirmed. Liverpool won with dominant performance.',
        confidence: 82,
      },
    ]
  },
  {
    league: 'NBA', leagueEn: 'NBA', leagueFlag: '🇺🇸',
    matches: [
      {
        id: 5, time: '01:30', status: 'upcoming',
        hot: true, premium: false,
        home: { name: 'Lakers', nameEn: 'Lakers', short: 'LAL', score: null, ht: null },
        away: { name: 'Warriors', nameEn: 'Warriors', short: 'GSW', score: null, ht: null },
        odds: { home: 1.90, draw: null, away: 1.95 },
        aiScore: 88,
        successHistory: [true, true, false, true, true],
        form: { home: ['W','L','W','W','L'], away: ['W','W','L','W','W'] },
        recentMatches: {
          home: [
            { opponent: 'Celtics', score: '112-108', result: 'W' },
            { opponent: 'Nuggets', score: '98-110', result: 'L' },
            { opponent: 'Suns', score: '124-115', result: 'W' },
          ],
          away: [
            { opponent: 'Clippers', score: '118-105', result: 'W' },
            { opponent: 'Heat', score: '88-95', result: 'L' },
            { opponent: 'Mavs', score: '130-122', result: 'W' },
          ],
        },
        h2h: [
          { date: '2024-03', result: '112-108', winner: 'home' },
          { date: '2024-01', result: '98-115', winner: 'away' },
        ],
        injuries: { home: ['Davis (ayak bileği)'], away: [] },
        corners: null, shots: null, possession: null,
        aiAnalysis: 'Davis\'in durumu maça 2 saat kala netleşecek. Total 224.5 üst son 6 karşılaşmada 5 kez isabetli.',
        aiAnalysisEn: 'Davis status to be confirmed 2 hours before tip-off. Over 224.5 has hit in 5 of last 6 matchups.',
        confidence: 88,
      },
    ]
  },
]