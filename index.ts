import Koa from "koa"
import websockify from "koa-websocket"
import Debug from "debug"
import cookie from "cookie"
import route from "koa-route"
import models, { sequelize } from "./src/models"
import { clients } from "./src/ws"

export const wsOptions = {
  verifyClient: async (info, done) => {
    const { token = "test_token" } = cookie.parse(
      info.req.headers["cookie"] ?? "",
    )
    const session = await models.sessions.getSessionByToken(token)

    if (session) {
      info.req.data = { session }
      return done(true)
    }

    return done(false)
  },
}

const debug = Debug("mobileFight:index")

const app = websockify(new Koa(), wsOptions)

app.ws.use(
  route.all("/", (ctx) => {
    const { session } = ctx.req.data

    clients.set(session.token, { ws: ctx.websocket, status: "connected" })

    ctx.websocket.on("close", () => {
      clients.set(session.token, { ws: undefined, status: "closed" })
    })

    ctx.websocket.on("error", () => {
      clients.set(session.token, { ws: undefined, status: "error" })
    })
  }),
)

sequelize.authenticate().then(async () => {
  debug("db connected")

  app.listen(3000, () => {
    debug("server run! on port - 3000")
  })
})
