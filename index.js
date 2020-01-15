const Koa = require("koa")
const route = require("koa-route")
const websockify = require("koa-websocket")
const serve = require("koa-static")
const debug = require("debug")("mobileFight:index")
const { sequelize } = require("./src/models")

const wsOptions = {
  verifyClient: (info, done) => {
    info.req.data = { userId: 1 }
    done(true)
  },
}
const app = websockify(new Koa(), wsOptions)

app.use(serve("."))

app.ws.use(
  route.all("/", (ctx, next) => {
    ctx.websocket.send("connection")

    return next()
  }),
)

app.ws.use((ctx, next) => {
  ctx.websocket.send(JSON.stringify({ type: "text", payload: ctx.req.data }))

  return next(ctx)
})

sequelize.authenticate().then(() => {
  debug("db connected")

  app.listen(3000, () => {
    debug("server run!")
  })
})
