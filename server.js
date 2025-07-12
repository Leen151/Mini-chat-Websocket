const WebSocket = require('ws');

// Crée un serveur WebSocket sur le port 3000
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('🟢 Un client est connecté');

  // Quand un client envoie un message
  ws.on('message', (message) => {
    console.log('📩 Message reçu :', message.toString());

    // On renvoie le message à tous les clients connectés
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  // Quand un client se déconnecte
  ws.on('close', () => {
    console.log('🔴 Un client s\'est déconnecté');
  });
});

console.log('✅ Serveur WebSocket démarré sur ws://localhost:3000');
