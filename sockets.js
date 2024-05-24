let readyPlayerCount = 0;

function listen(io) {
    const pongNamespace = io.of('/pong');
    pongNamespace.on('connection', (socket) => {
        console.log('User connected: ', socket.id);
        let room;
    
        socket.on('ready', () => {
          room = 'room' + Math.floor(readyPlayerCount / 2);
          console.log('Player ready with id: ', socket.id, room);

          socket.join(room);

          readyPlayerCount++;
    
          if (readyPlayerCount % 2 === 0){
            pongNamespace.in(room).emit('startgame', socket.id);
          };
        });
    
        socket.on('paddleMove', (paddleData) => {
          socket.to(room).emit('paddleMove', paddleData);
        });
    
        socket.on('ballMove', (ballData) => {
          socket.to(room).emit('ballMove', ballData);
        });
    
        socket.on('disconnect', (reason) => {
          console.log('Player: ', socket.id, ' disconnected. ', reason);
          socket.leave(room);
        });
    });
};

module.exports = {
    listen
}

    
    
