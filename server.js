const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.use(express.static('frontend'))

app.post('/submit', (req, res) => {
    //console.log(req.body) //you will get your data in this as object.
    res.cookie("context", req.body.name, { httpOnly: true });
    res.redirect(req.body.room)
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/:room', (req, res) => {
    const context = req.cookies["context"];
    res.clearCookie("context", { httpOnly: true });
    res.render('room', { roomId: req.params.room, name: context })
    //console.log(req.params)
  })
  
io.on('connection', socket => {
    io.emit('broadcast', {description: 'message to all clients'});
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId)
      socket.to(roomId).broadcast.emit('user-connected', userId)
      socket.on('disconnect', () => {
        socket.to(roomId).broadcast.emit('user-disconnected', userId)
      })
      socket.on('broadcast2', data =>{
        socket.emit('broadcast2-response', {description: "response after click button", Name: data.name})
      })
      socket.on('points+', ()=>{
        io.emit('points+response')
      })
    })
  })

PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`server running on port ${PORT}`))