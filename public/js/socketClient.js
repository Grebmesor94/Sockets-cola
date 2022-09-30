const lblonline  = document.getElementById('lblonline');
const lbloffline = document.getElementById('lbloffline');
const txtMessage = document.getElementById('txtMessage');
const btnSend    = document.getElementById('btnSend');

btnSend.addEventListener( 'click', () => { 
  const message = txtMessage.value;
  socket.emit( 'sendMessage', message, ( id, payload  ) => { 
    console.log('desde el server', id, payload);
  } );
})

const socket = io()

socket.on('connect', () => { 
  lblonline.style.display = ''
  lbloffline.style.display = 'none'
})

socket.on('disconnect', () => { 
  lblonline.style.display = 'none'
  lbloffline.style.display = '' 
})

socket.on('sendMessage', ( payload ) => { 
  console.log( payload );
})