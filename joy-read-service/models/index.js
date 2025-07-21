import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { sequelize, Sequelize } from './database.js'

const db = {}
const __filename = fileURLToPath(import.meta.url)
const excludeFiles = ['index.js', 'base-model.js', 'database.js']
const entitiesDir = 'entities'
const entitiesPath = path.join(path.dirname(__filename), entitiesDir)

const files = fs.readdirSync(entitiesPath).filter((file) => {
  return (
    file.indexOf('.') !== 0 &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1 &&
    !excludeFiles.includes(file)
  )
})

for (const file of files) {
  const model = (await import(/* @vite-ignore */ `./${entitiesDir}/${file}`)).default(
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
