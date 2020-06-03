import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return(
    <>
      <h1>Join component</h1>
      <div>
        <input placeholder="Username" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)}/>
        <input placeholder="Room" className="joinInput" type="text" onChange={(event)=>setRoom(event.target.value)}/>
        <Link 
        onClick={(e)=>(!name ||!room) ? e.preventDefault():null}
        to={`/chat?name=${name}&room=${room}`}>
          <button className="btn" type="submit">Join Room</button>
        </Link>
      </div>
    </>
  )

}

export default Join