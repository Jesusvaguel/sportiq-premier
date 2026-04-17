export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  const today = new Date().toISOString().split('T')[0]
  
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${today}`,
      {
        headers: {
          'x-apisports-key': process.env.VITE_RAPIDAPI_KEY,
        }
      }
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}