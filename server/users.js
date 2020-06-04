const users = [];

const addUser = ({id, name, room, isMaster}) => {
  //lowercase the name.
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user)=> user.room===room && user.name === name);

  if(existingUser){
    return({error: "Username is taken."})
  } else if (name==="admin"){
    return{error: 'You cannot use the name "admin".'}
  }

  const user = {id, name, room, isMaster}
  users.push(user);
  return {user}
}

const removeUser = (id) => {
  const index = users.findIndex((user)=>user.id===id);
  if(index!=-1){
    return users.splice(index, 1)[0];
  }
}

const chooseNewMaster = (name, room) => {
  if(users){
    let players = users.filter((user)=>user.room===room)
    if(players.length){
      let newMaster = players[0].name
      users.forEach(user=>{
        if(user.name===newMaster){
          user.isMaster=true;
        } else {
          user.isMaster = false
        }
      })
      return(newMaster)
    }
  }
}
const getUser = (id) => users.find((user)=>user.id===id)

const getUsersInRoom = (room) => users.filter((user)=>user.room===room)

module.exports = {addUser, removeUser, chooseNewMaster, getUser, getUsersInRoom}
