import { WsType } from "../types"

export function wsParser(
  message: string,
): { type: WsType; payload: unknown } | void {
  const result = JSON.parse(message)

  if (result) {
    const { type, payload } = result

    return { type, payload }
  }

  return undefined
}
