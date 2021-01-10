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

export function buildResponse<T>(
  payload:
    | {
        req: WsRequest
        data: T
        isSuccess: true
      }
    | {
        req: WsRequest
        error: Error
        isSuccess: false
      },
): string {
  if (payload.isSuccess) {
    const { req, data } = payload

    return JSON.stringify({
      ...req,
      isSuccess: true,
      type: "result",
      payload: data,
    })
  }

  const {
    req,
    // @ts-ignore
    error,
  } = payload

  return JSON.stringify({
    ...req,
    isSuccess: false,
    type: "result",
    payload: error,
  })
}

export function sendMessageToClient(session: ClientSession, message: string) {
  const client = clients.get(session.token)

  if (client.status === "connected") {
    client.ws.send(message)
  }
}
