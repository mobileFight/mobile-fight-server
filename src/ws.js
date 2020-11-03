// @flow

const cookie = require("cookie")
const Router = require("koa-router")

const wsOptions = {
  verifyClient: (info, done) => {
    const { token } = cookie.parse(info.req.headers["cookie"])

    if (token) {
      info.req.data = { token }
      return done(true)
    }

    return done(false)
  },
}

const router = new Router()

const wsRoutes = router.get("/", (ctx, next) => {
  return next()
})

module.exports = {
  wsRoutes,
  wsOptions,
}
