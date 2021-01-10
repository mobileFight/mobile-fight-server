import { WsRequest, ClientSession } from "../../ws"
import models from "../../models"
import { LocationModel } from "../../models/locations"

type Ctx = {
  req: WsRequest
  session: ClientSession
  successToClient: (arg0: {
    location: LocationModel
    children: Array<LocationModel>
  }) => void
  failedToClient: (arg0: Error) => void
}

export async function handleLocation({ req, successToClient }: Ctx) {
  const { locationId } = req.payload
  const location = await models.locations.getLocationById(locationId)

  successToClient(location)
}
