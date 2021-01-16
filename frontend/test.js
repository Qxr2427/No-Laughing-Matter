const socket = io('/')

//const io = require('socket.io')(server)
var points = 0;

socket.on('broadcast', data => { 
    //document.body.innerHTML = '';
    document.getElementById("test").innerHTML = data.description;
  })
socket.on('broadcast2-response', data => { 
   //document.body.innerHTML = '';
  //document.getElementById("test2").innerHTML = data.description;
  console.log(data.description)
  if (data.name = NAME) {
    console.log(`message to ${NAME} only--DOESNT WORK`)
  }
  console.log(socket.id)
  })


var progressBar = new ProgressBar.Line(document.getElementById('div1'), {
  strokeWidth: 2
});

socket.on('points+response', ()=>{
  points++;
  document.getElementById("test2").innerHTML = points;
  progressBar.set(points/1000)
})


function verifyname(Name) {
  if (Name = NAME) {
    return true
  }


}
document.getElementById("name").innerHTML = NAME;

document.getElementById("button").addEventListener("click", () => {
  socket.emit('broadcast2', {description: 'broadcast', name: NAME});
})

