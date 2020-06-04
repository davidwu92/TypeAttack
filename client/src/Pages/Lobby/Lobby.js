import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Lobby = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  //need a useEffect for a list of rooms and buttons to join those rooms.
  
  return(
    <>
      <div className="container">
        <h1 className="center">Welcome to Type Attack</h1>
        <div className="input-field center">
          <input placeholder="Username" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)}/>
          <input placeholder="Room name" className="joinInput" type="text" onChange={(event)=>setRoom(event.target.value)}/>
          <Link 
            onClick={(e)=>(!name ||!room || name.toLowerCase()=="admin") ? e.preventDefault():null}
            to={`/gameroom?name=${name.toLowerCase()}&room=${room.toLowerCase()}`}>
            <button className="btn" type="submit">Lobby Room</button>
          </Link>
        </div>
      </div>
    </>
  )

}

export default Lobby