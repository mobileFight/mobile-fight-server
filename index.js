// @flow

const Koa = require("koa")
const websockify = require("koa-websocket")
const debug = require("debug")("mobileFight:index")
const { sequelize } = require("./src/models")
const { wsRoutes, wsOptions } = require("./src/ws")

const app = websockify(new Koa(), wsOptions)

app.ws.use(wsRoutes.routes())

sequelize.authenticate().then(() => {
  debug("db connected")

  app.listen(3000, () => {
    debug("server run! on port - 3000")
  })
})
