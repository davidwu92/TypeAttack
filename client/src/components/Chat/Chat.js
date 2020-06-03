import React, {useState, useEffect} from 'react'
import queryString from 'query-string' //this allows us to grab the url.
import io from 'socket.io-client';

let socket;

const Chat = ({location}) => {
  const [name, setName] = useState(``)
  const [room, setRoom] = useState(``)

  const ENDPOINT = 'localhost:5000'

  //connecting to socket with name/room.
  useEffect(()=>{
    // //location comes from react router; gives the parameters!
    // const data = queryString.parse(location.search)
    // //"?name=jsmastery&room=room1"
    // console.log(data) 
    const {name, room} = queryString.parse(location.search) //location comes from react router; gives the parameters!
    socket = io(ENDPOINT)
    setName(name)
    setRoom(room)
    socket.emit('join',{name, room}); //can pass 3rd parameter: callback function; runs after the callback in server.

    return ()=>{
      socket.emit('disconnect', {name, room})
      socket.off();
    }
  },[ENDPOINT, location.search])


  return(
    <>
      <h1>Chat component</h1>
    </>
  )

}

export default Chat