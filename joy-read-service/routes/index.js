import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  const userAgent = req.headers['user-agent'];
  console.log('userAgent:', userAgent);
  res.send('Hello World!')
})

export default router
