import React, {useState, useEffect} from 'react'
import queryString from 'query-string' //this allows us to grab the url.
import io from 'socket.io-client';

let socket;

const Gameroom = ({location}) => {
  const [name, setName] = useState(``)
  const [room, setRoom] = useState(``)

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = 'localhost:5000'

  //connecting to socket with name/room; closing tab disconnects user.
  useEffect(()=>{
    const {name, room} = queryString.parse(location.search) //location comes from react router; gives the parameters!
    socket = io(ENDPOINT)
    setName(name)
    setRoom(room)
    socket.emit('join', {name, room},()=>{}); //can pass 3rd parameter: callback function; runs after the callback in server.

    return ()=>{
      socket.emit('disconnect')
      socket.off();
    }
  },[ENDPOINT, location.search])

  //for user-generated messaging.
  //triggered whenever "message" is emitted from server.
  useEffect(()=>{
    socket.on('message', (message)=>{
      setMessages([...messages, message])
    })
  },[messages])

  //function for sending messages.
  const sendMessage = (event) => {
    event.preventDefault();
    if(message){
      socket.emit('sendMessage', message, ()=>setMessage(''))
    }
  }

  return(
    <>
      <div className="container">
        <h3 className="center">Gameroom Page</h3>

        {/* INPUT FIELD FOR SENDING MESSAGES. */}
        <div>
          <h5>MESSAGING STUFF</h5>
          <input value={message}
            onChange={(e)=>setMessage(e.target.value)}
            onKeyPress={event=>event.key==="Enter" ? sendMessage(event):null}
          />
        </div>
      </div>
    </>
  )

}

export default Gameroom