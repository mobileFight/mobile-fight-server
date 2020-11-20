// @flow

import fs from "fs"
import path from "path"
import SequelizeBase from "sequelize"
import { db as dbConfig } from "../config"

const basename = path.basename(__filename)
const models = {}

export const sequelize = new SequelizeBase(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    storage: path.resolve(__dirname, "..", "db/database.sqlite"),
  },
)

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js",
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    const name = model.name.charAt(0).toUpperCase() + model.name.slice(1)

    models[name] = model
  })

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }

  models[modelName].Models = models
})

export default models

export const Sequelize = SequelizeBase
