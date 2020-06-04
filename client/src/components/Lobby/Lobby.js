import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Lobby = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return(
    <>
      <h1>Lobby component</h1>
      <div>
        <input placeholder="Username" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)}/>
        <input placeholder="Room" className="joinInput" type="text" onChange={(event)=>setRoom(event.target.value)}/>
        <Link 
        onClick={(e)=>(!name ||!room) ? e.preventDefault():null}
        to={`/gameroom?name=${name}&room=${room}`}>
          <button className="btn" type="submit">Lobby Room</button>
        </Link>
      </div>
    </>
  )

}

export default Lobby