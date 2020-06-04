import React, {useState, useEffect} from 'react'
import queryString from 'query-string' //this allows us to grab the url.
import io from 'socket.io-client';

import MessageBox from '../MessageBox'

import './Gameroom.css'

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
    console.log("message useEffect trigger.")
    socket.on('message', (message)=>{
      // setMessages([...messages, message])
      setMessages((messages)=>{
        return([...messages, message])
      })
    })
  },[])

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
        <h3 className="center">Gameroom</h3>

        <div className="row">
          {/* INPUT FIELD FOR SENDING MESSAGES? */}
          <div className="col s12 m8 l8">
            <h5 className="center">GAME STUFF</h5>

          </div>

          {/* COMPONENT TO RENDER MESSAGES */}
          <div className="col s12 m4 l4">
            <div id="messageBoxContainer"> {/* height: 35vh; justify-content: space-between */}
              <div className="blue" style={{borderTopLeftRadius:"5px", borderTopRightRadius:"5px"}}>
              <h6 className="center white-text" style={{margin:"6px 0 7px 0"}}>{room} Chat</h6>
              </div>

              <MessageBox messages={messages} name={name}/>
              
              <div id="inputBoxDiv">
                <input value={message}
                  type="text" className="browser-default messageInput"
                  placeholder="Type a message..."
                  style={{padding:"1px", width:"90%", 
                        borderTop:"none", borderRight:"none", borderLeft:"none",
                        borderBottomWidth:"2px", borderBottomColor:"#4a148c", borderBottomLeftRadius:"3px"}}
                  onChange={(e)=>setMessage(e.target.value)}
                  onKeyPress={event=>event.key==="Enter" ? sendMessage(event):null}
                />
                <button className="btn purple darken-4" 
                  style={{position:"relative", top:"-2px", borderRadius:"0", borderBottomRightRadius:"3px",
                  borderTopRightRadius:"0px", lineHeight: "1", width: "10%", height:"100%", padding:"0"}}>
                    <i class="tiny material-icons">send</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default Gameroom