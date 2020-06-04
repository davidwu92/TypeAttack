const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js')

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
    // console.log(name, room)
    const {error, user} = addUser({id: socket.id, name, room});
    console.log("USER: ")
    console.log(user)
    if(error) return callback(error);
    
    //emit message to the joiner, welcoming joiner.
    socket.emit('message', {user: "admin", text:`Welcome ${user.name}.`})

    //broadcast to everyone ELSE in the room.
    socket.broadcast.to(user.room).emit('message',{user:"admin", text:`${user.name} has joined the room '${user.room}'.`})
    
    socket.join(user.room);
    
    callback();
  })

  //user-generated messages.
  socket.on('sendMessage', (message, callback)=>{
    const user = getUser(socket.id);
    io.to(user.room).emit('message', {user: user.name, text: message})

    callback();
  })

  //disconnecting from room.
  socket.on('disconnect',()=>{
    console.log(`A user has left.`)
    const user = removeUser(socket.id)
    console.log(user)
  })

})

//middleware
app.use(router)
app.use(cors())

server.listen(PORT, ()=>console.log(`Server has started on port ${PORT}`))