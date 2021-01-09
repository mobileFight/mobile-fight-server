import {
  sendMessageToClient,
  buildRespoonse,
  WsRequest,
  ClientSession,
} from "../../ws"
import models from "../../models"

export async function handleLocation(req: WsRequest, session: ClientSession) {
  const { locationId } = req.payload
  const location = await models.locations.getLocationById(locationId)

  sendMessageToClient(session, buildRespoonse(req, location))
}
