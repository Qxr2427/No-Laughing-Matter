var turn = 0

document.getElementById('start-game').addEventListener('click', ()=>{
    socket.emit('start-game', {cur_turn: turnorder[turn]})
    //console.log(turnorder[turn])
})

socket.on('your_turn', ()=>{
        //console.log(turnorder)
        //console.log(socket.id)
        //document.getElementById('my-turn'). //CREATE BUTTON THAT SAYS MY TURN
        turn++
        var turn_button = document.createElement("BUTTON")
        turn_button.id = "turn"
        turn_button.innerHTML = "Myyyyyy turn"
        document.getElementById("my-turn").appendChild(turn_button)
        document.getElementById('turn').addEventListener('click', ()=>{
            socket.emit('start-game', {cur_turn: turnorder[turn]})
        })
    }

)