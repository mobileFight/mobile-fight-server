function runConnection(id) {
  const ws = new WebSocket(`ws://localhost:3000`)

  ws.onopen = function() {
    console.log("opened ws")
  }

  ws.onerror = function(error) {
    console.log({ error })
  }

  ws.onmessage = function(message) {
    console.log({ message })
  }
}

runConnection()
