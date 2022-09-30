import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server as ioServer } from 'socket.io'
import { socketController } from '../sockets/controller.js'

export default class Server { 

  constructor() { 

    this.app    = express()
    this.port   = process.env.PORT
    this.server = createServer( this.app )
    this.io     = new ioServer( this.server )
    this.paths  = { }

    this.middlewares()
    this.routes()
    // Sockets
    this.sockets()

  }

  middlewares() { 

    this.app.use( cors() )
    this.app.use( express.static( 'public' ) )
    
  }

  routes() { 

  }

  sockets() { 
    this.io.on('connection', socketController)

  }

  listen() { 
    this.server.listen( this.port, () => { 
      console.log(`connected on port ${ process.env.PORT }`);
    })
  }
}