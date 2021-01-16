//const socket = io('/')

//const io = require('socket.io')(server)
var points = 0





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


