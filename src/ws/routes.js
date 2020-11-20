// @flow

import cookie from "cookie"
import Router from "koa-router"
import { registerFightHandler } from "../features"
import { wsParser } from "./parser"
import { type WsType } from "../types"

export const wsOptions = {
  verifyClient: (info, done) => {
    const { token } = cookie.parse(info.req.headers["cookie"])

    if (true) {
      info.req.data = { token }
      return done(true)
    }

    return done(false)
  },
}

const router = new Router()

function runCommand({ type }: { type: WsType, payload: mixed }, ws: WebSocket) {
  if (type === "fight") {
    registerFightHandler(payload, ws)
  }
}

export const wsRoutes = router.get("/", (ctx, next) => {
  ctx.websocket.on("message", (message: string) => {
    const parsedMessage = wsParser(message)

    if (parsedMessage) {
      runCommand(parsedMessage, ctx.websocket)
    }
  })

  ctx.websocket.on("error", (error) => {
    console.error("ws: ", { error })
  })

  ctx.websocket.on("close", () => {
    console.error("ws: close")
  })

  return next()
})
