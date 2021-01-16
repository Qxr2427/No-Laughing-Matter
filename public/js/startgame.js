var turn = 0

document.getElementById('start-game').addEventListener('click', ()=>{
    socket.emit('start-game', {cur_turn: turnorder[turn]})
    //document.getElementById('start-game').remove()
        //console.log(turnorder[turn])
})

socket.on('GAME_STARTED', ()=>{
    document.getElementById('start-game').remove()
    //do game_started dialogue 
    alert('game STARTED')
})

socket.on('your_turn', ()=>{
        turn++ //incremenmt turn counter in turn list
        var turn_button = document.createElement("BUTTON")
        turn_button.id = "turn"
<<<<<<< HEAD:frontend/startgame.js
        turn_button.innerHTML = "MY TURN"
=======
        turn_button.innerHTML = "YOUR TURN"
>>>>>>> 3b143c51d526a493539a5256eecb151cb22b75ae:public/js/startgame.js
        document.getElementById("my-turn").appendChild(turn_button)
        document.getElementById('turn').addEventListener('click', ()=>{
            socket.emit('start-game', {cur_turn: turnorder[turn]})
            document.getElementById('turn').remove()
            //but.remove()
        })
    }

)

var progressBar = new ProgressBar.Line(document.getElementById('div1'), {
    strokeWidth: 2
  });
  
socket.on('update_score', (data)=>{
    console.log("UPDATE SCORE") // BUT IT ISNT DRAWING!!!!!
    progressBar.set(data.current_score)
  })