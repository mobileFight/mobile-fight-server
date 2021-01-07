import ws from "ws"

export type Client =
  | { ws: ws; status: "connected" }
  | { ws: void; status: "closed" | "error" }

export const clients = new Map<string, Client>()
