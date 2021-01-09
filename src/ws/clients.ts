import ws from "ws"
import { WsRequest } from "./types"

export type ClientSession = { token: string; userId: number }

export type Client =
  | { ws: ws; status: "connected"; data: ClientSession }
  | {
      ws: void
      status: "closed" | "error"
      data: ClientSession
    }

export const clients = new Map<string, Client>()

export function buildRespoonse<T>(req: WsRequest, data: T): string {
  return JSON.stringify({
    ...req,
    payload: { data, reqId: req.payload.reqId },
  })
}

export function sendMessageToClient(session: ClientSession, message: string) {
  const client = clients.get(session.token)

  if (client.status === "connected") {
    client.ws.send(message)
  }
}
