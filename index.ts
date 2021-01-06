import Koa from "koa"
import websockify from "koa-websocket"
import Debug from "debug"
import models, { sequelize } from "./src/models"
import { wsRoutes, wsOptions } from "./src/ws"

const debug = Debug("mobileFight:index")

const app = websockify(new Koa(), wsOptions)

// @ts-ignore
app.ws.use(wsRoutes.routes())

sequelize.authenticate().then(async () => {
  debug("db connected")

  app.listen(3000, () => {
    debug("server run! on port - 3000")
  })
})
