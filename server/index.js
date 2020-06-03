const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const cors = require('cors')
const PORT = process.env.PORT || 5000

//grab router from router.js.
const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket)=>{
  console.log('We have a new connection.')

  socket.on('join', ({name, room}, callback)=>{
    console.log(name, room)
    callback();
  })

  socket.on('disconnect',({name, room})=>{
    console.log(`${name} has left ${room}.`)
  })

})

//middleware
app.use(router)
app.use(cors())

server.listen(PORT, ()=>console.log(`Server has started on port ${PORT}`))