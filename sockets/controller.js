
export const socketController = socket => { 

  console.log( 'client connected', socket.id );

  socket.on( 'disconnect', () => { 
    console.log('client disconnected', socket.id);
  })

  socket.on( 'sendMessage', ( payload, callback ) => { 

    const id = 123456;
    callback( id, payload );
    socket.broadcast.emit('sendMessage', payload)

  })
  
}