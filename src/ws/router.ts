import { WsRequest } from "./types"
import { ClientSession } from "./clients"

class WsRouter {
  routes = new Map<string, (req: WsRequest, session: ClientSession) => void>()

  addRoute(
    route: string,
    handler: (req: WsRequest, session: ClientSession) => void,
  ) {
    this.routes.set(route, handler)
  }

  releaseHandler(req: WsRequest, session: ClientSession) {
    if (this.routes.has(req.type)) {
      const handler = this.routes.get(req.type)

      handler(req, session)
    }
  }
}

export const wsRouter = new WsRouter()
