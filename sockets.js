let readyPlayerCount = 0;

function listen(io) {
    const pongNamespace = io.of('/pong');
    pongNamespace.on('connection', (socket) => {
        console.log('User connected: ', socket.id);
    
        socket.on('ready', () => {
          console.log('Player ready with id: ', socket.id);
    
          readyPlayerCount++;
    
          if (readyPlayerCount % 2 === 0){
            pongNamespace.emit('startgame', socket.id);
          };
        });
    
        socket.on('paddleMove', (paddleData) => {
          socket.broadcast.emit('paddleMove', paddleData)
        });
    
        socket.on('ballMove', (ballData) => {
          socket.broadcast.emit('ballMove', ballData)
        });
    
        socket.on('disconnect', (reason) => {
          console.log('Player: ', socket.id, ' disconnected. ', reason);
        });
    });
};

module.exports = {
    listen
}

    
    
