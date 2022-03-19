export default function handler(req, res) {
  res.status(400).json({ error: 'Please provide valid address to calculate stats' })
}