import { v4 as uuidv4 } from 'uuid'
import asyncLocalStorage from '../utils/context.js'

const contextMiddleware = (req, res, next) => {
  res.querySql = [] // Initialize as an empty array

  res.traceId = req.headers['x-trace-id'] || uuidv4()

  const store = {
    req,
    res,
  }

  res.setHeader('x-trace-id', res.traceId)

  asyncLocalStorage.run(store, () => {
    next()
  })
}

export default contextMiddleware