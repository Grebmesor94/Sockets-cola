const lblNuevoTicket = document.getElementById('lblNuevoTicket')
const btnCreate      = document.getElementById('btnCreate')


const socket = io()

socket.on('connect', () => { 
  btnCreate.disabled = false;
})

socket.on('disconnect', () => { 
  btnCreate.disabled = true; 
})

socket.on('last-ticket', ( payload ) => { 
  lblNuevoTicket.innerText = payload
})

btnCreate.addEventListener( 'click', () => { 
  
  socket.emit('next-ticket', null, ( ticket ) => { 
    lblNuevoTicket.innerText = ticket
  })
  
})