const lblDesk    = document.querySelector('h1');
const btnServe   = document.querySelector('button')
const lblTicket  = document.querySelector('small')
const lblAlert   = document.querySelector('.alert')
const lblPending = document.querySelector('#lblPending')


const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has( 'desk' ) ) { 
  window.location = 'index.html';
  throw new Error( 'Desk is required' );
}

const desk = searchParams.get( 'desk' );
lblDesk.innerText = desk
lblAlert.style.display = 'none'

const socket = io()

socket.on('connect', () => { 
  btnServe.disabled = false;
})

socket.on('disconnect', () => { 
  btnServe.disabled = true; 
})

socket.on('pending-ticket', ( pending ) =>  { 

  if( pending === 0 ){ 
    lblPending.style.display = 'none'
  } else { 
    lblPending.style.display = ''
    lblPending.innerText = pending
  }
})

btnServe.addEventListener( 'click', () => { 
  
  socket.emit( 'serve-ticket', { desk }, ({ ok, ticket, msg }) => { 
    if( !ok ) return lblAlert.style.display = ''

    lblTicket.innerText = 'Ticket: ' + ticket.number;
  })
  
})