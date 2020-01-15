import Koa from "koa"
import route from "koa-route"
import websockify from "koa-websocket"
import serve from "koa-static"

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

app.listen(3000)
