var turnorder = []

socket.on('new-user', (data)=>{
  turnorder.push([data.name])
  if (data.name = socket.id) { //attempt at adding names
    turnorder[turnorder.length-1].push(NAME)
    socket.emit('URGENT_LIST_UPDATE', {list: turnorder})
  }
  socket.on('GLOBAL_URGENT_LIST_UPDATE', (data)=>{
    turnorder = data.globallist
  })
  socket.emit('list-update', {list: turnorder})
})
socket.on('global-list-update', (data)=>{
  //console.log(turnorder)
  if (data.globallist.length > turnorder.length) {
    turnorder = data.globallist
  }
  //console.log(turnorder)
})