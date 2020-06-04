import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import './MessageBox.css'

const MessageBox = ({messages, name}) => {
  
  return(
    <ScrollToBottom className="messagesContainer">
      {
        messages.map((message, i)=>
          <div key={i} className={i%2 ? "blue lighten-4":"blue lighten-3"}
            style={{padding:"2px 0", overflowX:"hidden", textIndent:"2px"}}>
            {message.user ==="admin"?
            <>
              <span className="orange-text text-darken-4"><b>{message.user}:</b> <i>{message.text}</i></span>
            </>
            :
            <>
              {
                message.user === name ?
                <span className="purple-text text-darken-3"><b>{message.user}:</b> <i>{message.text}</i></span>
                :
                <span className="blue-text text-darken-4"><b>{message.user}:</b> <i>{message.text}</i></span>
              }
            </>}
            
          </div>
        )
      }
    </ScrollToBottom>
  )
}

export default MessageBox