import TicketControl from "../models/ticketControl.js";

const ticketControl = new TicketControl()

export const socketController = socket => { 

  socket.emit( 'actual-state', ticketControl.last4 ); 
  socket.emit( 'last-ticket', 'Ticket: ' + ticketControl.last );
  socket.broadcast.emit( 'pending-ticket', ticketControl.tickets.length );

  socket.on( 'next-ticket', ( payload , callback ) => { 

    const next = ticketControl.nextTicket()
    callback( next )
    socket.broadcast.emit( 'pending-ticket', ticketControl.tickets.length );
    
  })

  socket.on('serve-ticket', ( { desk }, callback ) => {

    if( !desk ) return callback({
      ok: false,
      msg: 'desk is required'
    })

    const ticket = ticketControl.serveTicket( desk )

    //?notifica los 4 ultimos cuando se sirven tickets
    //!Broadcast sirve para emitir la informacion a todas las pantallas o sockets
    socket.broadcast.emit( 'actual-state', ticketControl.last4 ); 
    socket.emit( 'pending-ticket', ticketControl.tickets.length );
    socket.broadcast.emit( 'pending-ticket', ticketControl.tickets.length );

    if( !ticket ) { 
      callback({
        ok: false,
        msg: 'There is not ticket pending'
      })
    } else { 
      callback({ 
        ok: true,
        ticket
      })
    }

  })
  
}