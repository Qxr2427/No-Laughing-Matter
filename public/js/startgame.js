var turn = 0

document.getElementById('start-game').addEventListener('click', ()=>{
    socket.emit('start-game', {cur_turn: turnorder[turn]})
    //document.getElementById('start-game').remove()
        //console.log(turnorder[turn])
})

socket.on('GAME_STARTED', ()=>{
    document.getElementById('start-game').remove()
    document.getElementById('room-code-group').remove()
    document.getElementById('join-instructions').remove()
    //do game_started dialogue 
    alert('game STARTED')
})

socket.on('your_turn', ()=>{
    console.log('your turn')
        turn++ //incremenmt turn counter in turn list
        var turn_button = document.createElement("button")
        turn_button.id = "turn"
        turn_button.innerHTML = "YOUR TURN"
        document.getElementById("my-turn").appendChild(turn_button)
        document.getElementById('turn').addEventListener('click', ()=>{
            socket.emit('start-game', {cur_turn: turnorder[turn]})
            document.getElementById('turn').remove()
            //but.remove()
        socket.emit('prompt', {curName: NAME, turnNum: turn})
        })
    }

)
// 
// var progressBar = new ProgressBar.Line(document.getElementById('div1'), {
//     strokeWidth: 2
//   });
  
// socket.on('update_score', (data)=>{
//     console.log("UPDATE SCORE") // BUT IT ISNT DRAWING!!!!!
//     progressBar.set(data.current_score)
//   })