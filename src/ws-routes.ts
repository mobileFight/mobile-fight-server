import { wsRouter, LocationPaths } from "./ws"
import { handleLocation } from "./features/locations"

export function registerRoutes() {
  wsRouter.addRoute(LocationPaths.getLocation, handleLocation)
}
