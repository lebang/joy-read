import asyncLocalStorage from '../utils/context.js'

const contextMiddleware = (req, res, next) => {
  res.querySql = [] // Initialize as an empty array
  const store = { req, res }
  asyncLocalStorage.run(store, () => {
    next()
  })
}

export default contextMiddleware
