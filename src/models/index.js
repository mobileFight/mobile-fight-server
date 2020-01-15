const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const { db: dbConfig } = require("../config")

const basename = path.basename(__filename)
const models = {}

const sequelize = new Sequelize(
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

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models
