import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import './MessageBox.css'

const MessageBox = ({messages, name}) => {
  
  return(
    <ScrollToBottom className="messagesContainer">
      {
        messages.map((message, i)=>
          <div key={i} className={i%2 ? "grey lighten-3":"grey lighten-4"}
            style={{padding:"2px 2px", overflowX:"hidden"}}>
            {message.user ==="admin"?
            <>
              <span className="orange-text text-darken-4"><b>{message.user}: </b>{message.text}</span>
            </>
            :
            <>
              {
                message.user === name ?
                <span className="purple-text text-darken-2"><b>{message.user}{message.isMaster ? <span> <i class="fas fa-chess-king fa-sm"></i></span>:null}: </b>{message.text}</span>
                :
                <span className="blue-text text-darken-3"><b>{message.user}{message.isMaster ? <span> <i class="fas fa-chess-king fa-sm"></i></span>:null}: </b>{message.text}</span>
              }
            </>}
            
          </div>
        )
      }
    </ScrollToBottom>
  )
}

export default MessageBox