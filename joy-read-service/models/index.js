import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Sequelize from 'sequelize'
import processEnv from '../utils/process-env.js'
import asyncLocalStorage from '../utils/context.js'

const __filename = fileURLToPath(import.meta.url)
// const __basename = path.basename(__filename) // 当前文件名
const env = processEnv.NODE_ENV || 'development'
const configPath = path.join(path.dirname(__filename), '../config/config.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))[env]

// add global logging
if(config?.logQueryParameters) {
  config.logging = (sql) => {
    const cleanSql = sql.replace('Executing (default): ', '');
    const store = asyncLocalStorage.getStore()
    if (store && store.res && Array.isArray(store.res.querySql)) {
      store.res.querySql.push(cleanSql)
    }
    console.log(sql)
  }
}

const db = {}
const excludeFiles = ['index.js', 'base-model.js']
const modelDir = 'model'
const modelPath = path.join(path.dirname(__filename), modelDir)

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(processEnv[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

const files = fs.readdirSync(modelPath).filter((file) => {
  return (
    file.indexOf('.') !== 0 &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1 &&
    !excludeFiles.includes(file)
  )
})

for (const file of files) {
  const model = (await import(/* @vite-ignore */ `./${modelDir}/${file}`)).default(
    sequelize,
    Sequelize.DataTypes,
  )
  db[model.name] = model
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db