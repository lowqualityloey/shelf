import 'dotenv/config'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000 // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
