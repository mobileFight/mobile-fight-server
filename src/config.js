const dbConfig = require("./database.json")

const { NODE_ENV = "development" } = process.env

const db = dbConfig[NODE_ENV]
const appName = "mobileFight"

module.exports = { db, appName }
