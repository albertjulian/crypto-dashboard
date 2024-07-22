// server-crypto.js
const WebSocket = require('ws');

const mockDataCrypto = [
  {
    symbol: 'USDT',
    price: 16200,
  },
  {
    symbol: 'BNB',
    price: 9300000,
  },
  {
    symbol: 'PEPE',
    price: 0.190522,
  },
  {
    symbol: 'BTC',
    price: 1044500000,
  },
  {
    symbol: 'CEL',
    price: 5546,
  },
  {
    symbol: 'XRP',
    price: 9509,
  },
  {
    symbol: 'ETH',
    price: 55177000,
  },
  {
    symbol: 'SOL',
    price: 2550250,
  },
  {
    symbol: 'DOGE',
    price: 1969,
  },
  {
    symbol: 'SHIB',
    price: 0.301806,
  },
];

const wss = new WebSocket.Server({ port: 8081 });

// Handle new connections
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send mock cryptocurrency data every 2 seconds
  const interval = setInterval(() => {
    const cryptoData = mockDataCrypto.map((row) => {
      const max = row.price * 1.09;
      const min = row.price * 0.91;

      return {
        symbol: row.symbol,
        price: (Math.random() * (max - min) + min).toFixed(3)
      }
    })
    
    ws.send(JSON.stringify(cryptoData));
  }, 2000);

  // Handle WebSocket close event
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

console.log('WebSocket server running on ws://localhost:8081');