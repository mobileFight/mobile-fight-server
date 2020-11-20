// @flow

import { type WsType } from "../types"

export function wsParser(
  message: WsType,
): { type: WsType, payload: mixed } | void {
  const result = JSON.parse(message)

  if (result) {
    const { type, payload } = result

    return { type, payload }
  }

  return undefined
}
