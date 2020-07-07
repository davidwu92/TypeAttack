const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {addUser, removeUser, chooseNewMaster, getUser, getUsersInRoom} = require('./users.js')

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
    //check if this is the first joiner.
    if(getUsersInRoom(room).length){ //NOT THE FIRST TO JOIN.
      const {error, user} = addUser({id: socket.id, name, room, isMaster: false,});
      if(error) return callback(error);
      
      //emit welcome message to the joiner.
      socket.emit('message',{user:'admin', text:`Hi ${user.name}! Welcome to the room "${user.room}".`})
      
      //broadcast to everyone ELSE in the room.
      socket.broadcast.to(user.room).emit('message',{user:"admin", text:`${user.name} has joined the room '${user.room}'.`})
      
      socket.join(user.room);
      callback();
      io.to(user.room).emit('getUserData', getUsersInRoom(user.room))
    } else { //FIRST JOINER. make this user the master.
      const {error, user} = addUser({id: socket.id, name, room, isMaster: true,});
      if(error) return callback(error);
      
      //emit welcome message to room master.
      socket.emit('message',{user:'admin', text:`Hi ${user.name}! You have been made the room master of "${user.room}".`})
      socket.join(user.room);
      
      callback();
      io.to(user.room).emit('getUserData', getUsersInRoom(user.room))
    }
  })

  //user-generated messages.
  socket.on('sendMessage', (message, callback)=>{
    const user = getUser(socket.id);
    io.to(user.room).emit('message', {user: user.name, text: message, isMaster: user.isMaster})

    callback();
  })


  //Article Selected.
  socket.on('articleSelected', (articleSelectData, callback)=>{
    //try sending the articleString to each user, and that's it.
    const user = getUser(socket.id)
    io.to(user.room).emit('incomingArticleString', articleSelectData.formatString)
    io.to(user.room).emit('message', {user: "admin", text:`The room master has selected an article ${articleSelectData.categoryName}.`})
  })

  //disconnecting from room.
  socket.on('disconnect',()=>{
    const user = removeUser(socket.id)
    console.log(`A user has left:`)
    console.log(user)
    if(user){
      io.to(user.room).emit('message', {user: "admin", text:`${user.name} has left the room.`})
      io.to(user.room).emit('getUserData', getUsersInRoom(user.room))
      if(user.isMaster){
        let newMaster = chooseNewMaster(user.name, user.room)
        io.to(user.room).emit('message', {user: "admin", text:`${newMaster} has been made the room master.`})
      } else {

      }
    }

  })

})

//middleware
app.use(router)
app.use(cors())

server.listen(PORT, ()=>console.log(`Server has started on port ${PORT}`))