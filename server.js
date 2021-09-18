const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
const { cp } = require('fs')

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.use(express.static('public'))

const prompts = ["mario judah","xxxtentacion","AIYY LMAO","we got this guys","unfunny joke 5"]

// temporary (replace/edit later)
app.use('/results', (req, res)=>{
  res.render('results');
})

app.post('/submit', (req, res) => {
    //console.log(req.body) //you will get your data in this as object.
    res.cookie("context", req.body.name, { httpOnly: true });
    req.body.room = req.body.room.toUpperCase()
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
      
      socket.on('start-game', ()=>{
        //console.log(`${socket.id} start game, list: ${data.turn_list}`) //if not the target user it does not send?????
        io.emit('GAME_STARTED')
        console.log(Object.keys(io.sockets.sockets)) //this is all the connected clients
        console.log(socket.id) //this is my id. 
        order = Object.keys(io.sockets.sockets)
        order.splice((order.indexOf(socket.id)))
        order.unshift(socket.id)
        
        //console.log(data) /// EMPTY OBJECT WHAT
        //console.log(data.turn_list)
        var address = order[0]
        //console.log(`start game, my address: ${socket.id} send to ${address} total list: ${data.turn_list}`)
        //if turn 
        io.emit('turnlist_check', {turn_list: order})
        io.to(address).emit('your_turn', {turn_list: order})
      })

      socket.on('round-over', (data)=>{
        console.log("round-over sent!")
        //console.log(data) //EMPTY OBJECT
        console.log(data.list)
        console.log(data.list.length)
        if (data.list.length == 0){
          console.log("length 0")
          io.emit('game-over')
        }
        else {
        console.log("not zero")
        //if turn 
        var address = data.list[0]
        io.to(address).emit('your_turn', {turn_list: data.list})
      }
      })
      socket.on('timer-update', (data)=>{
        io.emit('timer_update', {time: data})
      })
    })
  })

PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`server running on port ${PORT}`))