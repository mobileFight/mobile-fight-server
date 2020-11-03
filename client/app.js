function runConnection(id) {
  const ws = new WebSocket(`ws://localhost:3000/${id}`)

  ws.onopen = function() {
    console.log("opened ws")
  }

  ws.onerror = function(error) {
    console.log({ error })
  }

  ws.onmessage = function(message) {
    console.log({ message })
  }

  function send() {
    ws.send(`user id - ${id}`)
  }

  return send
}

document.cookie = document.cookie + ";token=some_token"
