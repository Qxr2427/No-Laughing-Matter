var turnorder = []

socket.on('new-user', (data)=>{
  turnorder.push(data.name)
  socket.emit('list-update', {list: turnorder})
})
socket.on('global-list-update', (data)=>{
  if (data.globallist.length > turnorder.length) {
    turnorder = data.globallist
  }
  //console.log(turnorder)
})