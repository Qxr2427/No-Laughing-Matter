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
app.use(express.static('public'))

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
  
    socket.on('join-room', (roomId, userId) => {

      io.emit("new-user", {name: socket.id}) 
      socket.join(roomId)
      socket.to(roomId).broadcast.emit('user-connected', userId)
      socket.on('disconnect', () => {
        socket.to(roomId).broadcast.emit('user-disconnected', userId)
      })

    
      socket.on('cur_score', data =>{
        io.emit('update_score', {score: data.current_score})
      })
    
      socket.on('URGENT_LIST_UPDATE', (data)=>{
        console.log(data)
        io.emit('GLOBAL_URGENT_LIST_UPDATE', {globallist: data.list})

      })

      socket.on('list-update', (data) => {
        console.log('list update')
        io.emit('global-list-update', {globallist: data.list})
      })

      socket.on('start-game', (data)=>{
        console.log(`${socket.id} sent to ${data.cur_turn}`) //if not the target user it does not send?????
        io.emit('GAME_STARTED')
        io.to(data.cur_turn).emit('your_turn')
      })

      
    })
  })

PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`server running on port ${PORT}`))