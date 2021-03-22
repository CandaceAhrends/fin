

const socket = new WebSocket('wss://ws.finnhub.io?token=c0e4v7v48v6s9jurtc2g');

// Connection opened -> Subscribe
export const subscribe = (symbol) => {

    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'AAPL' }))

    });
    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log(event.data);
        const stockData = JSON.parse(event.data);
        const stocks = stockData.data ? parsePrice(stockData.data) : null;

        // console.log("STOCKS:  ", stocks);

    });
}

const parsePrice = data => {

    return data.map(s => {
        return {
            price: s.p,
            symbol: s.s
        }
    })
}



// Unsubscribe
export const unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }))
}

