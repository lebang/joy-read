import Sequelize from 'sequelize'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import processEnv from '../utils/process-env.js'
import asyncLocalStorage from '../utils/context.js'

const __filename = fileURLToPath(import.meta.url)
const env = processEnv.NODE_ENV || 'development'
const configPath = path.join(path.dirname(__filename), '../config/config.json')
const allConfigs = JSON.parse(fs.readFileSync(configPath, 'utf8'))                               
const mainConfig = allConfigs[env]                                                               
const logConfig = allConfigs[`${env}-log`]

const createSequelizeInstance = (dbConfig) => {
  if(!dbConfig) return;
  if (env === 'development') {
    dbConfig.logging = (sql) => {
      const cleanSql = sql.replace('Executing (default): ', '')
      const store = asyncLocalStorage.getStore()
      if (store) {
        if (store.res && Array.isArray(store.res.querySql)) {
          store.res.querySql.push(cleanSql)
        }
        console.log(`[${store.res.traceId}]`, cleanSql)
      } else {
        console.log('sql', sql)
      }
    }
  }

  if (dbConfig.use_env_variable) {
    return new Sequelize(processEnv[dbConfig.use_env_variable], dbConfig)
  } else {
    return new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)
  }
}

const sequelize = createSequelizeInstance(mainConfig)
const logSequelize = createSequelizeInstance(logConfig)

export {
  sequelize,
  logSequelize,
  Sequelize,
  logConfig
}
