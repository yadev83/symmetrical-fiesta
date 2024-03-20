const ws = new WebSocket('ws://localhost:80')

ws.onopen = (event) => {
    console.log(event)
    ws.send('salut')
}

ws.onmessage = (event) => {
    console.log(event)
}