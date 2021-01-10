import { wsRouter, LocationPaths } from "./ws"
import { handleLocation } from "./features/locations"
import { buildResponse, ClientSession, sendMessageToClient } from "./ws/clients"
import { WsRequest } from "./ws/types"

function requestMiddleware({
  req,
  session,
}: {
  req: WsRequest
  session: ClientSession
}) {
  return {
    req,
    session,
    successToClient: <T>(data: T) => {
      sendMessageToClient(
        session,
        buildResponse({ req, data, isSuccess: true }),
      )
    },
    failedToClient: (error: Error) => {
      sendMessageToClient(
        session,
        buildResponse({ req, error, isSuccess: false }),
      )
    },
  }
}

export function registerRoutes() {
  wsRouter.addRoute(
    LocationPaths.getLocation,
    requestMiddleware,
    handleLocation,
  )
}
